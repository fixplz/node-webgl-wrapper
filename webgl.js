"use strict";

var util = require('util')


module.exports = function wrapWebGL(WebGLBase) {

var webgl = {}

util.inherits(WebGLSafe, WebGLBase)
function WebGLSafe(w, h) {
  var obj = new WebGLBase(w, h);
  obj.__proto__ = WebGLSafe.prototype;
  return obj;
}


webgl.WebGLBase = WebGLBase;
webgl.WebGLSafe = WebGLSafe;
webgl.WebGL = WebGLSafe;
webgl.WebGLCompat = require('./webglCompat')(WebGLSafe);

/////////////////////////////////////////////////////////////

function WebGLProgram(_) { this._ = _; }
function WebGLShader(_) { this._ = _; }
function WebGLBuffer(_) { this._ = _; }
function WebGLFramebuffer(_) { this._ = _; }
function WebGLRenderbuffer(_) { this._ = _; }
function WebGLTexture(_) { this._ = _; }
function WebGLActiveInfo(_) { this._=_; this.size=_.size; this.type=_.type; this.name=_.name; }
function WebGLUniformLocation(_) { this._ = _; }

webgl.WebGLProgram = WebGLProgram;
webgl.WebGLShader = WebGLShader;
webgl.WebGLBuffer = WebGLBuffer;
webgl.WebGLFramebuffer = WebGLFramebuffer;
webgl.WebGLRenderbuffer = WebGLRenderbuffer;
webgl.WebGLTexture = WebGLTexture;
webgl.WebGLActiveInfo = WebGLActiveInfo;
webgl.WebGLUniformLocation = WebGLUniformLocation;


function wrapObject(val, type) {
  if(val == -1 || val == null)
    return null;

  var obj = Object.create(type.prototype);
  type.call(obj, val);
  return obj;
}

function asFloatArray(val) {
  if(val instanceof Float32Array)
    return val;
  return new Float32Array(val);
}

function asInt32Array(val) {
  if(val instanceof Int32Array)
    return val;
  return new Int32Array(val);
}


var safep = WebGLSafe.prototype;
var basep = WebGLBase.prototype;

safep.getSupportedExtensions = function getSupportedExtensions() {
  return basep.getSupportedExtensions.call(this).split(" ");
}

safep.getExtension = function getExtension(name) {
  if (!(arguments.length === 1 && typeof name === "string")) {
    throw new TypeError('Expected getExtension(string name)');
  }
  return basep.getExtension.call(this, name);
}

safep.activeTexture = function activeTexture(texture) {
  if (!(arguments.length === 1 && typeof texture === "number")) {
    throw new TypeError('Expected activeTexture(number texture)');
  }
  return basep.activeTexture.call(this, texture);
}

safep.attachShader = function attachShader(program, shader) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected attachShader(WebGLProgram program, WebGLShader shader)');
  }
  return basep.attachShader.call(this, program ? program._ : 0, shader ? shader._ : 0);
}

safep.bindAttribLocation = function bindAttribLocation(program, index, name) {
  if (!(arguments.length === 3 && (program === null || program instanceof WebGLProgram) && typeof index === "number" && typeof name === "string")) {
    throw new TypeError('Expected bindAttribLocation(WebGLProgram program, number index, string name)');
  }
  return basep.bindAttribLocation.call(this, program ? program._ : 0, index, name);
}

safep.bindBuffer = function bindBuffer(target, buffer) {
  if (!(arguments.length === 2 && typeof target === "number" && (buffer === null || buffer instanceof WebGLBuffer))) {
    throw new TypeError('Expected bindBuffer(number target, WebGLBuffer buffer)');
  }
  return basep.bindBuffer.call(this, target, buffer ? buffer._ : 0);
}

safep.bindFramebuffer = function bindFramebuffer(target, framebuffer) {
  if (!(arguments.length === 2 && typeof target === "number" && (framebuffer === null || framebuffer instanceof WebGLFramebuffer))) {
    throw new TypeError('Expected bindFramebuffer(number target, WebGLFramebuffer framebuffer)');
  }
  return basep.bindFramebuffer.call(this, target, framebuffer ? framebuffer._ : 0);
}

safep.bindRenderbuffer = function bindRenderbuffer(target, renderbuffer) {
  if (!(arguments.length === 2 && typeof target === "number" && (renderbuffer === null || renderbuffer instanceof WebGLRenderbuffer))) {
    throw new TypeError('Expected bindRenderbuffer(number target, WebGLRenderbuffer renderbuffer)');
  }
  return basep.bindRenderbuffer.call(this, target, renderbuffer ? renderbuffer._ : 0);
}

safep.bindTexture = function bindTexture(target, texture) {
  if (!(arguments.length === 2 && typeof target === "number" && (texture === null || texture instanceof WebGLTexture))) {
    throw new TypeError('Expected bindTexture(number target, WebGLTexture texture)');
  }
  return basep.bindTexture.call(this, target, texture ? texture._ : 0);
}

safep.blendColor = function blendColor(red, green, blue, alpha) {
  if (!(arguments.length === 4 && typeof red === "number" && typeof green === "number" && typeof blue === "number" && typeof alpha === "number")) {
    throw new TypeError('Expected blendColor(number red, number green, number blue, number alpha)');
  }
  return basep.blendColor.call(this, red, green, blue, alpha);
}

safep.blendEquation = function blendEquation(mode) {
  if (!(arguments.length === 1 && typeof mode === "number")) {
    throw new TypeError('Expected blendEquation(number mode)');
  }
  return basep.blendEquation.call(this, mode);
}

