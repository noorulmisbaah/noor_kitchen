function toggleCommentsSection(arg) {
    if (arg === 'show')
        commentsArea.style.opacity = commentsArea.style.zIndex = 1;
    else if (arg === 'hide') {
        commentsArea.style.opacity = 0;
        commentsArea.style.zIndex = -1;
    }
}

const openCommentsSectionButton = document.querySelector('[open-comments-section-button]');
const closeCommentsSectionButton = document.querySelector('.close-comment-section');
const commentsArea = document.querySelector('.comment-area');
const commentAuthorField = document.querySelector('[comment-author-field]');
const commentContentField = document.querySelector('[comment-content-field]');
const postCommentButton = document.querySelector('[post-comment-button]');

openCommentsSectionButton.addEventListener('click', () => toggleCommentsSection('show'));
closeCommentsSectionButton.addEventListener('click', () => toggleCommentsSection('hide'));