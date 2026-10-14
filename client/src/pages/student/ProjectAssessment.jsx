import { useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Send,
  Target,
} from "lucide-react";
import "./ProjectAssessment.css";

function ProjectAssessment({ project }) {
  const [checkedRequirements, setCheckedRequirements] = useState([]);
  const [projectTitle, setProjectTitle] = useState(project.title);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [description, setDescription] = useState("");
  const [submission, setSubmission] = useState(null);
  const [formError, setFormError] = useState("");

  function toggleRequirement(index) {
    setCheckedRequirements((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (!projectTitle.trim() || !description.trim()) {
      setFormError(
        "Enter your project title and a short description before submitting."
      );
      return;
    }

    if (!repositoryUrl.trim() && !liveUrl.trim()) {
      setFormError(
        "Provide at least a GitHub repository URL or a live project URL."
      );
      return;
    }

    setSubmission({
      projectTitle: projectTitle.trim(),
      repositoryUrl: repositoryUrl.trim(),
      liveUrl: liveUrl.trim(),
      description: description.trim(),
      submittedAt: new Date().toLocaleString(),
    });
  }

  return (
    <section className="project-assessment" id="practical-project">
      <div className="project-assessment-heading">
        <div className="project-assessment-heading-icon">
          <ClipboardCheck size={25} />
        </div>

        <div>
          <p className="project-assessment-eyebrow">
            PRACTICAL ASSESSMENT
          </p>
          <h2>Apply What You Have Learned</h2>
          <p>
            Complete a practical project to demonstrate your
            understanding of this course.
          </p>
        </div>
      </div>

      <article className="project-brief">
        <div className="project-brief-top">
          <div>
            <span className="project-assessment-tag">
              {project.difficulty}
            </span>
            <span className="project-assessment-tag">
              {project.estimatedTime}
            </span>
          </div>

          <Target size={25} />
        </div>

        <h3>{project.title}</h3>

        <p className="project-brief-description">
          {project.description}
        </p>

        <div className="project-assessment-subsection">
          <h4>Learning objectives</h4>

          <ul className="project-objectives-list">
            {project.objectives.map((objective) => (
              <li key={objective}>
                <CheckCircle2 size={17} />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-assessment-subsection">
          <div className="project-requirements-heading">
            <h4>Project requirements</h4>
            <span>
              {checkedRequirements.length}/{project.requirements.length}
            </span>
          </div>

          <div
            className="project-requirements-progress"
            role="progressbar"
            aria-label="Project requirements completed"
            aria-valuemin={0}
            aria-valuemax={project.requirements.length}
            aria-valuenow={checkedRequirements.length}
          >
            <div
              style={{
                width: `${
                  project.requirements.length > 0
                    ? (checkedRequirements.length /
                        project.requirements.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="project-requirements-list">
            {project.requirements.map((requirement, index) => (
              <label
                className="project-requirement"
                key={requirement}
              >
                <input
                  type="checkbox"
                  checked={checkedRequirements.includes(index)}
                  onChange={() => toggleRequirement(index)}
                />

                <span>{requirement}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="project-instructions">
          <h4>Instructions</h4>
          <p>{project.instructions}</p>
        </div>
      </article>

      <article className="project-submission-card">
        <div className="project-submission-heading">
          <div>
            <p className="project-assessment-eyebrow">
              YOUR WORK
            </p>
            <h3>Submit Your Project</h3>
            <p>
              Share your repository or live website so your work
              can be reviewed.
            </p>
          </div>

          <Send size={23} />
        </div>

        {submission ? (
          <div className="project-submission-success" role="status">
            <CheckCircle2 size={30} />

            <div>
              <h4>Submission recorded in this session</h4>

              <p>
                Your project details have been captured in the current
                page session. They have not been sent to a server.
              </p>

              <p>
                <strong>Project:</strong> {submission.projectTitle}
              </p>

              <p>
                <strong>Recorded:</strong> {submission.submittedAt}
              </p>

              <div className="project-submission-links">
                {submission.repositoryUrl && (
                  <a
                    href={submission.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repository
                    <ExternalLink size={14} />
                  </a>
                )}

                {submission.liveUrl && (
                  <a
                    href={submission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Project
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <button
                type="button"
                className="project-submit-another"
                onClick={() => setSubmission(null)}
              >
                Edit submission
              </button>
            </div>
          </div>
        ) : (
          <form
            className="project-submission-form"
            onSubmit={handleSubmit}
          >
            <div className="project-form-field">
              <label htmlFor="project-title">Project title</label>

              <input
                id="project-title"
                type="text"
                value={projectTitle}
                onChange={(event) =>
                  setProjectTitle(event.target.value)
                }
                placeholder="Enter your project title"
                required
              />
            </div>

            <div className="project-form-field">
              <label htmlFor="repository-url">
                GitHub repository URL
              </label>

              <input
                id="repository-url"
                type="url"
                value={repositoryUrl}
                onChange={(event) =>
                  setRepositoryUrl(event.target.value)
                }
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="project-form-field">
              <label htmlFor="live-project-url">
                Live project URL
              </label>

              <input
                id="live-project-url"
                type="url"
                value={liveUrl}
                onChange={(event) => setLiveUrl(event.target.value)}
                placeholder="https://your-project.example"
              />
            </div>

            <div className="project-form-field">
              <label htmlFor="project-description">
                What did you build?
              </label>

              <textarea
                id="project-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe your project and what you learned..."
                rows={5}
                required
              />
            </div>

            {formError && (
              <p className="project-form-error" role="alert">
                {formError}
              </p>
            )}

            <p className="project-form-note">
              Provide at least one project URL. This demo does not
              upload files or permanently save submissions.
            </p>

            <button
              type="submit"
              className="project-submit-button"
            >
              <Send size={17} />
              Submit Project
            </button>
          </form>
        )}
      </article>
    </section>
  );
}

export default ProjectAssessment;