safep.blendEquationSeparate = function blendEquationSeparate(modeRGB, modeAlpha) {
  if (!(arguments.length === 2 && typeof modeRGB === "number" && typeof modeAlpha === "number")) {
    throw new TypeError('Expected blendEquationSeparate(number modeRGB, number modeAlpha)');
  }
  return basep.blendEquationSeparate.call(this, modeRGB, modeAlpha);
}

safep.blendFunc = function blendFunc(sfactor, dfactor) {
  if (!(arguments.length === 2 && typeof sfactor === "number" && typeof dfactor === "number")) {
    throw new TypeError('Expected blendFunc(number sfactor, number dfactor)');
  }
  return basep.blendFunc.call(this, sfactor, dfactor);
}

safep.blendFuncSeparate = function blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha) {
  if (!(arguments.length === 4 && typeof srcRGB === "number" && typeof dstRGB === "number" && typeof srcAlpha === "number" && typeof dstAlpha === "number")) {
    throw new TypeError('Expected blendFuncSeparate(number srcRGB, number dstRGB, number srcAlpha, number dstAlpha)');
  }
  return basep.blendFuncSeparate.call(this, srcRGB, dstRGB, srcAlpha, dstAlpha);
}

safep.bufferData = function bufferData(target, data, usage) {
  if (!(arguments.length === 3 && typeof target === "number" && 
      (typeof data === "object" || typeof data === "number") && typeof usage === "number")) {
    throw new TypeError('Expected bufferData(number target, ArrayBuffer data, number usage) or bufferData(number target, number size, number usage)');
  }
  return basep.bufferData.call(this, target, data, usage);
}

safep.bufferSubData = function bufferSubData(target, offset, data) {
  if (!(arguments.length === 3 && typeof target === "number" && typeof offset === "number" && typeof data === "object")) {
    throw new TypeError('Expected bufferSubData(number target, number offset, ArrayBuffer data)');
  }
  return basep.bufferSubData.call(this, target, offset, data);
}

safep.checkFramebufferStatus = function checkFramebufferStatus(target) {
  if (!(arguments.length === 1 && typeof target === "number")) {
    throw new TypeError('Expected checkFramebufferStatus(number target)');
  }
  return basep.checkFramebufferStatus.call(this, target);
}

safep.clear = function clear(mask) {
  if (!(arguments.length === 1 && typeof mask === "number")) {
    throw new TypeError('Expected clear(number mask)');
  }
  return basep.clear.call(this, mask);
}

safep.clearColor = function clearColor(red, green, blue, alpha) {
  if (!(arguments.length === 4 && typeof red === "number" && typeof green === "number" && typeof blue === "number" && typeof alpha === "number")) {
    throw new TypeError('Expected clearColor(number red, number green, number blue, number alpha)');
  }
  return basep.clearColor.call(this, red, green, blue, alpha);
}

safep.clearDepth = function clearDepth(depth) {
  if (!(arguments.length === 1 && typeof depth === "number")) {
    throw new TypeError('Expected clearDepth(number depth)');
  }
  return basep.clearDepth.call(this, depth);
}

safep.clearStencil = function clearStencil(s) {
  if (!(arguments.length === 1 && typeof s === "number")) {
    throw new TypeError('Expected clearStencil(number s)');
  }
  return basep.clearStencil.call(this, s);
}

safep.colorMask = function colorMask(red, green, blue, alpha) {
  if (!(arguments.length === 4 && typeof red === "boolean" && typeof green === "boolean" && typeof blue === "boolean" && typeof alpha === "boolean")) {
    throw new TypeError('Expected colorMask(boolean red, boolean green, boolean blue, boolean alpha)');
  }
  return basep.colorMask.call(this, red, green, blue, alpha);
}

safep.compileShader = function compileShader(shader) {
  if (!(arguments.length === 1 && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected compileShader(WebGLShader shader)');
  }
  return basep.compileShader.call(this, shader ? shader._ : 0);
}

safep.copyTexImage2D = function copyTexImage2D(target, level, internalformat, x, y, width, height, border) {
  if (!(arguments.length === 8 && typeof target === "number" && typeof level === "number" && typeof internalformat === "number" && typeof x === "number" && typeof y === "number" && typeof width === "number" && typeof height === "number" && typeof border === "number")) {
    throw new TypeError('Expected copyTexImage2D(number target, number level, number internalformat, number x, number y, number width, number height, number border)');
  }
  return basep.copyTexImage2D.call(this, target, level, internalformat, x, y, width, height, border);
}

safep.copyTexSubImage2D = function copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height) {
  if (!(arguments.length === 8 && typeof target === "number" && typeof level === "number" && typeof xoffset === "number" && typeof yoffset === "number" && typeof x === "number" && typeof y === "number" && typeof width === "number" && typeof height === "number")) {
    throw new TypeError('Expected copyTexSubImage2D(number target, number level, number xoffset, number yoffset, number x, number y, number width, number height)');
  }
  return basep.copyTexSubImage2D.call(this, target, level, xoffset, yoffset, x, y, width, height);
}

safep.createBuffer = function createBuffer() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected createBuffer()');
  }
  return wrapObject(basep.createBuffer.call(this), WebGLBuffer);
}

safep.createFramebuffer = function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected createFramebuffer()');
  }
  return wrapObject(basep.createFramebuffer.call(this), WebGLFramebuffer);
}

safep.createProgram = function createProgram() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected createProgram()');
  }
  return wrapObject(basep.createProgram.call(this), WebGLProgram);
}

safep.createRenderbuffer = function createRenderbuffer() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected createRenderbuffer()');
  }
  return wrapObject(basep.createRenderbuffer.call(this), WebGLRenderbuffer);
}

