function showFile(input) {
    let file = input.files[0];

    let filereader = new FileReader();
  
    filereader.readAsText(file);
  
    filereader.onload = function() {
      console.log(filereader.result);
    };
  
    filereader.onerror = function() {
      console.log(filereader.error);
    };
}