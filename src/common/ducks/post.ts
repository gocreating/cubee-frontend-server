import {
  Response,
  ApiSuccessActionPayload,
  ApiFailActionPayload,
  ApiMeta,
} from 'cubee';
import qs from 'query-string';
import { fromJS } from 'immutable';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { API_HOST } from '../config';
import apiAgent, { injectCredentials } from '../api/agent';
import { selectors as authSelectors } from './auth';
import { RootState } from '../reducers/index';
import { handleRequestFail } from '../utils/sagaUtils';

/**
 * Actions
 */
const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
const CREATE_POST_FAIL = 'CREATE_POST_FAIL';

const LIST_USER_POST_REQUEST = 'LIST_USER_POST_REQUEST';
const LIST_USER_POST_SUCCESS = 'LIST_USER_POST_SUCCESS';
const LIST_USER_POST_FAIL = 'LIST_USER_POST_FAIL';

/**
 * Action Creators
 */
export const listUserPostRequest = (username: string, page = 1): PostActions => ({
  type: LIST_USER_POST_REQUEST,
  payload: { username, page },
});

export const listUserPostSuccess = (res: Response<ListUserPostResponseData>, page: number): PostActions => ({
  type: LIST_USER_POST_SUCCESS,
  payload: { res, page },
});

export const listUserPostFail = (error: Error, res?: Response): PostActions => ({
  type: LIST_USER_POST_FAIL,
  payload: { error, res },
});

export const createPostRequest = (title: string, body: object): PostActions => ({
  type: CREATE_POST_REQUEST,
  payload: { title, body },
});

export const createPostSuccess = (res: Response<CreatePostResponseData>): PostActions => ({
  type: CREATE_POST_SUCCESS,
  payload: { res },
});

export const createPostFail = (error: Error, res?: Response): PostActions => ({
  type: CREATE_POST_FAIL,
  payload: { error, res },
});

/**
 * Default State
 */
const defaultState: PostState = {
  listUserPostMeta: {
    isRequesting: false,
    isRequested: false,
    isRequestSuccess: false,
    isRequestFail: false,
  },
  createPostMeta: {
    isRequesting: false,
    isRequested: false,
    isRequestSuccess: false,
    isRequestFail: false,
  },
  entities: {},
  pagesOfUser: {
    meta: {
      currentPage: 1,
      entryOffset: 0,
      entryLimit: 20,
      entryTotal: 1,
    },
    ids: {},
  },
};

/**
 * Selectors
 */
export const selectors = {
  getEntities(state: RootState): PostMap {
    return fromJS(state.post)
      .get('entities')
      .toJS();
  },
  getUserPostMeta(state: RootState): PageMeta {
    return fromJS(state.post)
      .getIn(['pagesOfUser', 'meta'])
      .toJS();
  },
  getUserPostsOfPage(state: RootState, page?: number): Post[] {
    const postState = fromJS(state.post);
    const derivedPage = page || this.getUserPostMeta(state).currentPage;
    const userPosts = postState
      .getIn(['pagesOfUser', 'ids', `${derivedPage}`], fromJS([]))
      .map((postId: string) => postState.getIn(['entities', postId]))
      .toJS();
    return userPosts;
  },
};

/**
 * Sagas
 */
export const sagas = {
  *handleListUserPostRequest(action: ListUserPostRequestAction) {
    try {
      const { payload } = action;
      const meta: PageMeta = yield select(selectors.getUserPostMeta);
      const search = qs.stringify({
        offset: meta.entryLimit * Math.max(payload.page - 1, 0),
        limit: meta.entryLimit,
      })
      const res = yield call(apiAgent, `${API_HOST}/users/${payload.username}/posts?${search}`);
      if (res.code !== 200) {
        yield put(listUserPostFail(new Error('List user post fail'), res));
      } else {
        yield put(listUserPostSuccess(res, payload.page));
      }
    } catch (err) {
      yield put(listUserPostFail(err));
    }
  },
  *handleCreatePostRequest(action: CreatePostRequestAction) {
    try {
      const { accessToken } = yield select(authSelectors.getUser);
      const { payload } = action;
      const res = yield call(apiAgent, `${API_HOST}/posts/`, injectCredentials({
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: payload.title,
          body: payload.body,
        }),
      }, accessToken));
      if (res.code !== 200) {
        yield put(createPostFail(new Error('Create post fail'), res));
      } else {
        yield put(createPostSuccess(res));
      }
    } catch (err) {
      yield put(createPostFail(err));
    }
  },
};

export const rootSaga = {
  *listUserPostRequest() {
    yield takeEvery(LIST_USER_POST_REQUEST, sagas.handleListUserPostRequest);
  },
  *createPostRequest() {
    yield takeEvery(CREATE_POST_REQUEST, sagas.handleCreatePostRequest);
  },
  *apiFail() {
    yield all([
      takeEvery(LIST_USER_POST_FAIL, handleRequestFail),
      takeEvery(CREATE_POST_FAIL, handleRequestFail),
    ]);
  },
};