safep.createShader = function createShader(type) {
  if (!(arguments.length === 1 && typeof type === "number")) {
    throw new TypeError('Expected createShader(number type)');
  }
  return wrapObject(basep.createShader.call(this, type), WebGLShader);
}

safep.createTexture = function createTexture() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected createTexture()');
  }
  return wrapObject(basep.createTexture.call(this), WebGLTexture);
}

safep.cullFace = function cullFace(mode) {
  if (!(arguments.length === 1 && typeof mode === "number")) {
    throw new TypeError('Expected cullFace(number mode)');
  }
  return basep.cullFace.call(this, mode);
}

safep.deleteBuffer = function deleteBuffer(buffer) {
  if (!(arguments.length === 1 && (buffer === null || buffer instanceof WebGLBuffer))) {
    throw new TypeError('Expected deleteBuffer(WebGLBuffer buffer)');
  }
  return basep.deleteBuffer.call(this, buffer ? buffer._ : 0);
}

safep.deleteFramebuffer = function deleteFramebuffer(framebuffer) {
  if (!(arguments.length === 1 && (framebuffer === null || framebuffer instanceof WebGLFramebuffer))) {
    throw new TypeError('Expected deleteFramebuffer(WebGLFramebuffer framebuffer)');
  }
  return basep.deleteFramebuffer.call(this, framebuffer ? framebuffer._ : 0);
}

safep.deleteProgram = function deleteProgram(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected deleteProgram(WebGLProgram program)');
  }
  return basep.deleteProgram.call(this, program ? program._ : 0);
}

safep.deleteRenderbuffer = function deleteRenderbuffer(renderbuffer) {
  if (!(arguments.length === 1 && (renderbuffer === null || renderbuffer instanceof WebGLRenderbuffer))) {
    throw new TypeError('Expected deleteRenderbuffer(WebGLRenderbuffer renderbuffer)');
  }
  return basep.deleteRenderbuffer.call(this, renderbuffer ? renderbuffer._ : 0);
}

safep.deleteShader = function deleteShader(shader) {
  if (!(arguments.length === 1 && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected deleteShader(WebGLShader shader)');
  }
  return basep.deleteShader.call(this, shader ? shader._ : 0);
}

safep.deleteTexture = function deleteTexture(texture) {
  if (!(arguments.length === 1 && (texture === null || texture instanceof WebGLTexture))) {
    throw new TypeError('Expected deleteTexture(WebGLTexture texture)');
  }
  return basep.deleteTexture.call(this, texture ? texture._ : 0);
}

safep.depthFunc = function depthFunc(func) {
  if (!(arguments.length === 1 && typeof func === "number")) {
    throw new TypeError('Expected depthFunc(number func)');
  }
  return basep.depthFunc.call(this, func);
}

safep.depthMask = function depthMask(flag) {
  if (!(arguments.length === 1 && typeof flag === "boolean")) {
    throw new TypeError('Expected depthMask(boolean flag)');
  }
  return basep.depthMask.call(this, flag);
}

safep.depthRange = function depthRange(zNear, zFar) {
  if (!(arguments.length === 2 && typeof zNear === "number" && typeof zFar === "number")) {
    throw new TypeError('Expected depthRange(number zNear, number zFar)');
  }
  return basep.depthRange.call(this, zNear, zFar);
}

safep.detachShader = function detachShader(program, shader) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected detachShader(WebGLProgram program, WebGLShader shader)');
  }
  return basep.detachShader.call(this, program ? program._ : 0, shader ? shader._ : 0);
}

safep.disable = function disable(cap) {
  if (!(arguments.length === 1 && typeof cap === "number")) {
    throw new TypeError('Expected disable(number cap)');
  }
  return basep.disable.call(this, cap);
}

safep.disableVertexAttribArray = function disableVertexAttribArray(index) {
  if (!(arguments.length === 1 && typeof index === "number")) {
    throw new TypeError('Expected disableVertexAttribArray(number index)');
  }
  return basep.disableVertexAttribArray.call(this, index);
}

safep.drawArrays = function drawArrays(mode, first, count) {
  if (!(arguments.length === 3 && typeof mode === "number" && typeof first === "number" && typeof count === "number")) {
    throw new TypeError('Expected drawArrays(number mode, number first, number count)');
  }
  return basep.drawArrays.call(this, mode, first, count);
}

safep.drawElements = function drawElements(mode, count, type, offset) {
  if (!(arguments.length === 4 && typeof mode === "number" && typeof count === "number" && typeof type === "number" && typeof offset === "number")) {
    throw new TypeError('Expected drawElements(number mode, number count, number type, number offset)');
  }
  return basep.drawElements.call(this, mode, count, type, offset);
}

safep.enable = function enable(cap) {
  if (!(arguments.length === 1 && typeof cap === "number")) {
    throw new TypeError('Expected enable(number cap)');
  }
  return basep.enable.call(this, cap);
}

safep.enableVertexAttribArray = function enableVertexAttribArray(index) {
  if (!(arguments.length === 1 && typeof index === "number")) {
    throw new TypeError('Expected enableVertexAttribArray(number index)');
  }
  return basep.enableVertexAttribArray.call(this, index);
}

safep.finish = function finish() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected finish()');
  }
  return basep.finish.call(this);
}

safep.flush = function flush() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected flush()');
  }
  return basep.flush.call(this);
}

safep.framebufferRenderbuffer = function framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
  if (!(arguments.length === 4 && typeof target === "number" && typeof attachment === "number" && typeof renderbuffertarget === "number" && (renderbuffer === null || renderbuffer instanceof WebGLRenderbuffer))) {
    throw new TypeError('Expected framebufferRenderbuffer(number target, number attachment, number renderbuffertarget, WebGLRenderbuffer renderbuffer)');
  }
  return basep.framebufferRenderbuffer.call(this, target, attachment, renderbuffertarget, renderbuffer ? renderbuffer._ : 0);
}

