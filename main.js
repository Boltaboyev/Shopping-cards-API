const productContainer = document.querySelector(".products-container")
const category = document.querySelector(".category_btn")
const err = document.querySelector(".error404")
const searchForm = document.getElementById("searchForm")
let categoryId = localStorage.getItem("sortId") || "all"

const BASE_URL = "https://fakestoreapi.com/products"

function getDataFetch() {
    fetch(BASE_URL)
        .then((res) => res.json())
        .then((res) => {
            getData(res)
            searchProduct(res)
        })
        .catch(() => {
            err.style.display = "flex"
        })
}

function searchProduct(data) {
    searchForm.addEventListener("change", (e) => {
        e.preventDefault()
        const searchInput = searchForm.children[0].value

        const newData = data.filter((value) =>
            value.title.toLowerCase().includes(searchInput.toLowerCase())
        )

        getData(newData)
    })
}

function getData(data) {
    productContainer.innerHTML = ""
    if (categoryId !== "all") {
        data = data.filter((element) => element.category === categoryId)
    } else {
        data = data
    }
    data.forEach((value) => {
        const card = document.createElement("div")
        card.classList.add("product-info")
        card.innerHTML = `
            <div class="product-img">
                <div class="category">
                    <a href="#!">${value?.category}</a>
                </div>
                <img src="${value?.image}" alt="${value?.title}">
            </div>

            <div class="product-name">
                <h3>${value?.title.slice(0, 36)}</h3>
            </div>

            <div class="product-desc">
                <p>${value?.description.slice(0, 50)}...</p>
            </div>

            <div class="product-price">
                <h1><span>${value?.price}</span>$</h1>
                <h2><span>${(value?.price + Math.random() * 25).toFixed(
                    2
                )}</span>$</h2>
            </div>

            <div class="bottom-info">
                <div class="product-rate">
                    ${ratingStars(value?.rating.rate)}
                    <p>(${Math.round(value?.rating.rate)})</p>
                </div>

                <p>${value?.rating.count} pcs</p>
            </div>

            <button class="btn">Add to cart <i class="fa-solid fa-cart-shopping ml-[5px] text-[12px]"></i></button>
        `
        productContainer.append(card)
    })
}

function ratingStars(rating) {
    let stars = ""
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fa-solid fa-star ${
            i <= Math.round(rating) ? "text-[orange]" : "text-[gray]"
        }"></i>`
    }
    return stars
}

category.addEventListener("click", (e) => {
    const id = e.target.id
    if (id !== "") {
        categoryId = id
        localStorage.setItem("sortId", id)
        getDataFetch()
    }
})

getDataFetch()