/**
 * Reducer
 */
export default (state = defaultState, action: PostActions) => {
  switch (action.type) {
    case LIST_USER_POST_REQUEST:
      return fromJS(state)
        .setIn(['listUserPostMeta', 'isRequesting'], true)
        .toJS();
    case LIST_USER_POST_SUCCESS: {
      const { res, page } = action.payload;
      const { posts, meta } = res.data;
      const fetchedPosts = {};
      const ids: string[] = [];
      posts.forEach((post) => {
        fetchedPosts[post.id] = post;
        ids.push(`${post.id}`);
      });
      return fromJS(state)
        .setIn(['listUserPostMeta', 'isRequesting'], false)
        .setIn(['listUserPostMeta', 'isRequested'], true)
        .setIn(['listUserPostMeta', 'isRequestSuccess'], true)
        .setIn(['listUserPostMeta', 'isRequestFail'], false)
        .setIn(['pagesOfUser', 'meta', 'currentPage'], page)
        .setIn(['pagesOfUser', 'meta', 'entryOffset'], meta.offset)
        .setIn(['pagesOfUser', 'meta', 'entryLimit'], meta.limit)
        .setIn(['pagesOfUser', 'meta', 'entryTotal'], meta.total)
        .setIn(['pagesOfUser', 'ids', page], ids)
        .mergeIn(['entities'], fetchedPosts)
        .toJS();
    }
    case LIST_USER_POST_FAIL:
      return fromJS(state)
        .setIn(['listUserPostMeta', 'isRequesting'], false)
        .setIn(['listUserPostMeta', 'isRequested'], true)
        .setIn(['listUserPostMeta', 'isRequestSuccess'], false)
        .setIn(['listUserPostMeta', 'isRequestFail'], true)
        .toJS();
    case CREATE_POST_REQUEST:
      return fromJS(state)
        .setIn(['createPostMeta', 'isRequesting'], true)
        .toJS();
    case CREATE_POST_SUCCESS:
      return fromJS(state)
        .setIn(['createPostMeta', 'isRequesting'], false)
        .setIn(['createPostMeta', 'isRequested'], true)
        .setIn(['createPostMeta', 'isRequestSuccess'], true)
        .setIn(['createPostMeta', 'isRequestFail'], false)
        .toJS();
    case CREATE_POST_FAIL:
      return fromJS(state)
        .setIn(['createPostMeta', 'isRequesting'], false)
        .setIn(['createPostMeta', 'isRequested'], true)
        .setIn(['createPostMeta', 'isRequestSuccess'], false)
        .setIn(['createPostMeta', 'isRequestFail'], true)
        .toJS();
    default:
      return state;
  }
};

/**
 * Types
 */
export interface Post {
  id: number;
  title: string;
  body: object;
  created_ts: number;
  updated_ts: number;
}

interface PostMap {
  [id: string]: Post;
}

interface PageMeta {
  currentPage: number;
  entryOffset: number;
  entryLimit: number;
  entryTotal: number;
}

interface ListUserPostResponseData {
  posts: Post[];
  meta: {
    offset: number;
    limit: number;
    total: number;
  };
}

interface CreatePostResponseData {
  post: Post;
}

interface ListUserPostSuccessActionPayload extends ApiSuccessActionPayload<{
  data: ListUserPostResponseData;
}> {
  page: number;
}

interface ListUserPostRequestAction {
  type: typeof LIST_USER_POST_REQUEST;
  payload: {
    username: string;
    page: number;
  };
}

interface ListUserPostSuccessAction {
  type: typeof LIST_USER_POST_SUCCESS;
  payload: ApiSuccessActionPayload<{
    data: ListUserPostResponseData;
  }> & {
    page: number;
  };
}

interface ListUserPostFailAction {
  type: typeof LIST_USER_POST_FAIL;
  payload: ApiFailActionPayload;
}

interface CreatePostRequestAction {
  type: typeof CREATE_POST_REQUEST;
  payload: {
    title: string;
    body: object;
  };
}

interface CreatePostSuccessAction {
  type: typeof CREATE_POST_SUCCESS;
  payload: ApiSuccessActionPayload<{
    data: CreatePostResponseData;
  }>;
}

interface CreatePostFailAction {
  type: typeof CREATE_POST_FAIL;
  payload: ApiFailActionPayload;
}

export type PostActions = (
  ListUserPostRequestAction |
  ListUserPostSuccessAction |
  ListUserPostFailAction |
  CreatePostRequestAction |
  CreatePostSuccessAction |
  CreatePostFailAction
);

export type PostState = Readonly<{
  listUserPostMeta: ApiMeta;
  createPostMeta: ApiMeta;
  entities: PostMap;
  pagesOfUser: {
    meta: PageMeta;
    ids: {
      [pageId: string]: string[];
    };
  };
}>