safep.framebufferTexture2D = function framebufferTexture2D(target, attachment, textarget, texture, level) {
  if (!(arguments.length === 5 && typeof target === "number" && typeof attachment === "number" && typeof textarget === "number" && (texture === null || texture instanceof WebGLTexture) && typeof level === "number")) {
    throw new TypeError('Expected framebufferTexture2D(number target, number attachment, number textarget, WebGLTexture texture, number level)');
  }
  return basep.framebufferTexture2D.call(this, target, attachment, textarget, texture ? texture._ : 0, level);
}

safep.frontFace = function frontFace(mode) {
  if (!(arguments.length === 1 && typeof mode === "number")) {
    throw new TypeError('Expected frontFace(number mode)');
  }
  return basep.frontFace.call(this, mode);
}

safep.generateMipmap = function generateMipmap(target) {
  if (!(arguments.length === 1 && typeof target === "number")) {
    throw new TypeError('Expected generateMipmap(number target)');
  }
  return basep.generateMipmap.call(this, target);
}

safep.getActiveAttrib = function getActiveAttrib(program, index) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && typeof index === "number")) {
    throw new TypeError('Expected getActiveAttrib(WebGLProgram program, number index)');
  }
  return wrapObject(basep.getActiveAttrib.call(this, program ? program._ : 0, index), WebGLActiveInfo);
}

safep.getActiveUniform = function getActiveUniform(program, index) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && typeof index === "number")) {
    throw new TypeError('Expected getActiveUniform(WebGLProgram program, number index)');
  }
  return wrapObject(basep.getActiveUniform.call(this, program ? program._ : 0, index), WebGLActiveInfo);
}

safep.getAttachedShaders = function getAttachedShaders(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected getAttachedShaders(WebGLProgram program)');
  }
  return basep.getAttachedShaders.call(this, program ? program._ : 0);
}

safep.getAttribLocation = function getAttribLocation(program, name) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && typeof name === "string")) {
    throw new TypeError('Expected getAttribLocation(WebGLProgram program, string name)');
  }
  return basep.getAttribLocation.call(this, program ? program._ : 0, name);
}

safep.getParameter = function getParameter(pname) {
  if (!(arguments.length === 1 && typeof pname === "number")) {
    throw new TypeError('Expected getParameter(number pname)');
  }
  return basep.getParameter.call(this, pname);
}

safep.getBufferParameter = function getBufferParameter(target, pname) {
  if (!(arguments.length === 2 && typeof target === "number" && typeof pname === "number")) {
    throw new TypeError('Expected getBufferParameter(number target, number pname)');
  }
  return basep.getBufferParameter.call(this, target, pname);
}

safep.getError = function getError() {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected getError()');
  }
  return basep.getError.call(this);
}

safep.getFramebufferAttachmentParameter = function getFramebufferAttachmentParameter(target, attachment, pname) {
  if (!(arguments.length === 3 && typeof target === "number" && typeof attachment === "number" && typeof pname === "number")) {
    throw new TypeError('Expected getFramebufferAttachmentParameter(number target, number attachment, number pname)');
  }
  return basep.getFramebufferAttachmentParameter.call(this, target, attachment, pname);
}

safep.getProgramParameter = function getProgramParameter(program, pname) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && typeof pname === "number")) {
    throw new TypeError('Expected getProgramParameter(WebGLProgram program, number pname)');
  }
  return basep.getProgramParameter.call(this, program ? program._ : 0, pname);
}

safep.getProgramInfoLog = function getProgramInfoLog(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected getProgramInfoLog(WebGLProgram program)');
  }
  return basep.getProgramInfoLog.call(this, program ? program._ : 0);
}

safep.getRenderbufferParameter = function getRenderbufferParameter(target, pname) {
  if (!(arguments.length === 2 && typeof target === "number" && typeof pname === "number")) {
    throw new TypeError('Expected getRenderbufferParameter(number target, number pname)');
  }
  return basep.getRenderbufferParameter.call(this, target, pname);
}

safep.getShaderParameter = function getShaderParameter(shader, pname) {
  if (!(arguments.length === 2 && (shader === null || shader instanceof WebGLShader) && typeof pname === "number")) {
    throw new TypeError('Expected getShaderParameter(WebGLShader shader, number pname)');
  }
  return basep.getShaderParameter.call(this, shader ? shader._ : 0, pname);
}

safep.getShaderInfoLog = function getShaderInfoLog(shader) {
  if (!(arguments.length === 1 && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected getShaderInfoLog(WebGLShader shader)');
  }
  return basep.getShaderInfoLog.call(this, shader ? shader._ : 0);
}

safep.getShaderSource = function getShaderSource(shader) {
  if (!(arguments.length === 1 && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected getShaderSource(WebGLShader shader)');
  }
  return basep.getShaderSource.call(this, shader ? shader._ : 0);
}

safep.getTexParameter = function getTexParameter(target, pname) {
  if (!(arguments.length === 2 && typeof target === "number" && typeof pname === "number")) {
    throw new TypeError('Expected getTexParameter(number target, number pname)');
  }
  return basep.getTexParameter.call(this, target, pname);
}

safep.getUniform = function getUniform(program, location) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && (location === null || location instanceof WebGLUniformLocation))) {
    throw new TypeError('Expected getUniform(WebGLProgram program, WebGLUniformLocation location)');
  }
  return basep.getUniform.call(this, program ? program._ : 0, location ? location._ : 0);
}

