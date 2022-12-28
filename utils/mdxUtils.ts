import matter from 'gray-matter';
import { join } from 'path';
import fs from 'fs';




// structure of a post
type Post = {
   data:{
   //     each post has a parameter key that takes the value of a string
       [key: string] : string
    };
 //   each post will include the post content associated with its parameter key
    content: string
}

// path to our list of available posts
export const POSTS_PATH = join(process.cwd(),'_posts');

export function getPostsFilePaths() {
    
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))
    
}

// getting a single post
export function getPost(slug:string):Post {
    
    const fullPath = join(POSTS_PATH,`${slug}.mdx`);
    
    const fileContents = fs.readFileSync(fullPath,'utf8');
    

    const {data,content} = matter(fileContents);
    
    
    return { data,content};
}

// load the post items
export function getPostItems(filePath:string, fields:string[] = []){

    const slug = filePath.replace(/\.mdx?$/, "");

    const fullPath = join(POSTS_PATH,`${slug}.mdx`);

    const fileContents = fs.readFileSync(fullPath,"utf8");

    
    const { data, content } = matter(fileContents);

    
    type Items = {
        [key: string]: string
    }

    const items: Items = {};

    // just load and include the content needed
    fields.forEach((field) => {
        // load the slug
        if(field === 'slug'){
            items[field] = slug;
        }
        // load the post content
        if(field === 'content') {
            items[field] = content;
        }
        // check if the above specified field exists on data
        if( typeof data[field] !== 'undefined'){
            
            // verify the fileds has data

            items[field] = data[field];
        }
    });
    // return the post items
    return items;
}

// getting all posts
export function getAllPosts(fields: string[] = []) {
    
    const filePaths = getPostsFilePaths();

    
    const posts = filePaths.map((filePath) => getPostItems(filePath, fields)).sort((post1, post2) => post1.date > post2.date ? -1 : 1);
    
    return posts;
}