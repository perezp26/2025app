    function dateFormat(value) {
        if (value.match(/^\d{2}$/) !== null) {
          return value + '/';
        } else if (value.match(/^\d{2}\/\d{2}$/) !== null) {
          return value + '/';
        }
        return value;
      }