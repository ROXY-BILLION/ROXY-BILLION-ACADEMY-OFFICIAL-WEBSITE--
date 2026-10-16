import { useState } from "react";
import {
  Plus,
  Search,
  FolderOpen,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import "./AdminCategories.css";

const initialCategories = [
  {
    id: 1,
    name: "Frontend Development",
    description: "Web interfaces, responsive layouts, and browser technologies.",
    color: "blue",
    courses: 8,
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Servers, APIs, databases, and application logic.",
    color: "purple",
    courses: 6,
  },
  {
    id: 3,
    name: "Software Engineering",
    description: "Professional software design, development, and testing.",
    color: "gold",
    courses: 5,
  },
  {
    id: 4,
    name: "Mobile App Development",
    description: "Build applications for mobile devices and platforms.",
    color: "green",
    courses: 3,
  },
  {
    id: 5,
    name: "Business & Entrepreneurship",
    description: "Business strategy, management, and entrepreneurial skills.",
    color: "orange",
    courses: 2,
  },
];

function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "blue",
  });

  const filteredCategories = categories.filter((category) => {
    const searchText = search.toLowerCase();

    return (
      category.name.toLowerCase().includes(searchText) ||
      category.description.toLowerCase().includes(searchText)
    );
  });

  function openCreateForm() {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      color: "blue",
    });
    setShowForm(true);
    setActiveMenu(null);
  }

  function openEditForm(category) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    });
    setShowForm(true);
    setActiveMenu(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name) return;

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== editingCategory?.id
    );

    if (duplicate) {
      window.alert("A category with this name already exists.");
      return;
    }

    if (editingCategory) {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name,
                description,
                color: formData.color,
              }
            : category
        )
      );
    } else {
      setCategories((currentCategories) => [
        ...currentCategories,
        {
          id: Date.now(),
          name,
          description,
          color: formData.color,
          courses: 0,
        },
      ]);
    }

    setShowForm(false);
    setEditingCategory(null);
  }

  function deleteCategory(category) {
    const confirmed = window.confirm(
      `Delete "${category.name}" from the demo categories?`
    );

    if (!confirmed) return;

    setCategories((currentCategories) =>
      currentCategories.filter((item) => item.id !== category.id)
    );

    setActiveMenu(null);
  }

  const totalCourses = categories.reduce(
    (total, category) => total + category.courses,
    0
  );

  return (
    <div className="admin-categories">
      <section className="admin-categories-heading">
        <div>
          <p className="admin-categories-eyebrow">
            ACADEMY ORGANIZATION
          </p>
          <h1>Categories</h1>
          <p className="admin-categories-subtitle">
            Organize your learning content into clear categories.
          </p>
        </div>

        <button
          type="button"
          className="admin-categories-primary-button"
          onClick={openCreateForm}
        >
          <Plus size={18} />
          Add Category
        </button>
      </section>

      <section className="admin-categories-stats">
        <article className="admin-categories-stat-card">
          <span className="admin-categories-stat-icon gold">
            <FolderOpen size={21} />
          </span>
          <div>
            <p>Total Categories</p>
            <h2>{categories.length}</h2>
            <span>Available in the catalogue</span>
          </div>
        </article>

        <article className="admin-categories-stat-card">
          <span className="admin-categories-stat-icon blue">
            <BookOpen size={21} />
          </span>
          <div>
            <p>Courses Across Categories</p>
            <h2>{totalCourses}</h2>
            <span>Demo course assignments</span>
          </div>
        </article>

        <article className="admin-categories-stat-card">
          <span className="admin-categories-stat-icon green">
            <ArrowUpRight size={21} />
          </span>
          <div>
            <p>Most Used Category</p>
            <h2 className="admin-categories-featured-value">
              {categories.length
                ? [...categories].sort(
                    (a, b) => b.courses - a.courses
                  )[0].name
                : "None"}
            </h2>
            <span>Based on demo course counts</span>
          </div>
        </article>
      </section>

      <section className="admin-categories-content">
        <div className="admin-categories-content-heading">
          <div>
            <h2>All Categories</h2>
            <p>Manage the subjects available across your academy.</p>
          </div>

          <span className="admin-categories-count">
            {filteredCategories.length} categories
          </span>
        </div>

        <div className="admin-categories-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search categories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search categories"
          />
        </div>

        {filteredCategories.length > 0 ? (
          <div className="admin-categories-grid">
            {filteredCategories.map((category) => (
              <article
                className="admin-category-card"
                key={category.id}
              >
                <div className="admin-category-card-top">
                  <span
                    className={`admin-category-icon ${category.color}`}
                  >
                    <FolderOpen size={23} />
                  </span>

                  <div className="admin-category-menu-wrap">
                    <button
                      type="button"
                      className="admin-category-menu-button"
                      aria-label={`Options for ${category.name}`}
                      aria-expanded={activeMenu === category.id}
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === category.id
                            ? null
                            : category.id
                        )
                      }
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {activeMenu === category.id && (
                      <div className="admin-category-dropdown">
                        <button
                          type="button"
                          onClick={() => openEditForm(category)}
                        >
                          <Pencil size={15} />
                          Edit category
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() => deleteCategory(category)}
                        >
                          <Trash2 size={15} />
                          Delete category
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3>{category.name}</h3>
                <p className="admin-category-description">
                  {category.description || "No description provided."}
                </p>

                <div className="admin-category-card-footer">
                  <span>
                    <BookOpen size={15} />
                    {category.courses} courses
                  </span>

                  <button
                    type="button"
                    className="admin-category-edit-button"
                    onClick={() => openEditForm(category)}
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="admin-categories-empty">
            <FolderOpen size={36} />
            <h3>No categories found</h3>
            <p>Try a different search or create a new category.</p>
            <button
              type="button"
              className="admin-categories-primary-button"
              onClick={openCreateForm}
            >
              <Plus size={17} />
              Add Category
            </button>
          </div>
        )}
      </section>

      {showForm && (
        <div
          className="admin-categories-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className="admin-categories-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-category-form-title"
          >
            <div className="admin-categories-modal-heading">
              <div>
                <p className="admin-categories-eyebrow">
                  CATEGORY MANAGEMENT
                </p>
                <h2 id="admin-category-form-title">
                  {editingCategory ? "Edit Category" : "Create Category"}
                </h2>
                <p>
                  {editingCategory
                    ? "Update the category details."
                    : "Add a new subject to your academy."}
                </p>
              </div>

              <button
                type="button"
                className="admin-categories-close-button"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="admin-categories-form"
              onSubmit={handleSubmit}
            >
              <label htmlFor="admin-category-name">
                Category name
              </label>
              <input
                id="admin-category-name"
                type="text"
                placeholder="e.g. Data Science"
                value={formData.name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                }
                required
              />

              <label htmlFor="admin-category-description">
                Description
              </label>
              <textarea
                id="admin-category-description"
                rows={4}
                placeholder="Describe the courses in this category..."
                value={formData.description}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.target.value,
                  })
                }
              />

              <label htmlFor="admin-category-color">
                Category accent
              </label>
              <select
                id="admin-category-color"
                value={formData.color}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    color: event.target.value,
                  })
                }
              >
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="gold">Gold</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
              </select>

              <div className="admin-categories-form-actions">
                <button
                  type="button"
                  className="admin-categories-cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-categories-primary-button"
                >
                  <Plus size={17} />
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;