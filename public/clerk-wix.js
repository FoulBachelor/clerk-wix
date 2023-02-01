/* ACTIVE Imports */
import { cart } from 'wix-stores';

export const clerkGetCart = async () => {
    const currentCart = await cart.getCurrentCart();
    const cartInfo = { cartId: currentCart._id, cartLineItems: currentCart.lineItems }
    return cartInfo;
}

export const clerkGetCartProducts = async () => {
	const cart = await clerkGetCart();
    const product_ids = cart.cartLineItems.map(line_item => {
        return line_item?.productId
    });
	return product_ids;
}

export const clerkHydrateBasketTracking = async (selector_list=['']) => {
	const product_ids = await clerkGetCartProducts();
	selector_list.forEach(el => {
		if($w(el).length !== 0){
			$w(el).setAttribute('data-products', product_ids);
		}
	});
}

export const clerkHydrateCartSlider = async (selector_list=['']) => {
    const product_ids = await clerkGetCartProducts();
	selector_list.forEach(el => {
		if($w(el).length !== 0){
			$w(el).setAttribute('data-products', `${JSON.stringify(product_ids)}`);
		}
	});
}

export const clerkHydrateProductSlider = async (selector_list=['']) => {
    const product_id = await clerkGetProduct();
	selector_list.forEach(el => {
		if($w(el).length !== 0){
			$w(el).setAttribute('data-products', `["${product_id}"]`);
		}
	});
}

export const clerkHydrateSalesTracking = async (selector_list=['']) => {
    const order_details = await clerkGetOrder();
	const order_products = order_details.lineItems.map(line_item => {
		return {id: line_item.productId, quantity: line_item.quantity, price: line_item.tax + line_item.priceData.price}
	});
	selector_list.forEach(el => {
        if($w(el).length !== 0){
            $w(el).setAttribute('data-sale', order_details._id);
            $w(el).setAttribute('data-email', order_details.buyerInfo.email);
            $w(el).setAttribute('data-products', order_products);
        }
	});
}

export const clerkHydrateSearchPage = (selector_list=[''], wixLocation) => {
    const query = clerkGetQuery(wixLocation);
    selector_list.forEach(el => {
        if($w(el).length !== 0){
            $w(el).setAttribute('data-query', query);
        }
	});
}

export const clerkGetProduct = async () => {
	const product = await $w('#productPage1').getProduct();
	return product?._id;
}

export const clerkGetOrder = async () => {
	const order = await $w('#thankYouPage1').getOrder();
	return order;
}

export const clerkGetQuery = (wixLocation) => {
	return wixLocation.query['q'];
}

/* DEAD Imports START */
/*
import wixSite from 'wix-site';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { authentication } from 'wix-members';
import { session } from 'wix-storage';
*/
/* DEAD Imports END */

/* DEAD Functions START */
/*

export const clerkPathTypeConversion = (path_list) => {
	if (typeof path_list == 'string') {
		return path_list.split('/').filter(n => n)
	}
	if (Object.prototype.toString.call(path_list) === '[object Array]') {
		let string_path = '';
		path_list.forEach(item => {
			string_path += item + '/'
		});
		return string_path;
	}

}

export const setPagePathInSession = (string_path='') => {
	session.setItem("clerk_last_path", string_path);
}

export const getPagePathInSession = () => {
	return session.getItem("clerk_last_path");
}

export const clerkGetCurrentProductId = async () => {
    const currentPath = wixLocation.path.pop();
    const data = await wixData.query("Stores/Products").eq('slug', currentPath).limit(1).find();
    const product_id = ('_items' in data && data['_items'].length > 0) ? data['_items'][0]['_id'] : null;
    return product_id;
}

export const clerkGetUser = async () => {
    if(authentication.loggedIn()){
        const userRoles = await wixUsers.currentUser.getRoles();
        const userEmail = await wixUsers.currentUser.getEmail();
        const userPricing = await wixUsers.currentUser.getPricingPlans();
        return {
            user: wixUsers.currentUser,
            userId: wixUsers.currentUser.id,
            isLoggedIn: wixUsers.currentUser.loggedIn,
            email: userEmail,
            roles: { roleName: userRoles[0].name, roleDescription: userRoles[0].description },
            pricingPlans: { planName: userPricing[0].name, startDate: userPricing[0].startDate, expiryDate: userPricing[0].expiryDate }
        }
    } else {
        return {
            user: {},
            userId: null,
            isLoggedIn: false,
            email: '',
            roles: {},
            pricingPlans: {}
        }
    }
}

export const clerkGetSite = () => {
    const siteInfo = {
        currency: wixSite.currency,
        currentPage: wixSite.currentPage,
        language: wixSite.language,
        region: wixSite.regionalSettings,
        timezone: wixSite.timezone,
        revision: wixSite.revision
    }
    return siteInfo;
}
*/
/* DEAD Functions END */