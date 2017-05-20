/**
 * Created by Pororo on 17/5/19.
 */
export default (nS) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
}