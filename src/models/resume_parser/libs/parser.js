var _          = require('underscore'),
    resume     = require('../resume'),
    dictionary = require('../dictionary');

module.exports = {
  parse: parse
};

function parse(PreparedFile, cbReturnResume) {
  var rawFileData = PreparedFile.raw,
      Resume      = new resume(),
      rows        = rawFileData.split("\n"),
      row;

  parseDictionaryRegular(rawFileData, Resume);

  for (var i = 0; i < rows.length; i++) {
    row = rows[i];

    row = parseDictionaryProfiles(row, Resume);
    parseDictionaryTitles(Resume, rows, i);
    parseDictionaryInline(Resume, row);
  }

  if (_.isFunction(cbReturnResume)) {
    cbReturnResume(Resume);
  } else {
    console.error('cbReturnResume should be a function');
  }
}

function parseDictionaryInline(Resume, row) {
  var find;

  _.forEach(dictionary.inline, function (expression, key) {
    find = new RegExp(expression).exec(row);
    if (find) {
      Resume.addKey(key.toLowerCase(), find[1]);
    }
  });
}

function parseDictionaryRegular(data, Resume) {
  var regularDictionary = dictionary.regular,
      find;

  _.forEach(regularDictionary, function (expressions, key) {
    _.forEach(expressions, function (expression) {
      find = new RegExp(expression).exec(data);
      if (find) {
        Resume.addKey(key.toLowerCase(), find[0]);
      }
    });
  });
}

function parseDictionaryTitles(Resume, rows, rowIdx) {
  var allTitles        = _.flatten(_.toArray(dictionary.titles)).join('|'),
      searchExpression = '',
      row              = rows[rowIdx],
      ruleExpression,
      isRuleFound,
      result;

  _.forEach(dictionary.titles, function (expressions, key) {
    expressions = expressions || [];
    if (countWords(row) <= 5) {
      _.forEach(expressions, function (expression) {
        ruleExpression = new RegExp(expression);
        isRuleFound = ruleExpression.test(row);

        if (isRuleFound) {
          allTitles = _.without(allTitles.split('|'), key).join('|');
          searchExpression = '(?:' + expression + ')((.*\n)+?)(?:' + allTitles + '|{end})';
          result = new RegExp(searchExpression, 'gm').exec(restoreTextByRows(rowIdx, rows));

          if (result) {
            Resume.addKey(key, result[1]);
          }
        }
      });
    }
  });
}

function parseDictionaryProfiles(row, Resume) {
  var regularDictionary = dictionary.profiles,
      find,
      modifiedRow       = row;

  _.forEach(regularDictionary, function (expression) {
    var expressionHandler;

    if (_.isArray(expression)) {
      if (_.isFunction(expression[1])) {
        expressionHandler = expression[1];
      }
      expression = expression[0];
    }
    find = new RegExp(expression).exec(row);
    if (find) {
      Resume.addKey('profiles', find[0] + "\n");
      modifiedRow = row.replace(find[0], '');
      if (_.isFunction(expressionHandler)) {
        expressionHandler(find[0], Resume, profilesWatcher);
      }
    }
  });

  return modifiedRow;
}

function restoreTextByRows(rowNum, allRows) {
  rowNum = rowNum - 1;
  var rows = [];

  do {
    rows.push(allRows[rowNum]);
    rowNum++;
  } while (rowNum < allRows.length);

  return rows.join("\n");
}

function countWords(str) {
  return str.split(' ').length;
}
