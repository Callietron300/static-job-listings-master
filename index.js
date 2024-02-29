// Data
const jobs = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Ruby"],
    tools: ["Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];

let activeFilters = [];

//Add job listings
function renderJobListings(jobs) {
  const jobListContainer = document.querySelector(".job-list");
  let jobListingHtml = "";

  jobs.forEach(function (job) {
    // Function to check if job matches all active filters
    function jobMatchesFilters(job) {
      return activeFilters.every((filter) => {
        return (
          job.role === filter ||
          job.level === filter ||
          job.languages.includes(filter) ||
          job.tools.includes(filter)
        );
      });
    }

    // Check if job matches all active filters
    if (activeFilters.length === 0 || jobMatchesFilters(job)) {
      // If job matches filters, add it to jobListingHtml
      jobListingHtml += `<div class="job-listing">
      <img src="${job.logo}" alt="${job.company} Logo"/>
      <div class="info">
        <div class="info-company">
          <p>${job.company}</p>
          ${job.new ? '<p class="new">New!</p>' : ""}
          ${job.featured ? '<p class="featured">Featured</p>' : ""}
        </div>
        <h3 class="info-position">${job.position}</h3>
        <div class="info-details">
          <p>${job.postedAt}</p>
          <p>${job.contract}</p>
          <p>${job.location}</p>
        </div>
      </div>
      <div class="job-filter-properties">
        <a data-filter="${job.role}" class="filter-property">${job.role}</a>
        <a data-filter="${job.level}" class="filter-property">${job.level}</a>
        ${job.languages
          .map(
            (language) =>
              `<a data-filter="${language}" class="filter-property">${language}</a>`
          )
          .join("")}
        ${job.tools
          .map(
            (tools) =>
              `<a data-filter="${tools}" class="filter-property">${tools}</a>`
          )
          .join("")}
        </div>
      </div>`;
    }
  });

  jobListContainer.innerHTML = jobListingHtml;

  filter();
}

renderJobListings(jobs);

//CLICK FILTERS

// Filters can be clicked => this will add the filter to the list of active filters
function filter() {
  let filterList = document.querySelector(".filter-list");
  let filterListItems = filterList.querySelectorAll("li");
  let filterContainer = document.querySelector(".filter-container");
  const clearElement = document.querySelector(".filter-clear");
  const filterElements = document.querySelectorAll(".filter-property");

  filterElements.forEach(function (filterElement) {
    let clickedFilter = filterElement.dataset.filter;

    filterElement.addEventListener("click", function () {
      if (!activeFilters.includes(clickedFilter)) {
        filterList.innerHTML += `
          <li class="filter" data-filter="${clickedFilter}">
            <a>${clickedFilter}</a>
            <a class="delete">X</a>
          </li>`;

        activeFilters.push(clickedFilter);
      } else {
        activeFilters = activeFilters.filter(
          (filter) => filter !== clickedFilter
        );

        filterListItems.forEach(function (filterListItem) {
          if (filterListItem.innerHTML.includes(clickedFilter)) {
            filterListItem.remove();
          }
        });
      }
      filterListItems = filterList.querySelectorAll("li");
      if (activeFilters.length === 0) {
        filterContainer.style.display = "none";
      } else {
        filterContainer.style.display = "flex";
      }
      renderJobListings(jobs);
    });
  });

  // Event listener for deleting filters
  filterList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      let selectedFilter = event.target.parentElement.dataset.filter;

      activeFilters = activeFilters.filter(
        (filter) => filter !== selectedFilter
      );

      event.target.parentElement.remove();

      filterListItems = filterList.querySelectorAll("li");
      if (activeFilters.length === 0) {
        filterContainer.style.display = "none";
      } else {
        filterContainer.style.display = "flex";
      }
      renderJobListings(jobs);
    }
  });

  clearElement.addEventListener("click", function () {
    activeFilters = [];
    filterList.innerHTML = "";
    filterContainer.style.display = "none";
    renderJobListings(jobs);
  });
}
