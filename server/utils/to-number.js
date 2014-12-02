'use strict';

module.exports = function (value) {
  if (!value) {
    return;
  }

  return Number(value.trim());
};
