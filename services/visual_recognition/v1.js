/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');

function VisualRecognition(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/visual-recognition-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Provides a list of the labels and label_groups
 * which are available for use with the recognize method
 *
 */
VisualRecognition.prototype.labels = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/tag/labels',
      qs: params,
      json: true,
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Classifies @param imgFile against @param labels_to_check classifiers.
 * The response includes a score for a label if the score meets the minimum
 * threshold of 0.5
 *
 * @param  {ReadStream} imgFile The image file to analyze.
 * @param  {String} labels_to_check The labels to check
 */
VisualRecognition.prototype.recognize = function(params, callback) {
  var formData = params || {};

  if (!formData.imgFile){
    callback(new Error('Missing required parameters: imgFile'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/tag/recognize',
      formData: formData,
      json: true,
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = VisualRecognition;