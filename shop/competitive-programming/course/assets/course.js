const allClasses = document.getElementById("classes");

allClasses.innerHTML += ``;

fetch(`https://shop.aparsclassroom.com/access/${uid}`)
  .then((res) => {
    res.json();
  })
  .then((data) => {
    console.log(data);
    if (data.status == "success") {
      data.classes.forEach((item) => {
        allClasses.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title
[...]
">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <a href="https://shop.aparsclassroom.com/competitive-programming/course/${item.id}" class="btn btn-primary">Go to Class</a>
                    </div>
                </div>
            </div>
            `;
      });
    } else {
      allClasses.innerHTML += `
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title
    ">No Classes Found</h5>
                    <p class="card-text">You have not purchased any classes yet. Please purchase a class to access it.</p>
                    <a href="https://shop.aparsclassroom.com/competitive-programming" class="btn btn-primary">Go to Shop</a>
                </div>
            </div>
        </div>
        `;
    }
  });
