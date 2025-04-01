export const RouteIndex = '/'

export const RouteSignIn = '/signin'

export const RouteSignUp = '/signup'
export const RouteProfile = '/profile'

// rotes names for blog

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

// rotes names for blog

export const RouteBlog = '/blog'
export const RouteAddBlog = '/blog/add'
export const RouteEditBlog = (blogid)=>{
    if(blogid){
        return `/blog/edit/${blogid}`
    }
    else{
        return `/blog/edit/:blog_id`
    }
}

export const RouteSingleBlog = (category,blog)=>{
    if(!category, !blog){
        return `/blog/:category/:blog`
    }
    else{
        return `/blog/${category}/${blog}`
    }

}