import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: string;
  NonNegativeInt: number;
  PositiveFloat: number;
  PositiveInt: number;
  UUID: string;
};

export type AddArrayTypeInput = {
  data: Array<InputMaybe<Scalars['Int']>>;
  example?: InputMaybe<Scalars['NonNegativeInt']>;
  interpretAs?: InputMaybe<ArrayInterpreter>;
  label?: InputMaybe<Scalars['String']>;
  problemNumber: Scalars['PositiveInt'];
};

export type AddGridInput = {
  data: Array<InputMaybe<Array<InputMaybe<Scalars['Int']>>>>;
  example?: InputMaybe<Scalars['NonNegativeInt']>;
  interpretAs?: InputMaybe<GridInterpreter>;
  label?: InputMaybe<Scalars['String']>;
  problemNumber: Scalars['PositiveInt'];
};

export type AddProblemInput = {
  dataTypes?: InputMaybe<Array<InputMaybe<ValidTypes>>>;
  description?: InputMaybe<Scalars['String']>;
  problemNumber: Scalars['PositiveInt'];
  title: Scalars['String'];
};

export enum ArrayInterpreter {
  ALPHABET = 'ALPHABET',
  BOOLEAN = 'BOOLEAN',
  NORMALIZED = 'NORMALIZED',
  NUMBER = 'NUMBER'
}

export type ArrayType = {
  __typename?: 'ArrayType';
  arrayData?: Maybe<Array<Maybe<Scalars['Int']>>>;
  arrayId: Scalars['ID'];
  exampleIndex: Scalars['NonNegativeInt'];
  fromExample: Scalars['NonNegativeInt'];
  interpretAs: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  problemNumber: Scalars['PositiveInt'];
};

export type Example = {
  __typename?: 'Example';
  grids?: Maybe<Array<Maybe<Grid>>>;
};

export type Grid = {
  __typename?: 'Grid';
  exampleIndex: Scalars['NonNegativeInt'];
  fromExample: Scalars['NonNegativeInt'];
  gridData?: Maybe<Array<Maybe<Array<Maybe<Scalars['Int']>>>>>;
  gridId: Scalars['ID'];
  height: Scalars['PositiveInt'];
  interpretAs: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  problemNumber: Scalars['PositiveInt'];
  width: Scalars['PositiveInt'];
};

export enum GridInterpreter {
  ALPHABET = 'ALPHABET',
  BOOLEAN = 'BOOLEAN',
  NORMALIZED = 'NORMALIZED',
  NUMBER = 'NUMBER'
}

export type Mutation = {
  __typename?: 'Mutation';
  addArray?: Maybe<ArrayType>;
  addGrid?: Maybe<Grid>;
  addProblem?: Maybe<ProblemInfo>;
  updateDescription?: Maybe<Scalars['String']>;
  updateTitle?: Maybe<Scalars['String']>;
};


export type MutationAddArrayArgs = {
  input: AddArrayTypeInput;
};


export type MutationAddGridArgs = {
  input: AddGridInput;
};


export type MutationAddProblemArgs = {
  input: AddProblemInput;
};


export type MutationUpdateDescriptionArgs = {
  input: UpdateDescriptionInput;
};


export type MutationUpdateTitleArgs = {
  input: UpdateTitleInput;
};

export type ProblemInfo = {
  __typename?: 'ProblemInfo';
  arrays?: Maybe<Array<Maybe<ArrayType>>>;
  description: Scalars['String'];
  grids?: Maybe<Array<Maybe<Grid>>>;
  hasArrays: Scalars['Boolean'];
  hasGraphs: Scalars['Boolean'];
  hasGrids: Scalars['Boolean'];
  numExamples: Scalars['NonNegativeInt'];
  problemId: Scalars['UUID'];
  problemNumber: Scalars['PositiveInt'];
  title: Scalars['String'];
};


export type ProblemInfoArraysArgs = {
  example?: InputMaybe<Scalars['NonNegativeInt']>;
};


export type ProblemInfoGridsArgs = {
  example?: InputMaybe<Scalars['NonNegativeInt']>;
};

