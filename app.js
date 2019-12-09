const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "19tu31xlgwcv",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "AFmjkXSQyPO-UK1aInU8MoOUsOERwujkD4yjwEKf02k"
});

//variables
const menuItems = document.querySelector(".menu-items");
const productsDiv = document.querySelector(".products");
const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
  productsDiv.scrollIntoView();
});

class MenuItems {
  async getItems() {
    try {
      let contentful = await client
        .getEntries({
          content_type: "menuItem"
        })
        .catch(console.error);

      let items = contentful.items;

      items = items.map(item => {
        const { title, description, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, description, id, image, price };
      });
      console.log(items);

      return items;
    } catch (error) {
      console.log(error);
    }
  }
}
class UI {
  displayItems(items) {
    let result = "";
    items.forEach(item => {
      result += `<div class="item">
          <img src="${item.image}" alt="" />
          <div class="item-details">
            <h3 class="menu-item-title">${item.title}</h3>
            <h6 class="menu-item-description">
              Extras: ${item.description}
            </h6>
            <h3 class="menu-item-price">$${item.price}</h3>
          </div>
        </div>`;
    });
    menuItems.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let menuItems = new MenuItems();
  let ui = new UI();

  let items = menuItems.getItems().then(items => {
    ui.displayItems(items);
  });
});
