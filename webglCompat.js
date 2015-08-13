"use strict";

var util = require('util')

module.exports = function wrapCompat(WebGL) {

util.inherits(WebGLCompat, WebGL)
function WebGLCompat(a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var obj = new WebGL(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  obj.__proto__ = WebGLCompat.prototype;

  obj._UNPACK_FLIP_Y_WEBGL = false;
  obj._UNPACK_PREMULTIPLY_ALPHA_WEBGL = false;

  return obj;
}

WebGLCompat.prototype.MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB


var p = WebGLCompat.prototype
var basep = WebGL.prototype

p.getSupportedExtensions = function getSupportedExtensions() {
  if(this.disableExtensions) {
    return [];
  }
  return ['OES_standard_derivatives'];
}

p.getExtension = function getExtension(name) {
  if(this.disableExtensions) {
    return null;
  }
  if(name == 'OES_standard_derivatives') {
    return {};
  }
  return null;
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
    source = source.replace(/#extension GL_OES_standard_derivatives.*\n/g, '')
  }
  return basep.shaderSource.call(this, shader, source);
}

p.uniformMatrix4fv = function uniformMatrix4fv(location, transpose, value) {
  if(value.buffer.byteLength == 0) {
    return
  }
  return basep.uniformMatrix4fv.call(this, location, transpose, value);
}

p.pixelStorei = function pixelStorei(pname, param) {

  if(pname == this.UNPACK_FLIP_Y_WEBGL)
    this._UNPACK_FLIP_Y_WEBGL = param;
  else if(pname == this.UNPACK_PREMULTIPLY_ALPHA_WEBGL)
    this._UNPACK_PREMULTIPLY_ALPHA_WEBGL = param;

  return basep.pixelStorei.call(this, pname, param);
}

p.texImage2D = function texImage2D() {

    if (arguments.length == 6) {
      var format = arguments[3], source = arguments[5];

      if(source != null && source.getImageData) {
        var source = source.getImageData(0, 0, source.width, source.height)
        var pixels = source.data
      }
      else if(source != null) {
        var pixels = source.data || source
      }
      var width = source.width, height = source.height;
    }
    else if (arguments.length == 9) {
      var width = arguments[3], height = arguments[4];
      var format = arguments[6], pixels = arguments[8];
    }

  if(this._UNPACK_FLIP_Y_WEBGL) {
    pixels = new Buffer(pixels);
    flipBuffer(pixels, width, height, format == this.RGBA ? true : false)
  }

  if (arguments.length == 6)
    arguments[5] = {data:pixels, width:width, height:height};
  else if(arguments.length == 9)
    arguments[8] = pixels;


  return basep.texImage2D.apply(this,arguments);
}

return WebGLCompat

}

function flipBuffer(buffer, width, height, alpha) {
  var step = alpha ? 4 : 3

  for (var y = 0; y < height / 2 | 0; ++y) {
    for (var i = 0; i < width * step; ++i) {
      var ix1 = y * width * step + i
      var ix2 = (height - 1 - y) * width * step + i
      var val1 = buffer[ix1]
      var val2 = buffer[ix2]
      buffer[ix2] = val1
      buffer[ix1] = val2
    }
  }
}