export type Query = {
  __typename?: 'Query';
  arrays?: Maybe<Array<Maybe<ArrayType>>>;
  grids?: Maybe<Array<Maybe<Grid>>>;
  problem?: Maybe<ProblemInfo>;
};


export type QueryProblemArgs = {
  number?: InputMaybe<Scalars['Int']>;
};

export type UpdateDescriptionInput = {
  newDescription: Scalars['String'];
  problemNumber: Scalars['PositiveInt'];
};

export type UpdateTitleInput = {
  newTitle: Scalars['String'];
  problemNumber: Scalars['PositiveInt'];
};

export enum ValidTypes {
  ARRAY = 'ARRAY',
  GRAPH = 'GRAPH',
  GRID = 'GRID'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddArrayTypeInput: AddArrayTypeInput;
  AddGridInput: AddGridInput;
  AddProblemInput: AddProblemInput;
  ArrayInterpreter: ArrayInterpreter;
  ArrayType: ResolverTypeWrapper<ArrayType>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Example: ResolverTypeWrapper<Example>;
  Grid: ResolverTypeWrapper<Grid>;
  GridInterpreter: GridInterpreter;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  ProblemInfo: ResolverTypeWrapper<ProblemInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UpdateDescriptionInput: UpdateDescriptionInput;
  UpdateTitleInput: UpdateTitleInput;
  ValidTypes: ValidTypes;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddArrayTypeInput: AddArrayTypeInput;
  AddGridInput: AddGridInput;
  AddProblemInput: AddProblemInput;
  ArrayType: ArrayType;
  Boolean: Scalars['Boolean'];
  EmailAddress: Scalars['EmailAddress'];
  Example: Example;
  Grid: Grid;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  NonNegativeInt: Scalars['NonNegativeInt'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  ProblemInfo: ProblemInfo;
  Query: {};
  String: Scalars['String'];
  UUID: Scalars['UUID'];
  UpdateDescriptionInput: UpdateDescriptionInput;
  UpdateTitleInput: UpdateTitleInput;
};

export type ArrayTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArrayType'] = ResolversParentTypes['ArrayType']> = {
  arrayData?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  arrayId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  exampleIndex?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  fromExample?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  interpretAs?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  problemNumber?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ExampleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Example'] = ResolversParentTypes['Example']> = {
  grids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Grid']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GridResolvers<ContextType = any, ParentType extends ResolversParentTypes['Grid'] = ResolversParentTypes['Grid']> = {
  exampleIndex?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  fromExample?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  gridData?: Resolver<Maybe<Array<Maybe<Array<Maybe<ResolversTypes['Int']>>>>>, ParentType, ContextType>;
  gridId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  interpretAs?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  problemNumber?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addArray?: Resolver<Maybe<ResolversTypes['ArrayType']>, ParentType, ContextType, RequireFields<MutationAddArrayArgs, 'input'>>;
  addGrid?: Resolver<Maybe<ResolversTypes['Grid']>, ParentType, ContextType, RequireFields<MutationAddGridArgs, 'input'>>;
  addProblem?: Resolver<Maybe<ResolversTypes['ProblemInfo']>, ParentType, ContextType, RequireFields<MutationAddProblemArgs, 'input'>>;
  updateDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateDescriptionArgs, 'input'>>;
  updateTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateTitleArgs, 'input'>>;
};

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type ProblemInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProblemInfo'] = ResolversParentTypes['ProblemInfo']> = {
  arrays?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArrayType']>>>, ParentType, ContextType, Partial<ProblemInfoArraysArgs>>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Grid']>>>, ParentType, ContextType, Partial<ProblemInfoGridsArgs>>;
  hasArrays?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasGraphs?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasGrids?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  numExamples?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  problemId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  problemNumber?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  arrays?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArrayType']>>>, ParentType, ContextType>;
  grids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Grid']>>>, ParentType, ContextType>;
  problem?: Resolver<Maybe<ResolversTypes['ProblemInfo']>, ParentType, ContextType, Partial<QueryProblemArgs>>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type Resolvers<ContextType = any> = {
  ArrayType?: ArrayTypeResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  Example?: ExampleResolvers<ContextType>;
  Grid?: GridResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  ProblemInfo?: ProblemInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UUID?: GraphQLScalarType;
};

