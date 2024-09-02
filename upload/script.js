$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const redirect_uri = "http://127.0.0.1:5500/upload/index.html";
  const client_secret = "5hOen-8GReXUY4GT_NI_OSNY";
  const scope = "https://www.googleapis.com/auth/drive";
  const client_id = "233124594425-tded1f62r85u0pifju83btmtov0grdrl.apps.googleusercontent.com";

  $.ajax({
    type: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    data: {
      code,
      redirect_uri,
      client_secret,
      client_id,
      scope,
      grant_type: "authorization_code",
    },
    dataType: "json",
    success: function (resultData) {
      localStorage.setItem("accessToken", resultData.access_token);
      localStorage.setItem("refreshToken", resultData.refreshToken);
      localStorage.setItem("expires_in", resultData.expires_in);
      window.history.pushState({}, document.title, "/upload/uploader.html");
    },
  });

  function Upload(file) {
    this.file = file;
  }

  Upload.prototype = {
    getType: function () {
      localStorage.setItem("type", this.file.type);
      return this.file.type;
    },
    getSize: function () {
      localStorage.setItem("size", this.file.size);
      return this.file.size;
    },
    getName: function () {
      return this.file.name;
    },
    doUpload: function () {
      const formData = new FormData();
      formData.append("file", this.file, this.getName());
      formData.append("upload_file", true);

      $.ajax({
        type: "POST",
        beforeSend: (request) => {
          request.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
          );
        },
        url: "https://www.googleapis.com/upload/drive/v2/files",
        data: { uploadType: "media" },
        xhr: () => {
          const xhr = $.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener("progress", this.progressHandling, false);
          }
          return xhr;
        },
        success: (data) => console.log(data),
        error: (error) => console.log(error),
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000,
      });
    },
    progressHandling: function (event) {
      const progress_bar_id = "#progress-wrp";
      if (event.lengthComputable) {
        const percent = Math.ceil((event.loaded / event.total) * 100);
        $(progress_bar_id + " .progress-bar").css("width", percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
      }
    }
  };

  $("#upload").on("click", function () {
    const file = $("#files")[0].files[0];
    const upload = new Upload(file);
    upload.doUpload();
  });
});
