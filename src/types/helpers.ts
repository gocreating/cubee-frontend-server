/**
 * A helper to add extra properties to component.
 * This prevents us from resolving complex typing issues when dealing following cases:
 *
 * ```
 * const Field = styled(Box)<FieldProps>``;
 * const Form = styled(Box)<FormProps>``;
 * Form.Field = Field
 * export default Form;
 * ```
 *
 * ref: https://stackoverflow.com/a/54955624/2443984
 */
export function withProperties<A, B>(component: A, properties: B): A & B {
  Object.keys(properties).forEach(key => {
    component[key] = properties[key]
  });
  return component as A & B;
}
