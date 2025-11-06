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

let container, loader, templateContainer, filterButtons;
let courseTemplates = new Map();

function initializeCache() {
  container = document.getElementById("course-container");
  loader = document.getElementById("loader");
  templateContainer = document.getElementById("all-course-templates");
  filterButtons = document.querySelectorAll('#enroll-filter-group .btn');
}

function updateActiveButton(period) {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.period === period);
  });
}

function getOrdinalSuffix(n) {
  const j = n % 10, k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

function cacheTemplates() {
  const children = Array.from(container.children);
  children.forEach(child => {
    if (child.id) {
      courseTemplates.set(child.id, child);
      templateContainer.appendChild(child);
    }
  });
}

function buildCourseHTML(item, period, index) {
  const template = courseTemplates.get(item.name);
  if (!template) return '';
  
  const placeText = `${item.place}${getOrdinalSuffix(item.place)} place`;
  let trophyHTML = '';
  let topCourseClass = '';
  let placeClass = 'place-text-no-trophy';
  
  // Top 3 courses styling
  if (index < 3 && period === 'all') {
    placeClass = 'place-text';
    if (index === 0) {
      topCourseClass = 'top-course top-course-1';
      trophyHTML = '<span class="trophy-badge trophy-gold">🏆</span>';
    } else if (index === 1) {
      topCourseClass = 'top-course top-course-2';
      trophyHTML = '<span class="trophy-badge trophy-silver">🥈</span>';
    } else if (index === 2) {
      topCourseClass = 'top-course top-course-3';
      trophyHTML = '<span class="trophy-badge trophy-bronze">🥉</span>';
    }
  }
  
  const wrapper = template.cloneNode(true);
  wrapper.classList.add('position-relative');
  if (topCourseClass) {
    topCourseClass.split(' ').forEach(cls => wrapper.classList.add(cls));
  }
  
  const titleAnchor = wrapper.querySelector(".inject-count");
  if (titleAnchor) {
    const enrollmentInfo = `<div class="text-muted small mt-1 enroll-info">${periodLabelMap[period]}: <strong>${item.totalTransactions.toLocaleString()}</strong> students</div>`;
    titleAnchor.insertAdjacentHTML('afterend', enrollmentInfo);
  }
  
  wrapper.insertAdjacentHTML('beforeend', trophyHTML);
  wrapper.insertAdjacentHTML('beforeend', `<span class="${placeClass}">${placeText}</span>`);
  
  return wrapper.outerHTML;
}

function renderCourses(data, period) {
  const fragment = document.createDocumentFragment();
  const tempDiv = document.createElement('div');
  
  const htmlParts = data.enrolled.map((item, index) => 
    buildCourseHTML(item, period, index)
  );
  
  tempDiv.innerHTML = htmlParts.join('');
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild);
  }
  
  container.innerHTML = '';
  container.appendChild(fragment);
}

async function fetchAndDisplay(period) {
  updateActiveButton(period);

  loader.style.display = "block";
  container.style.cssText = "display: none; visibility: hidden;";
  
  try {
    const response = await fetch(periodApiMap[period]);
    const data = await response.json();
    
    if (data.code === 200) {
      requestAnimationFrame(() => {
        renderCourses(data, period);
        loader.style.display = "none";
        container.style.cssText = "";
      });
    }
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    loader.innerText = "Failed to load courses.";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initializeCache();
  loader.style.display = "block";
  
  cacheTemplates();
  document.getElementById('enroll-filter-group')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn[data-period]');
    if (btn) {
      const period = btn.dataset.period;
      fetchAndDisplay(period);
    }
  });
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://crm.apars.shop';
  document.head.appendChild(link);
  
  fetchAndDisplay('all');
});