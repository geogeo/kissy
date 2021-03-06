var S = require('../../../build/kissy-nodejs');

S.ready(function(S){


	/* 'window' and 'document' are prepared by KISSY by default */

	/* you can also get 'window' via S.Browser */

    var self = window.self;
    var navigator = window.navigator;
    var location = window.location;

    document.title = 'Example #1';

    //With the local aliases
    var el = document.createElement('div');
    el.id = 'foo';
    el.innerHTML = '<em>This is a test</em> This <strong class="odd">is another</strong> test ';
    document.body.appendChild(el);


    //SCOPED
    var el2 = document.createElement('div');
    el2.id = 'foo2bar';
    el2.innerHTML = '<em class="odd">This is a test</em> This <strong>is another</strong> test ';
    document.body.appendChild(el2);

    console.log('getElementByid(foo2bar): ' + document.getElementById('foo2bar'));
    console.log('getElementByid(foo): ' + document.getElementById('foo'));
    console.log('getElementByTagName(em): ' + document.getElementsByTagName('em'));
    console.log('getElementByClassName(odd): ' + document.getElementsByClassName('odd'));

    console.log('');
    console.log('document.outerHTML: ');
    console.log(document.outerHTML);
});


