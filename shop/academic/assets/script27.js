const periodApiMap = {
  all: "https://crm.apars.shop/api/total-enrolled/hsc27",
  daily: "https://crm.apars.shop/api/total-enrolled/hsc27/daily",
  weekly: "https://crm.apars.shop/api/total-enrolled/hsc27/weekly",
  monthly: "https://crm.apars.shop/api/total-enrolled/hsc27/monthly"
};
const periodLabelMap = {
  all: "Total Enrolled",
  daily: "Total Enrolled Today",
  weekly: "Total Enrolled This Week",
  monthly: "Total Enrolled This Month"
};

function updateActiveButton(period) {
  document.querySelectorAll('#enroll-filter-group .btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.period === period);
  });
}

function clearCourseCounts() {
  document.querySelectorAll('.inject-count').forEach(el => {
    if (el.nextElementSibling && el.nextElementSibling.classList.contains('enroll-info')) {
      el.nextElementSibling.remove();
    }
  });
  // Remove trophies and top-course classes
  document.querySelectorAll('.trophy-badge').forEach(el => el.remove());
  document.querySelectorAll('.top-course, .top-course-1, .top-course-2, .top-course-3').forEach(el => {
    el.classList.remove('top-course', 'top-course-1', 'top-course-2', 'top-course-3');
  });
}

// Move all course divs into the template container on DOMContentLoaded
function moveCourseDivsToTemplate() {
  const container = document.getElementById("course-container");
  const templateContainer = document.getElementById("all-course-templates");
  // Move only direct children with id (course divs)
  Array.from(container.children).forEach(child => {
    if (child.id) {
      templateContainer.appendChild(child);
    }
  });
}

function getCourseDivCloneById(id) {
  const templateContainer = document.getElementById("all-course-templates");
  const original = templateContainer.querySelector(`[id="${CSS.escape(id)}"]`);
  return original ? original.cloneNode(true) : null;
}

function getOrdinalSuffix(n) {
  const j = n % 10, k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

function sortAndDisplayCourses(data, period) {
  const container = document.getElementById("course-container");
  const sortedDivs = [];
  clearCourseCounts();
  data.enrolled.forEach((item, index) => {
    const div = getCourseDivCloneById(item.name);
    if (div) {
      const wrapper = div;
      wrapper.classList.add("position-relative");

      const placeLabel = document.createElement("span");
      const placeText = `${item.place}${getOrdinalSuffix(item.place)} place`;

      // For top 3 
      if (index < 3 && period === 'all') {
        const trophy = document.createElement("span");
        trophy.classList.add("trophy-badge");

        if (index === 0) {
          wrapper.classList.add("top-course", "top-course-1");
          trophy.classList.add("trophy-gold");
          trophy.innerText = "🏆";
        } else if (index === 1) {
          wrapper.classList.add("top-course", "top-course-2");
          trophy.classList.add("trophy-silver");
          trophy.innerText = "🥈";
        } else if (index === 2) {
          wrapper.classList.add("top-course", "top-course-3");
          trophy.classList.add("trophy-bronze");
          trophy.innerText = "🥉";
        }

        wrapper.appendChild(trophy);
        placeLabel.classList.add("place-text");
        placeLabel.innerText = placeText;
      } else {
        // 4-20 or more idk
        placeLabel.classList.add("place-text-no-trophy");
        placeLabel.innerText = placeText;
      }

      wrapper.appendChild(placeLabel);

      const titleAnchor = div.querySelector(".inject-count");
      if (titleAnchor) {
        const enrollmentInfo = document.createElement("div");
        enrollmentInfo.classList.add("text-muted", "small", "mt-1", "enroll-info");
        enrollmentInfo.innerHTML = `${periodLabelMap[period]}: <strong>${item.totalTransactions.toLocaleString()}</strong> students`;
        titleAnchor.parentElement.insertBefore(enrollmentInfo, titleAnchor.nextSibling);
      }

      sortedDivs.push(wrapper);
    }
  });
  while (container.firstChild) container.removeChild(container.firstChild);
  sortedDivs.forEach(div => container.appendChild(div));
}

let originalCourseContainerDisplay = null;
function fetchAndDisplay(period) {
  updateActiveButton(period);
  const loader = document.getElementById("loader");
  const container = document.getElementById("course-container");
  // Store the original display value if not already stored
  if (originalCourseContainerDisplay === null) {
    originalCourseContainerDisplay = window.getComputedStyle(container).display;
  }
  // Remove all course divs immediately for better UX
  while (container.firstChild) container.removeChild(container.firstChild);
  loader.style.display = "block";
  container.style.display = "none"; // Hide completely
  container.style.visibility = "hidden"; // Also hide by visibility
  fetch(periodApiMap[period])
    .then(res => res.json())
    .then(data => {
      if (data.code === 200) {
        sortAndDisplayCourses(data, period);
        loader.style.display = "none";
        container.style.display = originalCourseContainerDisplay; // Restore original display
        container.style.visibility = "visible"; // Make visible
      }
    })
    .catch(error => {
      console.error("Failed to fetch course data:", error);
      loader.innerText = "Failed to load courses.";
    });
}

document.addEventListener('DOMContentLoaded', function () {
  moveCourseDivsToTemplate();
  // Attach event listeners to filter buttons
  document.querySelectorAll('#enroll-filter-group .btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const period = this.dataset.period;
      fetchAndDisplay(period);
    });
  });
  fetchAndDisplay('all');
});