safep.getUniformLocation = function getUniformLocation(program, name) {
  if (!(arguments.length === 2 && (program === null || program instanceof WebGLProgram) && typeof name === "string")) {
    throw new TypeError('Expected getUniformLocation(WebGLProgram program, string name)');
  }
  return wrapObject(basep.getUniformLocation.call(this, program ? program._ : 0, name), WebGLUniformLocation);
}

safep.getVertexAttrib = function getVertexAttrib(index, pname) {
  if (!(arguments.length === 2 && typeof index === "number" && typeof pname === "number")) {
    throw new TypeError('Expected getVertexAttrib(number index, number pname)');
  }
  return basep.getVertexAttrib.call(this, index, pname);
}

safep.getVertexAttribOffset = function getVertexAttribOffset(index, pname) {
  if (!(arguments.length === 2 && typeof index === "number" && typeof pname === "number")) {
    throw new TypeError('Expected getVertexAttribOffset(number index, number pname)');
  }
  
  if(pname === gl.CURRENT_VERTEX_ATTRIB) {
    var buf=_getVertexAttribOffset(index, pname);
    return new Float32Array(buf);
  }
  return basep.getVertexAttribOffset.call(this, index, pname);
}

safep.hint = function hint(target, mode) {
  if (!(arguments.length === 2 && typeof target === "number" && typeof mode === "number")) {
    throw new TypeError('Expected hint(number target, number mode)');
  }
  return basep.hint.call(this, target, mode);
}

safep.isBuffer = function isBuffer(buffer) {
  if (!(arguments.length === 1 && (buffer === null || buffer instanceof WebGLBuffer))) {
    throw new TypeError('Expected isBuffer(WebGLBuffer buffer)');
  }
  return basep.isBuffer.call(this, buffer ? buffer._ : 0);
}

safep.isEnabled = function isEnabled(cap) {
  if (!(arguments.length === 1 && typeof cap === "number")) {
    throw new TypeError('Expected isEnabled(number cap)');
  }
  return basep.isEnabled.call(this, cap);
}

safep.isFramebuffer = function isFramebuffer(framebuffer) {
  if (!(arguments.length === 1 && (framebuffer === null || framebuffer instanceof WebGLFramebuffer))) {
    throw new TypeError('Expected isFramebuffer(WebGLFramebuffer framebuffer)');
  }
  return basep.isFramebuffer.call(this, framebuffer ? framebuffer._ : 0);
}

safep.isProgram = function isProgram(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected isProgram(WebGLProgram program)');
  }
  return basep.isProgram.call(this, program ? program._ : 0);
}

safep.isRenderbuffer = function isRenderbuffer(renderbuffer) {
  if (!(arguments.length === 1 && (renderbuffer === null || renderbuffer instanceof WebGLRenderbuffer))) {
    throw new TypeError('Expected isRenderbuffer(WebGLRenderbuffer renderbuffer)');
  }
  return basep.isRenderbuffer.call(this, renderbuffer ? renderbuffer._ : 0);
}

safep.isShader = function isShader(shader) {
  if (!(arguments.length === 1 && (shader === null || shader instanceof WebGLShader))) {
    throw new TypeError('Expected isShader(WebGLShader shader)');
  }
  return basep.isShader.call(this, shader ? shader._ : 0);
}

safep.isTexture = function isTexture(texture) {
  if (!(arguments.length === 1 && (texture === null || texture instanceof WebGLTexture))) {
    throw new TypeError('Expected isTexture(WebGLTexture texture)');
  }
  return basep.isTexture.call(this, texture ? texture._ : 0);
}

safep.lineWidth = function lineWidth(width) {
  if (!(arguments.length === 1 && typeof width === "number")) {
    throw new TypeError('Expected lineWidth(number width)');
  }
  return basep.lineWidth.call(this, width);
}

safep.linkProgram = function linkProgram(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected linkProgram(WebGLProgram program)');
  }
  return basep.linkProgram.call(this, program ? program._ : 0);
}

safep.pixelStorei = function pixelStorei(pname, param) {
  if (!(arguments.length === 2 && typeof pname === "number" && (typeof param === "number") || typeof param === "boolean")) {
    throw new TypeError('Expected pixelStorei(number pname, number param)');
  }
  
  if(typeof param === "boolean")
    param= param ? 1 : 0;
  return basep.pixelStorei.call(this, pname, param);
}

safep.polygonOffset = function polygonOffset(factor, units) {
  if (!(arguments.length === 2 && typeof factor === "number" && typeof units === "number")) {
    throw new TypeError('Expected polygonOffset(number factor, number units)');
  }
  return basep.polygonOffset.call(this, factor, units);
}

safep.readPixels = function readPixels(x, y, width, height, format, type, pixels) {
  if (!(arguments.length === 7 && typeof x === "number" && typeof y === "number" && typeof width === "number" && typeof height === "number" && typeof format === "number" && typeof type === "number" && typeof pixels === "object")) {
    throw new TypeError('Expected readPixels(number x, number y, number width, number height, number format, number type, ArrayBufferView pixels)');
  }
  return basep.readPixels.call(this, x, y, width, height, format, type, pixels);
}

safep.renderbufferStorage = function renderbufferStorage(target, internalformat, width, height) {
  if (!(arguments.length === 4 && typeof target === "number" && typeof internalformat === "number" && typeof width === "number" && typeof height === "number")) {
    throw new TypeError('Expected renderbufferStorage(number target, number internalformat, number width, number height)');
  }
  return basep.renderbufferStorage.call(this, target, internalformat, width, height);
}

