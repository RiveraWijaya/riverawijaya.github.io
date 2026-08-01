(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const profile = data.profile;
  const page = document.body.dataset.page || "home";

  const MODEL_VIEWER_CDN =
    "https://ajax.googleapis.com/ajax/libs/model-viewer/4.3.1/model-viewer.min.js";

  function safeLink(url) {
    return Boolean(url && String(url).trim() && url !== "#");
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function hydrateProfile() {
    setText(
      "[data-profile='siteTitle']",
      profile.siteTitle || "Rivera Wijaya — Electrical Engineering"
    );

    setText("[data-profile='name']", profile.name);

    setText(
      "[data-profile='headerName']",
      profile.headerName || profile.name
    );

    setText(
      "[data-profile='headerMark']",
      profile.headerMark || "RW"
    );

    setText("[data-profile='eyebrow']", profile.eyebrow);
    setText("[data-profile='headline']", profile.headline);
    setText("[data-profile='intro']", profile.intro);
    setText("[data-profile='location']", profile.location);
    setText(
      "[data-profile='availability']",
      profile.availability
    );

    setText(
      "[data-current-year]",
      new Date().getFullYear()
    );

    document
      .querySelectorAll("[data-link='email']")
      .forEach((element) => {
        element.href = `mailto:${profile.email}`;

        if (element.dataset.showValue === "true") {
          element.textContent = profile.email;
        }
      });

    document
      .querySelectorAll("[data-link='github']")
      .forEach((element) => {
        element.href = profile.github;
      });

    document
      .querySelectorAll("[data-link='linkedin']")
      .forEach((element) => {
        element.href = profile.linkedin;
      });

    const resume = document.querySelector(
      "[data-link='resume']"
    );

    if (resume) {
      if (safeLink(profile.resumeUrl)) {
        resume.href = profile.resumeUrl;
      } else {
        resume.remove();
      }
    }
  }

  function renderPaths() {
    const grid = document.querySelector(
      "[data-render='paths']"
    );

    if (!grid) return;

    grid.innerHTML = Object.values(data.categories)
      .map(
        (category) => `
          <a
            class="path-card reveal"
            href="${escapeHtml(category.page)}"
            data-accent="${escapeHtml(category.accent)}"
            aria-label="Open ${escapeHtml(category.label)} projects"
          >
            <span class="number">
              ${escapeHtml(category.number)} / 03
            </span>

            <h3>${escapeHtml(category.label)}</h3>

            <p>${escapeHtml(category.description)}</p>

            <span class="mono path-kicker">
              ${escapeHtml(category.kicker)}
            </span>

            <span class="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        `
      )
      .join("");
  }

  function renderFeatured() {
    const grid = document.querySelector(
      "[data-render='featured']"
    );

    if (!grid) return;

    const selectedProjects = data.projects
      .filter((project) => project.featured)
      .slice(0, 4);

    grid.innerHTML = selectedProjects
      .map((project) => {
        const category =
          data.categories[project.category];

        return `
          <a
            class="feature-card reveal"
            data-category="${escapeHtml(project.category)}"
            href="${escapeHtml(category.page)}#${escapeHtml(
              project.id
            )}"
          >
            <div class="feature-body">
              <div class="feature-meta">
                <span>
                  ${escapeHtml(category.shortLabel)}
                </span>

                <span>
                  ${escapeHtml(project.subtitle)}
                </span>
              </div>

              <h3>${escapeHtml(project.title)}</h3>

              <p>${escapeHtml(project.summary)}</p>
            </div>
          </a>
        `;
      })
      .join("");
  }

  function validViewer(project) {
    const viewer = project.viewer3d;

    return Boolean(
      viewer &&
        viewer.enabled === true &&
        ["iframe", "model"].includes(viewer.type) &&
        safeLink(viewer.src)
    );
  }

  function renderModelViewer(project) {
    const viewer = project.viewer3d;

    const autoRotate =
      viewer.autoRotate === false ? "" : "auto-rotate";

    const poster = safeLink(viewer.poster)
      ? `poster="${escapeHtml(viewer.poster)}"`
      : "";

    return `
      <model-viewer
        class="pcb-model"
        src="${escapeHtml(viewer.src)}"
        ${poster}
        alt="${escapeHtml(
          viewer.alt || viewer.title || project.title
        )}"
        camera-controls
        ${autoRotate}
        rotation-per-second="8deg"
        shadow-intensity="1"
        environment-image="neutral"
        interaction-prompt="auto"
        touch-action="pan-y"
        loading="lazy"
        reveal="auto"
      >
        <div class="model-fallback">
          The interactive model could not load.
          Check the GLB path in
          <span class="mono">site-data.js</span>.
        </div>
      </model-viewer>
    `;
  }

  function renderIframeViewer(project) {
    const viewer = project.viewer3d;

    return `
      <iframe
        class="pcb-iframe"
        src="${escapeHtml(viewer.src)}"
        title="${escapeHtml(
          viewer.title ||
            `${project.title} 3D viewer`
        )}"
        loading="lazy"
        allow="fullscreen; xr-spatial-tracking"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `;
  }

  function renderProjectVisual(project) {
    const imagePanel = `
      <div
        class="visual-panel active"
        id="${escapeHtml(project.id)}-image-panel"
        data-visual-panel="image"
        role="tabpanel"
      >
        <img
          src="${escapeHtml(project.image)}"
          alt="${escapeHtml(project.imageAlt)}"
          loading="lazy"
        >
      </div>
    `;

    if (!validViewer(project)) {
      return `
        <div class="project-visual">
          ${imagePanel}
        </div>
      `;
    }

    const viewer = project.viewer3d;

    const viewerMarkup =
      viewer.type === "model"
        ? renderModelViewer(project)
        : renderIframeViewer(project);

    return `
      <div
        class="project-visual has-viewer"
        data-visual-switcher
      >
        <div
          class="visual-tabs"
          role="tablist"
          aria-label="${escapeHtml(
            project.title
          )} media"
        >
          <button
            class="visual-tab active"
            type="button"
            role="tab"
            aria-selected="true"
            aria-controls="${escapeHtml(
              project.id
            )}-image-panel"
            data-visual-target="image"
          >
            Project image
          </button>

          <button
            class="visual-tab"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="${escapeHtml(
              project.id
            )}-3d-panel"
            tabindex="-1"
            data-visual-target="3d"
          >
            3D board
          </button>
        </div>

        ${imagePanel}

        <div
          class="visual-panel viewer-panel"
          id="${escapeHtml(project.id)}-3d-panel"
          data-visual-panel="3d"
          role="tabpanel"
          hidden
        >
          ${viewerMarkup}

          <div class="viewer-caption">
            <span>
              ${escapeHtml(
                viewer.caption ||
                  "Interactive PCB view"
              )}
            </span>

            ${
              viewer.type === "iframe"
                ? `
                  <a
                    href="${escapeHtml(viewer.src)}"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open full viewer ↗
                  </a>
                `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }

  function renderCategory() {
    if (!data.categories[page]) return;

    const category = data.categories[page];

    document.title =
      `${category.label} Projects — ` +
      `${profile.siteTitle || profile.name}`;

    setText(
      "[data-category='number']",
      category.number
    );

    setText(
      "[data-category='label']",
      category.label
    );

    setText(
      "[data-category='shortLabel']",
      category.shortLabel
    );

    setText(
      "[data-category='kicker']",
      category.kicker
    );

    setText(
      "[data-category='description']",
      category.description
    );

    const skillsContainer =
      document.querySelector(
        "[data-render='category-skills']"
      );

    if (skillsContainer) {
      skillsContainer.innerHTML =
        category.skills
          .map(
            (skill) => `
              <span class="chip">
                ${escapeHtml(skill)}
              </span>
            `
          )
          .join("");
    }

    const projectStack =
      document.querySelector(
        "[data-render='projects']"
      );

    if (!projectStack) return;

    const projects = data.projects.filter(
      (project) =>
        project.category === page
    );

    if (!projects.length) {
      projectStack.innerHTML = `
        <div class="empty-state">
          Add projects for this category in
          <span class="mono">
            site-data.js
          </span>.
        </div>
      `;

      return;
    }

    projectStack.innerHTML = projects
      .map((project, index) => {
        const links = [];

        if (safeLink(project.links?.github)) {
          links.push(`
            <a
              class="btn small"
              href="${escapeHtml(
                project.links.github
              )}"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          `);
        }

        if (safeLink(project.links?.demo)) {
          links.push(`
            <a
              class="btn small"
              href="${escapeHtml(
                project.links.demo
              )}"
              target="_blank"
              rel="noreferrer"
            >
              Demo ↗
            </a>
          `);
        }

        return `
          <article
            class="project-showcase reveal"
            id="${escapeHtml(project.id)}"
          >
            ${renderProjectVisual(project)}

            <div class="project-content">
              <div class="project-heading-meta">
                <span class="subtitle">
                  ${escapeHtml(project.subtitle)}
                </span>

                <span class="project-count">
                  ${String(index + 1).padStart(2, "0")}
                  /
                  ${String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <h2>
                ${escapeHtml(project.title)}
              </h2>

              <p class="summary">
                ${escapeHtml(project.summary)}
              </p>

              <p class="description">
                ${escapeHtml(
                  project.description
                )}
              </p>

              <div class="project-tags">
                ${project.tags
                  .map(
                    (tag) => `
                      <span class="chip">
                        ${escapeHtml(tag)}
                      </span>
                    `
                  )
                  .join("")}
              </div>

              <div class="details">
                <button
                  class="details-toggle"
                  type="button"
                  aria-expanded="false"
                >
                  <span>+</span>
                  Technical highlights
                </button>

                <div class="details-list">
                  <div>
                    <ul>
                      ${project.highlights
                        .map(
                          (item) => `
                            <li>
                              ${escapeHtml(item)}
                            </li>
                          `
                        )
                        .join("")}
                    </ul>
                  </div>
                </div>
              </div>

              ${
                links.length
                  ? `
                    <div class="project-links">
                      ${links.join("")}
                    </div>
                  `
                  : ""
              }

              <div class="project-metrics">
                ${project.metrics
                  .map(
                    (metric) => `
                      <div class="metric">
                        <small>
                          ${escapeHtml(
                            metric.label
                          )}
                        </small>

                        <strong>
                          ${escapeHtml(
                            metric.value
                          )}
                        </strong>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function loadModelViewerLibrary() {
    if (!document.querySelector("model-viewer")) {
      return;
    }

    if (
      document.querySelector(
        `script[src="${MODEL_VIEWER_CDN}"]`
      )
    ) {
      return;
    }

    const script =
      document.createElement("script");

    script.type = "module";
    script.src = MODEL_VIEWER_CDN;

    document.head.appendChild(script);
  }

  function bindDetails() {
    document.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            ".details-toggle"
          );

        if (!button) return;

        const details =
          button.closest(".details");

        const isOpen =
          details.classList.toggle("open");

        button.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        button.querySelector(
          "span"
        ).textContent = isOpen ? "−" : "+";
      }
    );
  }

  function setActiveVisual(
    switcher,
    target
  ) {
    const tabs = [
      ...switcher.querySelectorAll(
        "[data-visual-target]"
      ),
    ];

    const panels = [
      ...switcher.querySelectorAll(
        "[data-visual-panel]"
      ),
    ];

    tabs.forEach((tab) => {
      const isActive =
        tab.dataset.visualTarget ===
        target;

      tab.classList.toggle(
        "active",
        isActive
      );

      tab.setAttribute(
        "aria-selected",
        String(isActive)
      );

      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive =
        panel.dataset.visualPanel ===
        target;

      panel.classList.toggle(
        "active",
        isActive
      );

      panel.hidden = !isActive;
    });
  }

  function bindVisualSwitchers() {
    document
      .querySelectorAll(
        "[data-visual-switcher]"
      )
      .forEach((switcher) => {
        const tabs = [
          ...switcher.querySelectorAll(
            "[data-visual-target]"
          ),
        ];

        tabs.forEach((tab, index) => {
          tab.addEventListener(
            "click",
            () => {
              setActiveVisual(
                switcher,
                tab.dataset.visualTarget
              );
            }
          );

          tab.addEventListener(
            "keydown",
            (event) => {
              if (
                ![
                  "ArrowLeft",
                  "ArrowRight",
                ].includes(event.key)
              ) {
                return;
              }

              event.preventDefault();

              const direction =
                event.key === "ArrowRight"
                  ? 1
                  : -1;

              const nextTab =
                tabs[
                  (
                    index +
                    direction +
                    tabs.length
                  ) % tabs.length
                ];

              setActiveVisual(
                switcher,
                nextTab.dataset.visualTarget
              );

              nextTab.focus();
            }
          );
        });
      });
  }

  function bindNavigation() {
    const header =
      document.querySelector(
        ".site-header"
      );

    const menuButton =
      document.querySelector(
        ".menu-toggle"
      );

    const navigation =
      document.querySelector(
        ".primary-navigation"
      );

    const projectDropdown =
      document.querySelector(
        ".navigation-dropdown"
      );

    const dropdownButton =
      document.querySelector(
        ".dropdown-toggle"
      );

    if (
      !header ||
      !menuButton ||
      !navigation
    ) {
      return;
    }

    const mobileMedia =
      window.matchMedia(
        "(max-width: 820px)"
      );

    const isMobile = () =>
      mobileMedia.matches;

    const closeDropdown = () => {
      projectDropdown?.classList.remove(
        "open"
      );

      dropdownButton?.setAttribute(
        "aria-expanded",
        "false"
      );
    };

    const closeMobileMenu = () => {
      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      closeDropdown();
    };

    const setActiveNavigation = () => {
      const currentPage =
        document.body.dataset.page ||
        "home";

      document
        .querySelectorAll(
          "[data-nav-page]"
        )
        .forEach((link) => {
          const isActive =
            link.dataset.navPage ===
            currentPage;

          link.classList.toggle(
            "active",
            isActive
          );

          if (isActive) {
            link.setAttribute(
              "aria-current",
              "page"
            );
          } else {
            link.removeAttribute(
              "aria-current"
            );
          }
        });

      dropdownButton?.classList.toggle(
        "active",
        [
          "digital",
          "firmware",
          "analog",
        ].includes(currentPage)
      );
    };

    menuButton.addEventListener(
      "click",
      () => {
        const isOpen =
          navigation.classList.toggle(
            "open"
          );

        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        menuButton.setAttribute(
          "aria-label",
          isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        );

        if (!isOpen) {
          closeDropdown();
        }
      }
    );

    dropdownButton?.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        const isOpen =
          projectDropdown?.classList.toggle(
            "open"
          ) || false;

        dropdownButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
      }
    );

    navigation.addEventListener(
      "click",
      (event) => {
        const link =
          event.target.closest("a");

        if (link && isMobile()) {
          closeMobileMenu();
        }
      }
    );

    document.addEventListener(
      "click",
      (event) => {
        if (
          projectDropdown &&
          !projectDropdown.contains(
            event.target
          )
        ) {
          closeDropdown();
        }

        if (
          isMobile() &&
          !header.contains(event.target)
        ) {
          closeMobileMenu();
        }
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Escape") {
          return;
        }

        closeDropdown();
        closeMobileMenu();
      }
    );

    const updateHeader = () => {
      header.classList.toggle(
        "scrolled",
        window.scrollY > 8
      );
    };

    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true,
      }
    );

    const handleLayoutChange = () => {
      closeMobileMenu();
    };

    if (mobileMedia.addEventListener) {
      mobileMedia.addEventListener(
        "change",
        handleLayoutChange
      );
    } else {
      mobileMedia.addListener(
        handleLayoutChange
      );
    }

    updateHeader();
    setActiveNavigation();
  }

  function bindProgress() {
    const progress =
      document.querySelector(".progress");

    if (!progress) return;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const percentage =
        scrollableHeight > 0
          ? (
              window.scrollY /
              scrollableHeight
            ) * 100
          : 0;

      progress.style.width =
        `${percentage}%`;
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
    );
  }

  function bindReveal() {
    const items =
      document.querySelectorAll(
        ".reveal"
      );

    if (
      !(
        "IntersectionObserver" in window
      )
    ) {
      items.forEach((item) => {
        item.classList.add("visible");
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
        }
      );

    items.forEach((item) => {
      observer.observe(item);
    });
  }

  function createCenterRevealOrder(text) {
    const validIndices = text
      .split("")
      .map(
        (character, index) => ({
          character,
          index,
        })
      )
      .filter(
        ({ character }) =>
          character !== " "
      )
      .map(({ index }) => index);

    const center =
      (text.length - 1) / 2;

    return validIndices.sort(
      (
        firstIndex,
        secondIndex
      ) =>
        Math.abs(
          firstIndex - center
        ) -
        Math.abs(
          secondIndex - center
        )
    );
  }

  function initializeDecryptedTitles() {
    const elements =
      document.querySelectorAll(
        "[data-decrypted-text]"
      );

    if (!elements.length) return;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    elements.forEach((element) => {
      const finalText =
        element.dataset.decryptedText ||
        element.textContent;

      if (prefersReducedMotion) {
        element.textContent = finalText;
        return;
      }

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

      const characterOrder =
        createCenterRevealOrder(
          finalText
        );

      const revealedIndices =
        new Set();

      let orderIndex = 0;

      element.classList.add(
        "is-decrypting"
      );

      const renderFrame = () => {
        element.textContent =
          finalText
            .split("")
            .map(
              (
                character,
                index
              ) => {
                if (
                  character === " "
                ) {
                  return " ";
                }

                if (
                  revealedIndices.has(
                    index
                  )
                ) {
                  return character;
                }

                return characters[
                  Math.floor(
                    Math.random() *
                      characters.length
                  )
                ];
              }
            )
            .join("");
      };

      renderFrame();

      const interval =
        window.setInterval(() => {
          if (
            orderIndex <
            characterOrder.length
          ) {
            revealedIndices.add(
              characterOrder[
                orderIndex
              ]
            );

            orderIndex += 1;
          }

          renderFrame();

          if (
            orderIndex >=
            characterOrder.length
          ) {
            window.clearInterval(
              interval
            );

            element.textContent =
              finalText;

            element.classList.remove(
              "is-decrypting"
            );
          }
        }, 45);
    });
  }

  hydrateProfile();
  initializeDecryptedTitles();
  renderPaths();
  renderFeatured();
  renderCategory();
  bindDetails();
  bindVisualSwitchers();
  bindNavigation();
  bindProgress();
  loadModelViewerLibrary();

  requestAnimationFrame(bindReveal);
})();
