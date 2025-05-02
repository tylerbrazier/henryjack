import { ValidationError } from '../utils/classes.js'

export default function notFound() {
  throw new ValidationError('Not found', 404)
}
