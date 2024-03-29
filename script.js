$(".slider-ss6").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  // fade: true,
  prevArrow:
    "<div class='icon-control-left icon-control'><i class='fa fa-angle-left' aria-hidden='true'></i></div>",
  nextArrow:
    "<div class='icon-control-right icon-control'><i class='fa fa-angle-right' aria-hidden='true'></i></div>",
});
// ---------------------------------xóa chữ
document.addEventListener("DOMContentLoaded", function () {
  function revealCharacters(button, text, index = 0) {
    const length = text.length;
    if (index < length) {
      button.textContent = text.slice(0, index + 1);
      setTimeout(() => {
        revealCharacters(button, text, index + 1);
      }, 60); // Tốc độ hiển thị ký tự (mỗi 50ms)
    } else {
      setTimeout(() => {
        hideCharacters(button, text, length);
      }, 2000); // Chờ 1 giây trước khi bắt đầu xóa
    }
  }

  function hideCharacters(button, text, index) {
    if (index >= 0) {
      button.textContent = text.slice(0, index);
      setTimeout(() => {
        hideCharacters(button, text, index - 1);
      }, 60); // Tốc độ xóa ký tự (mỗi 50ms)
    } else {
      setTimeout(() => {
        revealCharacters(button, text); // Sau khi xóa hết, hiển thị lại từ đầu
      }, 500); // Chờ 1 giây trước khi bắt đầu hiển thị lại
    }
  }

  function animateButtons() {
    const buttons = document.querySelectorAll(".btn-dathang");
    buttons.forEach((button) => {
      const text = button.textContent;
      revealCharacters(button, text);
    });
  }

  animateButtons(); // Không cần setInterval nữa
});
// ------------------------------btn-fixed
function createWordMatrix(inputWords) {
  var words = inputWords.split(",");
  var allWords = [];
  words.forEach(function (word) {
    word = word.trim();
    allWords.push(word.split(""));
  });
  return allWords;
}

function loopWords() {
  currentWords = allWords[currentWordsIndex];
  var currentIndex = 0;
  var output = document.getElementById("btn-fixed");
  var interval = setInterval(function () {
    if (currentIndex >= currentWords.length) {
      clearInterval(interval);
      setTimeout(deleteWords, 300);
      return;
    }
    output.innerHTML += "<span>" + currentWords[currentIndex] + "</span>";
    currentIndex++;
  }, 100); // Mỗi từ hiển thị trong 1 giây
}

function deleteWords() {
  var index = currentWords.length - 1;
  var output = document.getElementById("btn-fixed");
  var deleteInterval = setInterval(function () {
    if (index < 0) {
      clearInterval(deleteInterval);
      currentWordsIndex++;
      if (currentWordsIndex >= allWords.length) {
        currentWordsIndex = 0;
      }
      output.innerHTML = ""; // Xóa tất cả các phần tử con
      loopWords();
      return;
    }
    output.removeChild(output.lastChild);
    index--;
  }, 100); // Mỗi từ biến mất trong 1 giây
}

var currentWordsIndex = 0;
var allWords = createWordMatrix("đặt hàng ngay,xem 68 mẫu sẵn");

loopWords();
