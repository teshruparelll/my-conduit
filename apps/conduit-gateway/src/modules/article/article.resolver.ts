import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/jwt/jwt-auth.guard';
import { Article } from '../../shared/types/article/article.dto';
import { Comment } from '../../shared/types/article/comment.dto';
import { CreateArticleInput } from '../../shared/types/article/input/create-article.input';
import { CreateCommentInput } from '../../shared/types/article/input/create-comment.input';
import { DeleteArticleInput } from '../../shared/types/article/input/delete-article.input';
import { DeleteCommentInput } from '../../shared/types/article/input/delete-comment.input';
import { FavoriteArticleInput } from '../../shared/types/article/input/favorite-article.input';
import { GetArticleByIdInput } from '../../shared/types/article/input/get-article-by-id.input';
import { GetAuthorArticleInput } from '../../shared/types/article/input/get-author-article.input';
import { GetCommentByArticleInput } from '../../shared/types/article/input/get-comment-by-article.input';
import { UpdateArticleInput } from '../../shared/types/article/input/update-article.input';
import { UpdateArticleOutput } from '../../shared/types/article/output/update-article.output';
import { ArticleService } from './article.service';

@Resolver()
export class ArticleResolver {

  constructor(
    private readonly articleService: ArticleService
  ) { }

  @Mutation(() => Article)
  @UseGuards(GraphQLAuthGuard)
  createArticle(@Args('article') article: CreateArticleInput) {
    return this.articleService.create(article);
  }

  @Mutation(() => UpdateArticleOutput)
  @UseGuards(GraphQLAuthGuard)
  updateArticle(@Args('article') article: UpdateArticleInput) {
    return this.articleService.update(article);
  }

  @Query(() => [Article])
  @UseGuards(GraphQLAuthGuard)
  getAllArticles(@Args('currentUser') currentUser: string) {
    return this.articleService.getAll(currentUser);
  }

  @Query(() => [Article])
  @UseGuards(GraphQLAuthGuard)
  getArticlesByAuthor(@Args('authorAndUser') authorAndUser: GetAuthorArticleInput) {
    return this.articleService.getByAuthor(authorAndUser.author, authorAndUser.currentUser);
  }

  @Query(() => Article)
  @UseGuards(GraphQLAuthGuard)
  getArticleByID(@Args('payload') payload: GetArticleByIdInput) {
    return this.articleService.getByID(payload);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  favoriteArticle(@Args('favoriteArgs') favoriteArgs: FavoriteArticleInput) {
    return this.articleService.favoriteArticle(favoriteArgs);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  unfavoriteArticle(@Args('unfavoriteArgs') unfavoriteArgs: FavoriteArticleInput) {
    return this.articleService.unfavoriteArticle(unfavoriteArgs);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  deleteArticle(@Args('payload') payload: DeleteArticleInput) {
    return this.articleService.deleteArticle(payload);
  }

  // Comment APIs

  @Mutation(() => Comment)
  @UseGuards(GraphQLAuthGuard)
  createComment(@Args('comment') comment: CreateCommentInput) {
    return this.articleService.createComment(comment);
  }

  @Query(() => [Comment])
  @UseGuards(GraphQLAuthGuard)
  getCommentsByArticle(@Args('payload') payload: GetCommentByArticleInput) {
    return this.articleService.getCommentsByArticle(payload);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  deleteComment(@Args('payload') payload: DeleteCommentInput) {
    return this.articleService.deleteComment(payload);
  }
}