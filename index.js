var strVar="<div>";
strVar += "<div style=\"background-color:#fff;border:1px solid #CCC\"><button class=\"uk-button\" v-on:click.prevent=\"wrap(0, '**', '**')\"><i class=\"uk-icon-bold\"></i><\/button>";
strVar += "<a class=\"uk-button\" href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\" target=\"_blank\"><i class=\"uk-icon-question\"></i><\/a>";
strVar += "<button class=\"uk-button\" v-on:click.prevent=\"openOverlay\"><i class=\"uk-icon-expand\"></i><\/button>";
strVar += "<\/div>";
strVar += "<textarea v-model=\"model\" rows=\"5\" class=\"uk-width-1-1\" debounce=\"300\"><\/textarea>";
strVar += "<div class=\"overlay\" :class=\"{'overlay--open': open}\">";
strVar += "  <div class=\"overlay__inner\">";
strVar += "    <div class=\"uk-clearfix\">";
strVar += "      <div class=\"uk-float-right\">";
strVar += "        <a v-on:click=\"close\" class=\"uk-button\"><i class=\"uk-icon-close\"><\/i> Ready<\/a>";
strVar += "      <\/div>";
strVar += "      <h1 class=\"overlay__headline\">Markdown Editor<\/h1>";
strVar += "    <\/div>";
strVar += "    <div class=\"overlay__list\">";
strVar += "      <div class=\"uk-grid\">";
strVar += "        <div class=\"uk-width-1-2\">";
strVar += "<div style=\"background-color:#fff;border:1px solid #CCC\"><button class=\"uk-button\" v-on:click.prevent=\"wrap(1, '**', '**')\"><i class=\"uk-icon-bold\"></i><\/button>";
strVar += "<a class=\"uk-button\" href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\" target=\"_blank\"><i class=\"uk-icon-question\"></i><\/a>";
strVar += "<\/div>";
strVar += "          <textarea v-model=\"model\" class=\"uk-width-1-1\" style=\"height: calc(100vh - 200px)\" debounce=\"300\"><\/textarea>";
strVar += "        <\/div>";
strVar += "        <div class=\"uk-width-1-2\">";
strVar += "          <div v-html=\"markdown\"><\/div>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "  <\/div>";
strVar += "<\/div>";
strVar += "<\/div>";

module.exports = {
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
        this.markdown = marked(this.model);
      },
      deep: true
    }
  },
  template: strVar,
  data: function data() {
    return {
      open: false,
      markdown: ''
    };
  },
  created: function() {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js', this.initEditor.bind(this))
  },
  props: ['model'],
  methods: {
    initEditor: function() {
      if (!this.model) {
        this.model = ''
      }
      this.markdown = marked(this.model)
    },
    close: function() {
      this.open = false;
    },
    openOverlay: function() {
      this.open = true;
    },
    wrap: function(el, a, i) {
      var g = this.$el.querySelectorAll('textarea')[el];
      g.focus();
      if (g.setSelectionRange) {
        var c = g.scrollTop;
        var e = g.selectionStart;
        var f = g.selectionEnd;
        g.value = g.value.substring(0, g.selectionStart) + a + g.value.substring(g.selectionStart, g.selectionEnd) + i + g.value.substring(g.selectionEnd, g.value.length);
        g.selectionStart = e;
        g.selectionEnd = f + a.length + i.length;
        g.scrollTop = c;
      } else {
        if (document.selection && document.selection.createRange) {
          g.focus();
          var b = document.selection.createRange();
          if (b.text !== "") {
            b.text = a + b.text + i;
          } else {
            b.text = a + "REPLACE" + i;
          }
          g.focus();
        }
      }
      jQuery(g).trigger('change');
    }
  }
};
