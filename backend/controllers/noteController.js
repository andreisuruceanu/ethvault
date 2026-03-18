const notes = [];
let nextId = 1;

function findNoteIndex(id) {
  return notes.findIndex((n) => n.id === Number(id));
}

exports.createNote = (req, res) => {
  const { title, body } = req.body;

  if (typeof title !== "string" || typeof body !== "string" || !title || !body) {
    return res.status(400).json({
      success: false,
      message: "Please provide title and body as non-empty strings",
    });
  }

  const note = {
    id: nextId++,
    title,
    body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.push(note);

  console.log(`Note created: ${note.id} - ${note.title}`);

  res.status(201).json({
    success: true,
    note,
  });
};

exports.getAllNotes = (req, res) => {
  res.status(200).json({
    success: true,
    notes,
  });
};

exports.getNoteById = (req, res) => {
  const index = findNoteIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Note not found with id: ${req.params.id}`,
    });
  }

  console.log(`Note returned: ${notes[index].id} - ${notes[index].title}`);

  res.status(200).json({
    success: true,
    note: notes[index],
  });
};

exports.updateNote = (req, res) => {
  const index  = findNoteIndex(req.params.id);

  if(index === -1){
    return res.status(404).json({
      success: false,
      message: `Note with id: ${req.params.id} not found`
    })
  }

  const {title, body} = req.body;

  if (title !== undefined && (typeof title !== "string" || !title)) {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  if (body !== undefined && (typeof body !== "string" || !body)) {
    return res.status(400).json({
      success: false,
      message: "Body must be a non-empty string",
    });
  }

  if (title !== undefined) notes[index].title = title;
  if (body !== undefined) notes[index].body = body;

  if (title !== undefined || body !== undefined) {
    notes[index].updatedAt = new Date().toISOString();
  }

  console.log(`Note updated: ${notes[index].id} - ${notes[index].title}`);

  res.status(200).json({
    success: true,
    note: notes[index],
  })
};

exports.deleteNote = (req, res) => {
  const index = findNoteIndex(req.params.id);

  if(index === -1){
    return res.status(404).json({
      success: false,
      message: `Note with id: ${req.params.id} not found`
    })
  }

  const deleted = notes.splice(index, 1);

  console.log(`Note deleted: ${deleted[0].id} - ${deleted[0].title}`);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
    note: deleted[0],
  })
};


