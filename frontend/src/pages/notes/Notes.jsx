import React, { useState } from "react";
import { useEffect } from "react";

function Notes() {
  const [note, setNote] = useState("");
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setMultipleDelete(true);
    }
  }, [isMobile]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleAddNote = () => {};

  const notes = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit perspiciatis nulla optio ducimus quos neque quia laborum quo molestias explicabo?",
    },
    {
      id: 2,
      text: "Another note with clean UI and selectable structure for better UX.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {multipleDelete && (
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-full accent-gray-800 cursor-pointer"
            />
            All
          </label>

          {!isMobile && (
            <button
              onClick={() => setMultipleDelete(false)}
              className="text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {!isMobile && !multipleDelete && (
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-600">
            Want to select multiple notes?{" "}
          </span>
          <button
            onClick={() => setMultipleDelete(true)}
            className="text-sm font-medium text-gray-600 hover:text-black hover:underline transition"
          >
            click here
          </button>
        </div>
      )}

      {/* Delete Hint */}
      {selected.length > 0 && (
        <div className="mb-4 text-sm font-medium">
          <span className="text-red-600">
            Trying to delete selected notes?{" "}
          </span>
          <button>click here</button>
        </div>
      )}

      {/* Notes List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative bg-yellow-100 border border-yellow-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition group flex flex-col min-h-[180px]"
          >
            {/* Fold Corner */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-200 rounded-bl-2xl"></div>

            {/* Checkbox */}
            {multipleDelete && (
              <div className="absolute top-4 left-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-yellow-500 rounded-full cursor-pointer"
                  onChange={() => handleSelect(note.id)}
                />
              </div>
            )}

            {/* Content */}
            <p
              className={`text-gray-800 leading-relaxed ${
                multipleDelete ? "pl-7" : ""
              }`}
            >
              {note.text}
            </p>

            {/* Actions — ALWAYS bottom */}
            <div className="flex items-center gap-3 mt-auto pt-6 opacity-80 group-hover:opacity-100 transition">
              <button
                className="text-gray-500 hover:text-black text-lg transition"
                title="Edit note"
                onClick={() => setIsEdit(true)}
              >
                ✏️
              </button>

              <button
                className="text-red-500 hover:text-red-700 text-lg transition"
                title="Delete note"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button (Bottom Left, High Z Index) */}
      <button
        className="fixed bottom-8 z-50 w-15 h-15 rounded-full
        bg-yellow-400 hover:bg-yellow-500
        text-2xl font-bold text-white
        shadow-lg hover:shadow-xl
        transition-all duration-200
        flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

export default Notes;
