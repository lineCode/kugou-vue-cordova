/* eslint-disable no-new */
export default {
  name: 'vTap',
  bind (el, binding, vnode) {
    let value = binding.value
    new TapEffect(el, value, vnode.componentInstance)
  }
}

function TapEffect (el, value, _vue) {
  this.el = el
  this.cb = value
  this._vue = _vue
  this.el.addEventListener('touchstart', this.tapStart.bind(this), false)
  this.el.addEventListener('touchend', this.tapEnd.bind(this), false)
}

TapEffect.prototype.tapStart = function (e) {
  this.target = e.target
  console.log(this.target)
  this.startTimeStamp = e.timeStamp
}

TapEffect.prototype.tapEnd = function (e) {
  console.log(this.target)
  if (e.target.toString() !== this.target.toString()) {
    console.log(e.target)
    console.log('target error')
    return
  }
  if (e.timeStamp - this.startTimeStamp > 250) {
    console.log('timeout' + e.timeStamp - this.startTimeStamp)
    return
  }
  console.log(this.cb)
  typeof this.cb === 'function' && this.cb()
}
