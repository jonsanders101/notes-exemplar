"use strict";

;(function(exports) {
  function NoteController(appElement, noteListModel, NoteListView, NoteView, router) {
    this._appElement = appElement;
    this._noteListModel = noteListModel;
    this._noteListView = new NoteListView(this._noteListModel);
    this._NoteView = NoteView;
    this._router = router;

    this._setUpRoutes();
  };

  NoteController.prototype = {
    _setUpRoutes: function() {
      var self = this;

      this._router
        .addRoute("GET", "/#/notes/\\d+", function(event) {
          var noteModel = self._findNoteForUrl(event.newURL);
          self._renderNote(noteModel);
        })
        .addRoute("GET", "/#/notes", function() {
          self._renderNoteList();
        })
        .addRoute("POST", "/#/notes", function(event) {
          self._createNote(event);
          self._renderNoteList();
        });
    },

    _renderHtml: function(html) {
      this._appElement.innerHTML = html;
    },

    _renderNoteList: function() {
      this._renderHtml(this._noteListView.toHtml());
    },

    _renderNote: function(noteModel) {
      this._renderHtml(new this._NoteView(noteModel).toHtml());
    },

    _findNoteForUrl: function(url) {
      return this._noteListModel.findById(this._getNoteIdFromUrl(url));
    },

    _createNote: function(event) {
      this._noteListModel.create(event.target.elements.text.value);
    },

    _getNoteIdFromUrl: function(url) {
      return url.match(/(\d+)$/)[1];
    }
  };

  exports.NoteController = NoteController;
})(this);
