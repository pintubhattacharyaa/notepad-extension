import React, { useState, useEffect } from 'react';
import { Save, Download, Trash2, Plus, Search } from 'lucide-react';

const ChromeNotepad = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [savedStatus, setSavedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from Chrome storage
  useEffect(() => {
    chrome.storage.sync.get(['notes'], (result) => {
      if (result.notes) {
        setNotes(result.notes);
        if (result.notes.length > 0) {
          setCurrentNote(result.notes[0]);
        }
      }
    });
  }, []);

  // Save notes to Chrome storage
  const saveAllNotes = (updatedNotes) => {
    chrome.storage.sync.set({ notes: updatedNotes }, () => {
      setNotes(updatedNotes);
      setSavedStatus('Notes saved!');
      setTimeout(() => setSavedStatus(''), 2000);
    });
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) {
      setSavedStatus('Please enter a title for the new note');
      return;
    }

    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: '',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const updatedNotes = [...notes, newNote];
    saveAllNotes(updatedNotes);
    setCurrentNote(newNote);
    setNewNoteTitle('');
  };

  const handleUpdateNote = (content) => {
    if (!currentNote) return;

    const updatedNote = {
      ...currentNote,
      content,
      lastModified: new Date().toISOString()
    };

    const updatedNotes = notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    );

    saveAllNotes(updatedNotes);
    setCurrentNote(updatedNote);
  };

  const handleDeleteNote = () => {
    if (!currentNote) return;

    const updatedNotes = notes.filter(note => note.id !== currentNote.id);
    saveAllNotes(updatedNotes);
    setCurrentNote(updatedNotes[0] || null);
    setSavedStatus('Note deleted!');
    setTimeout(() => setSavedStatus(''), 2000);
  };

  const handleExport = () => {
    if (!currentNote) return;

    const noteContent = `Title: ${currentNote.title}\n\n${currentNote.content}`;
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentNote.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSavedStatus('Note exported!');
    setTimeout(() => setSavedStatus(''), 2000);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[600px] h-[500px] p-4 bg-white">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="text-xl font-bold mb-4">Quick Notes</div>

        <div className="flex h-full gap-4">
          {/* Sidebar */}
          <div className="w-1/3 border-r pr-4 flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-1 border rounded"
              />
            </div>

            {/* New Note Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New note title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateNote();
                  }
                }}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                onClick={handleCreateNote}
                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  onClick={() => setCurrentNote(note)}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-100 mb-2 ${
                    currentNote?.id === note.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="font-medium truncate">{note.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(note.lastModified).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {currentNote ? (
              <>
                <div className="font-semibold mb-2">{currentNote.title}</div>
                <textarea
                  value={currentNote.content}
                  onChange={(e) => handleUpdateNote(e.target.value)}
                  className="flex-1 p-2 border rounded mb-4 resize-none"
                  placeholder="Start typing your note here..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleExport}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded flex items-center gap-1 hover:bg-gray-200"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                  <button
                    onClick={handleDeleteNote}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a note or create a new one to get started
              </div>
            )}
          </div>
        </div>

        {/* Status Message */}
        {savedStatus && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
            {savedStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeNotepad;