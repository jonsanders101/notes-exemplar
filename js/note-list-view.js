;(function(exports) {
  function NoteListView(noteListModel, mustache) {
    this._noteListModel = noteListModel;
    this._mustache = mustache;
  };

  NoteListView.prototype = {
    toHtml: function() {
      return this._mustache.render(
        NOTE_LIST_MODEL_TEMPLATE,
        { noteListModel: this._noteListModel.all().map(createNoteModelPresenter) },
        { NOTE_MODEL: NOTE_MODEL_TEMPLATE }
      );
    }
  };

  function createNoteModelPresenter(noteModel) {
    return {
      title: noteModel.title(),
      url: "/#/notes/" + noteModel.id()
    }
  };

  var NOTE_LIST_MODEL_TEMPLATE = [
    "<div id='notes'>",
      "{{#noteListModel}}",
        "{{>NOTE_MODEL}}",
      "{{/noteListModel}}",
    "</div>"
  ].join("");

  var NOTE_MODEL_TEMPLATE = [
    "<div class='note'>",
      "<span class='title'>{{title}}</span> ",
      "<span class='link'>{{link}}</span>",
    "</div>"
  ].join("");

  exports.NoteListView = NoteListView;
})(this);