safep.sampleCoverage = function sampleCoverage(value, invert) {
  if (!(arguments.length === 2 && typeof value === "number" && typeof invert === "boolean")) {
    throw new TypeError('Expected sampleCoverage(number value, boolean invert)');
  }
  return basep.sampleCoverage.call(this, value, invert);
}

safep.scissor = function scissor(x, y, width, height) {
  if (!(arguments.length === 4 && typeof x === "number" && typeof y === "number" && typeof width === "number" && typeof height === "number")) {
    throw new TypeError('Expected scissor(number x, number y, number width, number height)');
  }
  return basep.scissor.call(this, x, y, width, height);
}

safep.shaderSource = function shaderSource(shader, source) {
  if (!(arguments.length === 2 && (shader === null || shader instanceof WebGLShader) && typeof source === "string")) {
    throw new TypeError('Expected shaderSource(WebGLShader shader, string source)');
  }
  return basep.shaderSource.call(this, shader ? shader._ : 0, source);
}

safep.stencilFunc = function stencilFunc(func, ref, mask) {
  if (!(arguments.length === 3 && typeof func === "number" && typeof ref === "number" && typeof mask === "number")) {
    throw new TypeError('Expected stencilFunc(number func, number ref, number mask)');
  }
  return basep.stencilFunc.call(this, func, ref, mask);
}

safep.stencilFuncSeparate = function stencilFuncSeparate(face, func, ref, mask) {
  if (!(arguments.length === 4 && typeof face === "number" && typeof func === "number" && typeof ref === "number" && typeof mask === "number")) {
    throw new TypeError('Expected stencilFuncSeparate(number face, number func, number ref, number mask)');
  }
  return basep.stencilFuncSeparate.call(this, face, func, ref, mask);
}

safep.stencilMask = function stencilMask(mask) {
  if (!(arguments.length === 1 && typeof mask === "number")) {
    throw new TypeError('Expected stencilMask(number mask)');
  }
  return basep.stencilMask.call(this, mask);
}

safep.stencilMaskSeparate = function stencilMaskSeparate(face, mask) {
  if (!(arguments.length === 2 && typeof face === "number" && typeof mask === "number")) {
    throw new TypeError('Expected stencilMaskSeparate(number face, number mask)');
  }
  return basep.stencilMaskSeparate.call(this, face, mask);
}

safep.stencilOp = function stencilOp(fail, zfail, zpass) {
  if (!(arguments.length === 3 && typeof fail === "number" && typeof zfail === "number" && typeof zpass === "number")) {
    throw new TypeError('Expected stencilOp(number fail, number zfail, number zpass)');
  }
  return basep.stencilOp.call(this, fail, zfail, zpass);
}

safep.stencilOpSeparate = function stencilOpSeparate(face, fail, zfail, zpass) {
  if (!(arguments.length === 4 && typeof face === "number" && typeof fail === "number" && typeof zfail === "number" && typeof zpass === "number")) {
    throw new TypeError('Expected stencilOpSeparate(number face, number fail, number zfail, number zpass)');
  }
  return basep.stencilOpSeparate.call(this, face, fail, zfail, zpass);
}

safep.texImage2D = function texImage2D() {
  if(!(arguments.length == 9 || arguments.length == 6)) {
    throw new TypeError('Expected texImage2D(number target, number level, number internalformat, number width, number height, number border, number format, number type, ArrayBufferView pixels) \
        or texImage2D(number target, number level, number internalformat, number format, number type, Image pixels)');
  }

  if (arguments.length == 6) {
    var target = arguments[0], level = arguments[1], internalformat = arguments[2]
    var format = arguments[3], type = arguments[4], source = arguments[5]
    if(!(
        typeof target === "number" && 
        typeof level === "number" && typeof internalformat === "number" && 
        typeof format === "number" && typeof type === "number" && 
        (source==null || typeof source === "object"))) {
      throw new TypeError('Expected texImage2D(number target, number level, number internalformat, number format, number type, Image pixels)');
    }
    return basep.texImage2D.call(this, target, level, internalformat, pixels.width, pixels.height, 0, format, type, pixels);
  }
  else if (arguments.length == 9) {
    var target = arguments[0], level = arguments[1], internalformat = arguments[2]
    var width = arguments[3], height = arguments[4], border = arguments[5]
    var format = arguments[6], type = arguments[7], pixels = arguments[8]
    if(!(typeof target === "number" && 
        typeof level === "number" && typeof internalformat === "number" && 
        typeof width === "number" && typeof height === "number" && typeof border === "number" && 
        typeof format === "number" && typeof type === "number" && 
        (pixels==null || typeof pixels === "object"))) {
      throw new TypeError('Expected texImage2D(number target, number level, number internalformat, number width, number height, number border, number format, number type, ArrayBufferView pixels)');
    }
    return basep.texImage2D.call(this, target, level, internalformat, width, height, border, format, type, pixels);
  }
}

safep.texParameterf = function texParameterf(target, pname, param) {
  if (!(arguments.length === 3 && typeof target === "number" && typeof pname === "number" && typeof param === "number")) {
    throw new TypeError('Expected texParameterf(number target, number pname, number param)');
  }
  return basep.texParameterf.call(this, target, pname, param);
}

safep.texParameteri = function texParameteri(target, pname, param) {
  if (!(arguments.length === 3 && typeof target === "number" && typeof pname === "number" && typeof param === "number")) {
    throw new TypeError('Expected texParameteri(number target, number pname, number param)');
  }
  return basep.texParameteri.call(this, target, pname, param);
}

