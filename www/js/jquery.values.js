/* jQuery.values: get or set all of the name/value pairs from child input controls
 * @argument data {array} If included, will populate all child controls.
 * @returns element if data was provided, or array of values if not
 */

$.fn.values = function(data) {
  var els = this.find(':input').get();

  if(arguments.length === 0) {
    // return all data
    data = {};

    $.each(els, function() {
      // checkbox
      if (this.name && !this.disabled && /checkbox/i.test(this.type)) {
        var name = this.name + ':' + $(this).val();
        if(data[name] == undefined){
          data[name] = [];
        }
        data[name].push(this.checked);
      // other
      } else if (this.name && !this.disabled && (this.checked
          || /select|textarea/i.test(this.nodeName)
          || /text|hidden|password/i.test(this.type))) {
        if(data[this.name] == undefined){
          data[this.name] = [];
        }
        data[this.name].push($(this).val());
      }
    });
    return data;
  } else {
    // checkboxだけ別に対応
    for (var prop in data) {
      var index = prop.indexOf(':');
      if (index === -1) {
        continue;
      }
      var val = prop.substr(index + 1);

      var checkboxes = $.grep(els, function(el) {
        return el.type === 'checkbox' && el.value === val;
      });

      checkboxes.forEach(function(checkbox, i) {
        checkbox.checked = data[prop][i];
      });
    }
    // checkbox以外
    $.each(els, function() {
      if (this.name && data[this.name]) {
        var names = data[this.name];
        var $this = $(this);
        if(Object.prototype.toString.call(names) !== '[object Array]'){
          names = [names]; //backwards compat to old version of this code
        }
        if(this.type == 'checkbox' || this.type == 'radio') { 
          var val = $this.val();
          var found = false;
          for(var i = 0; i < names.length; i++){
            if(names[i] == val){
              found = true;
              break;
            }
          }
          $this.attr("checked", found);
        } else {
          var elName = $this.prop('name');
          $this.parents('form').find('*[name="' + elName + '"]').each(function(i, el) {
            $(el).val(names[i]);
          });
          //$this.val(names[0]);
        }
      }
    });
    return this;
  }
};
