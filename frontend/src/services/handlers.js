import Ajax from "./Ajax";
import { handler } from "../components";






export const CONTROLLERS = {
    // *******************************************************************************************************************************
    // Porduct handling
    async handleAddToCart(product, quantity)  {
        const indexThis = handler.indexThis();
        this.state = handler.indexThis().state;
        // Add the quantity to the product
        product.quantity = quantity
        if (this.state.userAuthenticated){
            // Add the product to the DB
                const response = await Ajax(/CartProducts/, "POST", JSON.stringify(product));
            // If product is successfully added
            // Send another request to get the products in the DB...
            // The reason we aren't using the state is because we are using a single source of truth.
                response.status === 200 ? indexThis.updateCartFromDB() :alert("Maximum quantity to purchase is 10 items.");
                
        }else{
            const cartProducts = [...this.state.cartProducts];
            const foundProduct = cartProducts.find(prod => prod.product_id === product.product_id);
                if (foundProduct){
                    if ((foundProduct.quantity+quantity) > 10){
                        alert("Maximum quantity to purchase is 10 items.")
                        return;
                    }else{
                        foundProduct.quantity += quantity
                        localStorage.setItem("cart", JSON.stringify(cartProducts))
                        indexThis.setState({cartProducts:JSON.parse(localStorage.getItem("cart"))})
                    }
                }else{
                    cartProducts.push(product)
                    localStorage.setItem("cart", JSON.stringify(cartProducts))
                    indexThis.setState({cartProducts:JSON.parse(localStorage.getItem("cart"))})
                }
    
        }
    },
    
    async handleQuantityUpdate(product)  {
        const indexThis = handler.indexThis();
        this.state = handler.indexThis().state;
        if (this.state.userAuthenticated){
            const response = await Ajax(`/UpdateProduct/${product.product_id}/`, "PUT", JSON.stringify(product))
            response.status === 200? indexThis.updateCartFromDB(): alert("Maximum quantity to purchase is 10 items.");
        }else{
            console.log("User isn't authenticated")
            const localStorageCartItems = JSON.parse(localStorage.getItem("cart"))
            const foundProduct = localStorageCartItems.find(prod => prod.product_id === product.product_id)
            const index = localStorageCartItems.indexOf(foundProduct);
            foundProduct.quantity = product.quantity
            localStorageCartItems.splice(index, 1)
            localStorageCartItems.push(foundProduct)
            localStorage.setItem("cart", JSON.stringify(localStorageCartItems))
            indexThis.setState({cartProducts:localStorageCartItems})
        }
    
    },
    
    async handleProductRemove(productId)  {
        const indexThis = handler.indexThis();
        this.state = handler.indexThis().state;
        if (this.state.userAuthenticated){
            const response = await Ajax(`/RemoveProduct/${productId}/`, "DELETE")
            response.status === 200?indexThis.updateCartFromDB():alert("Something went wrong");
        }else{
            const localStorageCartItems = JSON.parse(localStorage.getItem("cart"))
            const foundProduct = localStorageCartItems.find(product => product.product_id === productId)
            const index = localStorageCartItems.indexOf(foundProduct);
            localStorageCartItems.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(localStorageCartItems))
            indexThis.setState({cartProducts:localStorageCartItems})
        }
    },
    
    // *******************************************************************************************************************************
    // User authentication 
    handleUserLogin() {
        const indexThis = handler.indexThis();
            indexThis.setState({ userAuthenticated:true });
            window.location.replace("/")
    },
    
    async handleUserLogout() {
        const indexThis = handler.indexThis();
            const response = await Ajax("/LogoutAPI/", "GET")
            if (response.status === 200){
                indexThis.setState({  userAuthenticated:false }) 
                window.location.reload();
            }
    },

    // *******************************************************************************************************************************
    // Miscelaneous 
    handleNavLinkClick(url)  {
        const indexThis = handler.indexThis();
        if (window.innerWidth <= 768) {
            indexThis.redirect(url);
            indexThis.setState({ menuOn: false });
        } else { 
            indexThis.redirect(url);
        }
    },
    
    handleSearchInput(searchInput) {
        const indexThis = handler.indexThis();
        indexThis.setState({ searchInput });
    },
    
    handleSearchSubmit(event) {
        const indexThis = handler.indexThis();
        event.preventDefault();
        indexThis.handleSearchInput(indexThis.refs.searchinput.value);
        indexThis.handleMenuClick();
        indexThis.props.history.replace("/home/search");
    },
    
    handleCategoryChange(selectedCategory) {
        const indexThis = handler.indexThis();
        indexThis.setState({ selectedCategory });
    },
    
    handleMenuClick() {
        this.state = handler.indexThis().state;
        const indexThis = handler.indexThis();
        if (!this.state.menuOn) {
            indexThis.setState({ menuOn: true });
            indexThis.props.history.replace("/home");
        } else {
            indexThis.setState({ menuOn: false });
        }
    },
    // *******************************************************************************************************************************
}






