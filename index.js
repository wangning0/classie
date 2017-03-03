/**
 * 
 * @author wingWang
 * 
 */

;(function(window) {
    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    // IE10+ support classList
    if('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        }
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if( !hasClass(elem, c) ) {
                elem.className += ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className.replace(classReg(c), ' ');
        }
    }

    function toogleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    
    var classie = {
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toogleClass
    };

    if(typeof define === 'function' && define.amd) {
        define(classie);
    } else if(typeof module !== 'undefined' && module.exports) {
        module.exports = classie;
    } else {
        window.classie = classie;
    }
})(window);