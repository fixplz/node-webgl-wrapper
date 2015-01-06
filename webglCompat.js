"use strict";

var util = require('util')

module.exports = function wrapCompat(WebGL) {

util.inherits(WebGLCompat, WebGL)
function WebGLCompat(a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var obj = new WebGL(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  obj.__proto__ = WebGLCompat.prototype;
  return obj;
}

WebGLCompat.prototype.MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB


var p = WebGLCompat.prototype
var basep = WebGL.prototype

p.getExtension = function getExtension(name) {
  if(this.disableExtensions) {
    return null;
  }
  return basep.getExtension.call(this, name);
}

p.bindTexture = function bindTexture(target, texture) {
  if(texture == null) {
    return null
  }
  return basep.bindTexture.call(this, target, texture);
}

p.disableVertexAttribArray = function disableVertexAttribArray(index) {
  if(typeof index != 'number') {
    return
  }
  return basep.disableVertexAttribArray.call(this, index);
}

p.getParameter = function getParameter(pname) {
  if(pname == null) {
    return null
  }
  return basep.getParameter.call(this, pname);
}

p.shaderSource = function shaderSource(shader, source) {
  if(this.shaderCompat) {
    source = source.replace(/precision.*\n/g, '')
  }
  return basep.shaderSource.call(this, shader, source);
}

p.uniformMatrix4fv = function uniformMatrix4fv(location, transpose, value) {
  if(value.buffer.byteLength == 0) {
    return
  }
  return basep.uniformMatrix4fv.call(this, location, transpose, value);
}

return WebGLCompat

}
