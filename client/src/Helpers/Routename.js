export const RouteIndex = '/'

export const RouteSignIn = '/signin'

export const RouteSignUp = '/signup'
export const RouteProfile = '/profile'
export const RouteCategory = '/categories'
export const RouteAddCategory = '/category/add'
export const RouteEditCategory = (category_id)=>{
    if(category_id){
        return `/category/edit/${category_id}`
    }
    else{
        return `/category/edit/:category_id`
    }

}