safep.texSubImage2D = function texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
  if (!(arguments.length === 9 && typeof target === "number" && typeof level === "number" && 
      typeof xoffset === "number" && typeof yoffset === "number" && 
      typeof width === "number" && typeof height === "number" && 
      typeof format === "number" && typeof type === "number" && 
      (pixels==null || typeof pixels === "object"))) {
    throw new TypeError('Expected texSubImage2D(number target, number level, number xoffset, number yoffset, number width, number height, number format, number type, ArrayBufferView pixels)');
  }
  return basep.texSubImage2D.call(this, target, level, xoffset, yoffset, width, height, format, type, pixels);
}

safep.uniform1f = function uniform1f(location, x) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && (typeof x === "number" || typeof x === "boolean"))) {
    throw new TypeError('Expected uniform1f(WebGLUniformLocation location, number x)');
  }
  return basep.uniform1f.call(this, location ? location._ : 0, x);
}

safep.uniform1fv = function uniform1fv(location, v) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof v === "object")) {
    throw new TypeError('Expected uniform1fv(WebGLUniformLocation location, FloatArray v)');
  }
  return basep.uniform1fv.call(this, location ? location._ : 0, asFloatArray(v));
}

safep.uniform1i = function uniform1i(location, x) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && (typeof x === "number" || typeof x ==="boolean"))) {
    throw new TypeError('Expected uniform1i(WebGLUniformLocation location, number x)');
  }
  if(typeof x === "boolean")
    x= x ? 1 : 0;
  return basep.uniform1i.call(this, location ? location._ : 0, x);
}

safep.uniform1iv = function uniform1iv(location, v) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof v === "object")) {
    throw new TypeError('Expected uniform1iv(WebGLUniformLocation location, Int32Array v)');
  }
  return basep.uniform1iv.call(this, location ? location._ : 0, asInt32Array(v));
}

safep.uniform2f = function uniform2f(location, x, y) {
  if (!(arguments.length === 3 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "number" && typeof y === "number")) {
    throw new TypeError('Expected uniform2f(WebGLUniformLocation location, number x, number y)');
  }
  return basep.uniform2f.call(this, location ? location._ : 0, x, y);
}

safep.uniform2fv = function uniform2fv(location, v) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof v === "object")) {
    throw new TypeError('Expected uniform2fv(WebGLUniformLocation location, FloatArray v)');
  }
  return basep.uniform2fv.call(this, location ? location._ : 0, asFloatArray(v));
}

safep.uniform2i = function uniform2i(location, x, y) {
  if (!(arguments.length === 3 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "number" && typeof y === "number")) {
    throw new TypeError('Expected uniform2i(WebGLUniformLocation location, number x, number y)');
  }
  return basep.uniform2i.call(this, location ? location._ : 0, x, y);
}

safep.uniform2iv = function uniform2iv(location, v) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof v === "object")) {
    throw new TypeError('Expected uniform2iv(WebGLUniformLocation location, Int32Array v)');
  }
  return basep.uniform2iv.call(this, location ? location._ : 0, asInt32Array(v));
}

safep.uniform3f = function uniform3f(location, x, y, z) {
  if (!(arguments.length === 4 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "number" && typeof y === "number" && typeof z === "number")) {
    throw new TypeError('Expected uniform3f(WebGLUniformLocation location, number x, number y, number z)');
  }
  return basep.uniform3f.call(this, location ? location._ : 0, x, y, z);
}

safep.uniform3fv = function uniform3fv(location, v) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof v === "object")) {
    throw new TypeError('Expected uniform3fv(WebGLUniformLocation location, FloatArray v)');
  }
  return basep.uniform3fv.call(this, location ? location._ : 0, asFloatArray(v));
}

safep.uniform3i = function uniform3i(location, x, y, z) {
  if (!(arguments.length === 4 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "number" && typeof y === "number" && typeof z === "number")) {
    throw new TypeError('Expected uniform3i(WebGLUniformLocation location, number x, number y, number z)');
  }
  return basep.uniform3i.call(this, location ? location._ : 0, x, y, z);
}

safep.uniform3iv = function uniform3iv(location, x) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "object")) {
    throw new TypeError('Expected uniform3iv(WebGLUniformLocation location, Int32Array x)');
  }
  return basep.uniform3iv.call(this, location ? location._ : 0, asInt32Array(x));
}

safep.uniform4f = function uniform4f(location, x, y, z, w) {
  if (!(arguments.length === 5 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "number" && typeof y === "number" && typeof z === "number" && typeof w === "number")) {
    throw new TypeError('Expected uniform4f(WebGLUniformLocation location, number x, number y, number z, number w)');
  }
  return basep.uniform4f.call(this, location ? location._ : 0, x, y, z, w);
}

safep.uniform4fv = function uniform4fv(location, v) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof v === "object")) {
    throw new TypeError('Expected uniform4fv(WebGLUniformLocation location, FloatArray v)');
  }
  return basep.uniform4fv.call(this, location ? location._ : 0, asFloatArray(v));
}

safep.uniform4i = function uniform4i(location, x, y, z, w) {
  if (!(arguments.length === 5 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "number" && typeof y === "number" && typeof z === "number" && typeof w === "number")) {
    throw new TypeError('Expected uniform4i(WebGLUniformLocation location, number x, number y, number z, number w)');
  }
  return basep.uniform4i.call(this, location ? location._ : 0, x, y, z, w);
}

safep.uniform4iv = function uniform4iv(location, x) {
  if (!(arguments.length === 2 && (location === null || location instanceof WebGLUniformLocation) && typeof x === "object")) {
    throw new TypeError('Expected uniform4iv(WebGLUniformLocation location, Int32Array x)');
  }
  return basep.uniform4iv.call(this, location ? location._ : 0, asInt32Array(x));
}

