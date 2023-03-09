import posts from '../../posts.json';
import { setItem } from './localStorage';

setItem('posts', posts.posts);
