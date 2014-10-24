/*exported setupBackendMock*/
function setupBackendMock($httpBackend)
{
    'use strict';

    function decodeUriQuery(val, pctEncodeSpaces)
    {
        val = val.replace(/@/gi, '%40').replace(/:/gi, '%3A').replace(/\$/g, '%24').replace(/,/gi, '%2C');
        if (pctEncodeSpaces) {
            val = val.replace(/\+/g, '%20');
        }
        return decodeURIComponent(val);
    }

    function decodeUriSegment(val)
    {
        return decodeUriQuery(val, true).replace(/&/gi, '%26').replace(/=/gi, '%3D').replace(/\+/gi, '%2B');
    }

    function parseQueryString(url)
    {
        var args = url.split('?');
        args = args[1] || args[0];
        args = args.split('&');
        var result = {};
        var arg;
        for (var i = 0; i < args.length; i++) {
            arg = decodeURI(args[i]);

            if (-1 === arg.indexOf('=')) {
                result[arg.trim()] = true;
            } else {
                var kvp = arg.split('=');
                result[kvp[0].trim()] = kvp[1].trim();
            }
        }
        return result;
    }

    function randomPositiveInt(celling)
    {
        return Math.max(1, Math.round(Math.random() * (celling || 9)));
    }

    function loremIpsum(sentencesCount)
    {
        var sentences = [
                    'Litwo! Ojczyzno moja! Ty jesteś jak zdrowie. Ile cię stracił. ' +
                    'Dziś człowieka rodu, obyczajów! Dość, że w cząstce spadły dalekim mieści' +
                    'kończył nauki, końca doczekał nareszcie. Wbiega i niech mi się nie wiem, czy go myślano do ' +
                    'usług publicznych sposobił z żoną i z wieczerzą powynosić z boku sąsiadki a bij jak ' +
                    'naoczne świadki. I też nie daje czasu szukać prawodawstwa w zastępstwie gospodarza, ' +
                    'w stodołę na on żył, co prędzej w Piramidy, w języku strzelecki dzik, niedźwiedź, ' +
                    'łoś, wilk zwany był żonaty a Sędziego wolą była i każdego wodza legijonu i jadł. wtem ' +
                    'z Paryża a starzy i oczy wkoło są rowni. Choć Sędzia tuż na Lombardzkiem polu.' +
                    ' Jak Kniaziewicz rozkazy i gumiennym pisarzom, ochmistrzyni, strzelcom i Rzeczpospolita! ' +
                    'Zawżdy z '
        ];

        var result = '';
        for (var i = 0; i < sentencesCount; i++) {
            var index = Math.min(sentences.length - 1, Math.round(Math.random() * sentences.length));
            result += sentences[index];
        }
        return result;
    }

    var sequence = 1;
    var tasks = {};
    [
        {id: sequence++, title: 'Configure AngularJS routing', description: loremIpsum(2),
            repositoryUrl: 'https://github.com/aniaw/angular-exercises.git', branchName: 'exercise1',
            assignTo: [1, 2], tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Bind Posts', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Bind Posts From DAO', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Implement DAO', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Creating own DAO resource', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Create CRUD', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Using angular-xeditable', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Typeahead component', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Multilanguage using angular-gettext', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Drag and Drop', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Pagination Support', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Configure backend mocking', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]}
    ].every(function (value)
            {
                tasks[value.id] = value;
                return true;
            });

    var testSequence = 1;
    var tests = {};
    [
        {id: testSequence++, title: 'Angular awesome tests', description: loremIpsum(3), assignedTask: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
        {id: testSequence++, title: 'JavaScript great tests', description: loremIpsum(3), assignedTask: [4, 5]},
        {id: testSequence++, title: 'Other tests 1', description: loremIpsum(3), assignedTask: [1, 3, 5, 7, 9]},
        {id: testSequence++, title: 'Other tests 2', description: loremIpsum(3), assignedTask: [10]},
        {id: testSequence++, title: 'Other tests 3', description: loremIpsum(3), assignedTask: [11, 12]},
        {id: testSequence++, title: 'Other tests 4', description: loremIpsum(3), assignedTask: [1, 2, 4, 5]},
        {id: testSequence++, title: 'Other tests 5', description: loremIpsum(3), assignedTask: [1, 2]},
        {id: testSequence++, title: 'Other tests 6', description: loremIpsum(3), assignedTask: [6, 7]},
        {id: testSequence++, title: 'Other tests 7', description: loremIpsum(3), assignedTask: [8, 9, 10]},
        {id: testSequence++, title: 'Other tests 8', description: loremIpsum(3), assignedTask: [10]},
        {id: testSequence++, title: 'Other tests 9', description: loremIpsum(3), assignedTask: [11]},
        {id: testSequence++, title: 'Other tests 10', description: loremIpsum(3), assignedTask: [12]},
        {id: testSequence++, title: 'Other tests with really really really really really really really long title, I dont now for what... 11',
            description: loremIpsum(3), assignedTask: [1, 5, 9]}
    ].every(function (value)
            {
                tests[value.id] = value;
                return true;
            });

    var trialSequence = 1;
    var trials = {};
    [
        {id: trialSequence++, test: 'AngularJS Test 1', student: 'Joe', createDate: '2014-01-01',
            submitDate: '2014-01-02', startDate: '2014-01-01', status: 'open'},
        {id: trialSequence++, test: 'JavaScript Test 1', student: 'John', createDate: '2014-06-07',
            submitDate: '2014-06-22', startDate: '2014-06-20', status: 'failed'},
        {id: trialSequence++, test: 'AngularJS Test 2', student: 'Max', createDate: '2014-12-06',
            submitDate: '2014-12-31', startDate: '2014-12-25', status: 'passed'},
        {id: trialSequence++, test: 'AngularJS Test 3', student: 'David', createDate: '2014-09-25',
            submitDate: '2014-10-20', startDate: '2014-10-13', status: 'passed'},
        {id: trialSequence++, test: 'JavaScript Test 2', student: 'Mary', createDate: '2014-07-05',
            submitDate: '2014-07-31', startDate: '2014-07-10', status: 'failed'},
        {id: trialSequence++, test: 'HTML Test 1', student: 'Peter', createDate: '2014-02-15',
            submitDate: '2014-03-07', startDate: '2014-02-27', status: 'open'},
        {id: trialSequence++, test: 'HTML Test 2', student: 'Dan', createDate: '2014-08-05',
            submitDate: '2014-08-21', startDate: '2014-08-08', status: 'open'},
        {id: trialSequence++, test: 'CCS Test 1', student: 'Phil', createDate: '2014-04-30',
            submitDate: '2014-05-03', startDate: '2014-05-01', status: 'passed'},
        {id: trialSequence++, test: 'HTML Test 1', student: 'Martin', createDate: '2014-11-22',
            submitDate: '2014-11-30', startDate: '2014-11-29', status: 'failed'},
        {id: trialSequence++, test: 'JavaScript Test 2', student: 'Amanda', createDate: '2014-09-01',
            submitDate: '2014-08-17', startDate: '2014-08-15', status: 'open'},
        {id: trialSequence++, test: 'JavaScript Test 3', student: 'Lucy', createDate: '2014-09-30',
            submitDate: '2014-10-25', startDate: '2014-10-20', status: 'failed'},
        {id: trialSequence++, test: 'AngularJS Test 1', student: 'Sandra', createDate: '2014-01-13',
            submitDate: '2014-01-28', startDate: '2014-01-19', status: 'passed'}
    ].every(function (value)
            {
                trials[value.id] = value;
                return true;
            });


    var branches = ['exercise1',
                    'select2Exercise',
                    'angularExercises2',
                    'angularExercises2',
                    'testBranch',
                    'htmlExercises',
                    'c++v1',
                    'c++v2',
                    'pascal',
                    'Java',
                    'testingPractice',
                    'programingPractice'];

    var tags = {};
    [
        {id: 1, text: 'javascript'},
        {id: 2, text: 'bootstrap'},
        {id: 3, text: 'angular'},
        {id: 4, text: 'node'},
        {id: 5, text: 'grunt'},
        {id: 6, text: 'git'}
    ].every(function (value)
            {
                tags[value.id] = value;
                return true;
            });

    $httpBackend.whenGET(/\/api\/task(\?.*)$/).respond(function (method, url)
    {
        var params = parseQueryString(url);
        var first = parseInt(params.from) || 0;
        var max = parseInt(params.size) || 10;

        var count = 0;
        var result = [];
        var searchString = params.query ? decodeUriSegment(params.query).toLowerCase() : params.query;
        angular.forEach(tasks, function (task)
        {
            if (task && ( !searchString || -1 < task.title.toLowerCase().indexOf(searchString))) {
                if ((count >= first) && (count < first + max)) {
                    result.push(task);
                }
                count++;
            }
        });
        return [200, {results: result, total: count}];
    });

    $httpBackend.whenGET(/\/api\/task\/(\d+)/).respond(function (method, url)
    {
        var match;
        match = /\/api\/task\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            return [200, tasks[id]];
        }
        return [404];
    });

    $httpBackend.whenPOST(/\/api\/task$/).respond(function (method, url, jsonParams)
    {
        var task = JSON.parse(jsonParams);
        var id;
        if (task.hasOwnProperty('id')) { // update
            id = task.id;
            tasks[id] = task;
            return [200, tasks[id]];
        } else { // create
            task.id = sequence++;
            tasks[task.id] = task;
            return [200, tasks];
        }
    });

    $httpBackend.whenDELETE(/\/api\/task\/(\d+)/).respond(function (method, url)
    {
        var match = /\/api\/task\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            angular.forEach(tests, function (test)
            {
                var position = test.assignedTask.indexOf(id);
                if (-1 < position) {
                    tests[test.id].assignedTask.splice(position, 1);
                }
            });
            delete tasks[id];
            return [200];
        }
        return [404];
    });

    $httpBackend.whenGET(/\/api\/task\/branches\/(.*)(\?.*)/).respond(function (method, url)
    {
        var match = /\/api\/task\/branches\/(.*)(\?.*)/.exec(url);
        var queryParams = parseQueryString(match[2]);
        var query = queryParams.query || '';
        var branchList = [];
        for (var i = 0; 2 + randomPositiveInt(7) > i; i++) {
            var branch = branches[i];
            if (-1 < branch.indexOf(query)) {
                branchList.push(branch);
            }
        }
        return [200, branchList];
    });

    $httpBackend.whenGET(/\/api\/task\/tags(\?.*)$/).respond(function (method, url)
    {
        var match = /\/api\/task\/tags(\?.*)/.exec(url);
        var queryParams = parseQueryString(match[1]);
        var query = queryParams.query || '';
        var tagList = [];

        angular.forEach(tags, function (tag)
        {
            if (tag && ( !query || -1 < tag.text.toLowerCase().indexOf(query))) {
                tagList.push(tag);
            }
        });
        return [200, tagList];
    });

    $httpBackend.whenGET(/\/api\/test(\?.*)$/).respond(function (method, url)
    {
        var params = parseQueryString(url);
        var first = parseInt(params.from) || 0;
        var max = parseInt(params.size) || 10;

        var count = 0;
        var result = [];
        var searchString = params.query ? decodeUriSegment(params.query).toLowerCase() : params.query;
        angular.forEach(tests, function (test)
        {
            if (test && ( !searchString || -1 < test.title.toLowerCase().indexOf(searchString))) {
                if ((count >= first) && (count < first + max)) {
                    result.push(test);
                }
                count++;
            }
        });
        return [200, {results: result, total: count}];
    });

    $httpBackend.whenGET(/\/api\/test\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/api\/test\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            return [200, tests[id]];
        }
        return [404];
    });

    $httpBackend.whenDELETE(/\/api\/test\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/api\/test\/(\d+)/.exec(url);
        if (match) {
            var id = parseInt(match[1], 10);
            delete tests[id];
            return [200];
        }
        return [404];
    });

    $httpBackend.whenPOST(/\/api\/test$/).respond(function (method, url, testData)
    {
        testData = JSON.parse(testData);

        if (tests[testData.id]) {
            tests[testData.id] = testData;
        } else {
            testData.id = testSequence++;
            tests[testData.id] = testData;
        }
        tests[testData.id] = angular.extend({description: 'A new test, maybe some description?', assignedTask: [], tags: []}, tests[testData.id]);

        return [200, testData];
    });

    $httpBackend.whenPOST(/\/api\/test\/(\d+)\/task/).respond(function (method, url, tasks)
    {
        var match = /\/api\/test\/(\d+)\/task/.exec(url);
        var testId = parseInt(match[1], 10);
        tasks = JSON.parse(tasks);

        angular.forEach(tasks, function (taskId)
        {
            if (-1 === tests[testId].assignedTask.indexOf(taskId)) {
                tests[testId].assignedTask.push(taskId);
            }
        });

        var associatedTasks = [];
        return [200, associatedTasks];
    });

    $httpBackend.whenGET(/\/api\/test\/(\d+)\/task/).respond(function (method, url)
    {
        var match = /\/api\/test\/(\d+)\/task/.exec(url);
        var testId = parseInt(match[1], 10);

        var params = parseQueryString(url);
        var first = parseInt(params.from) || 0;
        var max = parseInt(params.size) || 10;

        var count = 0;
        var result = [];
        var searchString = params.query ? decodeUriSegment(params.query).toLowerCase() : params.query;
        angular.forEach(tasks, function (task)
        {

            if (task && (-1 < tests[testId].assignedTask.indexOf(task.id)) && ( !searchString || -1 < task.title.toLowerCase().indexOf(searchString))) {
                if ((count >= first) && (count < first + max)) {
                    result.push(task);
                }
                count++;
            }
        });
        return [200, {results: result, total: count}];
    });

    $httpBackend.whenDELETE(/\/api\/test\/(\d+)\/task\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/api\/test\/(\d+)\/task\/(\d+)$/.exec(url);
        var testId = parseInt(match[1], 10);
        var taskId = parseInt(match[2], 10);
        var position = tests[testId].assignedTask.indexOf(taskId);

        if (match || -1 < position) {
            tests[testId].assignedTask.splice(position, 1);
            return [200];
        }
        return [404];
    });

    $httpBackend.whenPOST(/\/api\/trial$/).respond(function (method, url, jsonParams)
    {
        var trial = JSON.parse(jsonParams);
        trial.id = trialSequence++;
        var date = new Date();
        trial.createDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
        trial.status = 'open';
        trials[trial.id] = trial;
        return [200, trial];
    });

    $httpBackend.whenGET(/\/api\/trial(\?.*)$/).respond(function (method, url)
    {
        var params = parseQueryString(url);
        var first = parseInt(params.from) || 0;
        var max = parseInt(params.size) || 10;

        var count = 0;
        var result = [];
        for (var i in trials) {
            if (trials.hasOwnProperty(i) &&
                    ((-1 < trials[i].test.indexOf(params.query) || !params.query) ||
                            (-1 < trials[i].student.indexOf(params.query) || !params.query) ||
                            (-1 < trials[i].status.indexOf(params.query) || !params.query))) {
                if (count >= first && count < first + max) {
                    result.push(trials[i]);
                }
                count++;
            }
        }
        return [200, {results: result, total: count}];
    });

    $httpBackend.whenGET(/.*\.html/).passThrough();
}
