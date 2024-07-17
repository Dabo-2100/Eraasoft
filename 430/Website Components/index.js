let modalIndex = false;
let modal = document.querySelector(".Modal");
AOS.init();
// Swal.fire({
//   icon: "question",
//   title: "Are you Sure ?",
//   text: "you are going to remove your account",
//   // position: "top-right",
//   showConfirmButton: false,
//   // timer: 1500,
// });

function toggleModal() {
  modalIndex
    ? modal.classList.replace("d-flex", "d-none")
    : modal.classList.replace("d-none", "d-flex");
  modalIndex = !modalIndex;
}
