//on document ready
$(function () {

    //$.validator.setDefaults({        
    //    highlight: function (element) {
    //        $(element).closest('.form-group').addClass('has-error');
    //    },
    //    unhighlight: function (element) {
    //        $(element).closest('.form-group').removeClass('has-error');
    //    },
    //    errorElement: 'span',
    //    errorClass: 'help-block',
    //    errorPlacement: function (error, element) {
    //        if (element.parent('.input-group').length) {
    //            error.insertAfter(element.parent());
    //        } else {
    //            error.insertAfter(element);
    //        }
    //    }
    //});

    // if you want to use jQuery validation with chosen plugin uncomment line below
    //$.validator.setDefaults({ ignore: ":hidden:not(.chosen-select)" })
    //$.validator.setDefaults({ ignore: [] });

    $.validator.unobtrusive.adapters.add(
               'atleastonerequired', ['properties'], function (options) {
                   options.rules['atleastonerequired'] = options.params;
                   options.messages['atleastonerequired'] = options.message;
               }
                 );

    $.validator.addMethod('atleastonerequired', function (value, element, params) {
        var properties = params.properties.split(',');
        var values = $.map(properties, function (property, index) {
            var val = $('#' + property).val();
            return val != '' ? val : null;
        });
        return values.length > 0;
    }, '');

    // handles an error in Chrome that doesn't not recognise date validation using datepicker
    $.validator.addMethod('date', function (value, element, params) {

        if (this.optional(element)) { return true; }

        var ok = true;

        try {  $.datepicker.parseDate('yy/mm/dd', value);  } catch(err) { ok = false; }

        return ok;
    });
});

// override jquery validate plugin defaults
$.validator.setDefaults({
    ignore: ":hidden:not(select) .ignoreField",
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
        $(element).closest('.form-group').find('span.help-block').remove();
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        if ($(element).closest('.form-group').length) {
            //$("<span class = 'help-block'>" + error + "</span>").insertAfter($(element).closest('.form-group'));
            //$(element).closest('.form-group').append()

            error.insertAfter(element.parent());
        } else {
            //$("<span class = 'help-block'>" + error + "</span>").insertAfter(element);

            error.insertAfter(element);
        }
    }
    ,
    showErrors: function (errorMap, errorList) {
        //alert(errorList[0].message);
        this.defaultShowErrors();
        //    $('.help-block').remove();

        for (var i = 0; i < errorList.length; i++) {
            var error = errorList[i];
            if ($(error.element).closest('.form-group').find('span.help-block').length == 0) {
                $(error.element).closest('.form-group').append("<span class = 'help-block'>" + error.message + "</span>");

            }
            else if ($(error.element).closest('.form-group').find('span.help-block').length != 0 && $(error.element).closest('.form-group').find('span.help-block').html() != error.message) {
                //console.log('1:' + $(error.element).closest('.form-group').find('span.help-block').html());
                //console.log('2:'+ error.message);
                $(error.element).closest('.form-group').find('span.help-block').remove();
                $(error.element).closest('.form-group').append("<span class = 'help-block'>" + error.message + "</span>");
            }

            //$("<span class = 'help-block'>" + error.message + "</span>").insertAfter($("#" + error.element.id));
            //var span = document.createElement('span');
            //span.text(error.message);
            //        $("#" + error.element.id).appendChild(span);
            //$("#" + error.element.id).insertAfter({ trigger: "focus" }).attr("data-original-title", error.message)
        }

    }
});

$.validator.addMethod('requiredifdependencyvalue', function (value, element, params) {
    var alloweddpProp = params.dependencyproperty;
    if (alloweddpProp.indexOf("|") >= 0) {
        var dpProps = alloweddpProp.split("|");
        var numberProp = 0;

        for (var j = 0, len = dpProps.length; j < len; j++) {
            var currentdpvalue = $('select[name="' + dpProps[j] + '"]').chosen().val() || $('.active input[name="' + dpProps[j] + '"]').val();

            var alloweddpvalue = params.dependencyvalue;

            if (alloweddpvalue.indexOf("|") >= 0) {
                var dpValues = alloweddpvalue.split("|");
                var number = 0;
                for (var i = 0, len = dpValues.length; i < len; i++) {
                    var alvalue = dpValues[i];
                    if (currentdpvalue == alvalue && (value == null || value === '')) {
                        number = 1;
                    }
                }
                if (number === 1) {
                    numberProp = 1;
                }
                else {
                    numberProp = 0;
                }
            }
            else {
                if (currentdpvalue === alloweddpvalue && (value == null || value === '')) {
                    numberProp = 1;
                }
                else
                    numberProp = 0;
            }
        }
        if (numberProp === 1) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        if ($('#' + params.dependencyproperty).is(':checkbox')) {
            var currentdpvalue = $('#' + params.dependencyproperty).is(":checked");
            currentdpvalue = currentdpvalue.toString();
        }
        else {
            var currentdpvalue = $('select[name="' + params.dependencyproperty + '"]').chosen().val() || $('.active input[name="' + params.dependencyproperty + '"]').val();
        }

        var alloweddpvalue = params.dependencyvalue;
        if (alloweddpvalue.indexOf("|") >= 0) {
            var dpValues = alloweddpvalue.split("|");
            var number = 0;
            for (var i = 0, len = dpValues.length; i < len; i++) {
                var alvalue = dpValues[i];
                if (currentdpvalue == alvalue && (value == null || value === '')) {
                    number = 1;
                }
            }
            if (number === 1) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (currentdpvalue === alloweddpvalue && (value == null || value === '')) {
                return false;
            }
            else
                return true;
        }
    }
}, '');

$.validator.unobtrusive.adapters.addSingleVal('requiredifcustomertype', 'ctype');

jQuery.validator.unobtrusive.adapters.add("requiredifdependencyvalue", ["dependencyproperty", "dependencyvalue"],
    function (options) {
        options.rules['requiredifdependencyvalue'] = {
            dependencyproperty: options.params.dependencyproperty,
            dependencyvalue: options.params.dependencyvalue,
        };
        options.messages['requiredifdependencyvalue'] = options.message;
    }
);


$(document).ready(function (e) {
    //Bind Ajax calls to special buttons
    urlbinder();

    $("div.validation-summary-errors").has("li:visible").addClass("alert alert-block alert-warning");
});

//parsing the unobtrusive attributes when we get content via ajax
$(document).ajaxComplete(function () {
    $.validator.unobtrusive.parse(document);

    //by default jquery.validate 1.9 doesn't validate hidden inputs
    if ($.validator) $.validator.setDefaults({
        ignore: []
    });

});

$(document).ready(function () {
    $('.input-group.date').datepicker({
        format: "yyyy/mm/dd",
        todayBtn: "linked",
        todayHighlight: true
    });
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function getHome() {
    return document.getElementById("ApplicationRoot").href;
}

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}


$.validator.setDefaults({ ignore: [] });