safep.uniformMatrix2fv = function uniformMatrix2fv(location, transpose, value) {
  if (!(arguments.length === 3 && (location === null || location instanceof WebGLUniformLocation) && typeof transpose === "boolean" && typeof value === "object")) {
    throw new TypeError('Expected uniformMatrix2fv(WebGLUniformLocation location, boolean transpose, FloatArray value)');
  }
  return basep.uniformMatrix2fv.call(this, location ? location._ : 0, transpose, asFloatArray(value));
}

safep.uniformMatrix3fv = function uniformMatrix3fv(location, transpose, value) {
  if (!(arguments.length === 3 && (location === null || location instanceof WebGLUniformLocation) && typeof transpose === "boolean" && typeof value === "object")) {
    throw new TypeError('Expected uniformMatrix3fv(WebGLUniformLocation location, boolean transpose, FloatArray value)');
  }
  return basep.uniformMatrix3fv.call(this, location ? location._ : 0, transpose, asFloatArray(value));
}

safep.uniformMatrix4fv = function uniformMatrix4fv(location, transpose, value) {
  if (!(arguments.length === 3 && (location === null || location instanceof WebGLUniformLocation) && typeof transpose === "boolean" && typeof value === "object")) {
    throw new TypeError('Expected uniformMatrix4fv(WebGLUniformLocation location, boolean transpose, FloatArray value)');
  }
  return basep.uniformMatrix4fv.call(this, location ? location._ : 0, transpose, asFloatArray(value));
}

safep.useProgram = function useProgram(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected useProgram(WebGLProgram program)');
  }
  return basep.useProgram.call(this, program ? program._ : 0);
}

safep.validateProgram = function validateProgram(program) {
  if (!(arguments.length === 1 && (program === null || program instanceof WebGLProgram))) {
    throw new TypeError('Expected validateProgram(WebGLProgram program)');
  }
  return basep.validateProgram.call(this, program ? program._ : 0);
}

safep.vertexAttrib1f = function vertexAttrib1f(indx, x) {
  if (!(arguments.length === 2 && typeof indx === "number" && typeof x === "number")) {
    throw new TypeError('Expected vertexAttrib1f(number indx, number x)');
  }
  return basep.vertexAttrib1f.call(this, indx, x);
}

safep.vertexAttrib1fv = function vertexAttrib1fv(indx, values) {
  if (!(arguments.length === 2 && typeof indx === "number" && typeof values === "object")) {
    throw new TypeError('Expected vertexAttrib1fv(number indx, FloatArray values)');
  }
  return basep.vertexAttrib1fv.call(this, indx, asFloatArray(values));
}

safep.vertexAttrib2f = function vertexAttrib2f(indx, x, y) {
  if (!(arguments.length === 3 && typeof indx === "number" && typeof x === "number" && typeof y === "number")) {
    throw new TypeError('Expected vertexAttrib2f(number indx, number x, number y)');
  }
  return basep.vertexAttrib2f.call(this, indx, x, y);
}

safep.vertexAttrib2fv = function vertexAttrib2fv(indx, values) {
  if (!(arguments.length === 2 && typeof indx === "number" && typeof values === "object")) {
    throw new TypeError('Expected vertexAttrib2fv(number indx, FloatArray values)');
  }
  return basep.vertexAttrib2fv.call(this, indx, asFloatArray(values));
}

safep.vertexAttrib3f = function vertexAttrib3f(indx, x, y, z) {
  if (!(arguments.length === 4 && typeof indx === "number" && typeof x === "number" && typeof y === "number" && typeof z === "number")) {
    throw new TypeError('Expected vertexAttrib3f(number indx, number x, number y, number z)');
  }
  return basep.vertexAttrib3f(indx, x, y, z);
}

safep.vertexAttrib3fv = function vertexAttrib3fv(indx, values) {
  if (!(arguments.length === 2 && typeof indx === "number" && typeof values === "object")) {
    throw new TypeError('Expected vertexAttrib3fv(number indx, FloatArray values)');
  }
  return basep.vertexAttrib3fv.call(this, indx, asFloatArray(values));
}

safep.vertexAttrib4f = function vertexAttrib4f(indx, x, y, z, w) {
  if (!(arguments.length === 5 && typeof indx === "number" && typeof x === "number" && typeof y === "number" && typeof z === "number" && typeof w === "number")) {
    throw new TypeError('Expected vertexAttrib4f(number indx, number x, number y, number z, number w)');
  }
  return basep.vertexAttrib4f.call(this, indx, x, y, z, w);
}

safep.vertexAttrib4fv = function vertexAttrib4fv(indx, values) {
  if (!(arguments.length === 2 && typeof indx === "number" && typeof values === "object")) {
    throw new TypeError('Expected vertexAttrib4fv(number indx, FloatArray values)');
  }
  return basep.vertexAttrib4fv.call(this, indx, asFloatArray(values));
}

safep.vertexAttribPointer = function vertexAttribPointer(indx, size, type, normalized, stride, offset) {
  if (!(arguments.length === 6 && typeof indx === "number" && typeof size === "number" && typeof type === "number" && (typeof normalized === "boolean" || typeof normalized === "number") && typeof stride === "number" && typeof offset === "number")) {
    throw new TypeError('Expected vertexAttribPointer(number indx, number size, number type, boolean normalized, number stride, number offset)');
  }
  return basep.vertexAttribPointer.call(this, indx, size, type, normalized, stride, offset);
}

safep.viewport = function viewport(x, y, width, height) {
  if (!(arguments.length === 4 && typeof x === "number" && typeof y === "number" && typeof width === "number" && typeof height === "number")) {
    throw new TypeError('Expected viewport(number x, number y, number width, number height)');
  }
  return basep.viewport.call(this, x, y, width, height);
}

return webgl

}
