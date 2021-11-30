declare global {
  const craft: CraftAPI;
}

export type CraftBlock = CraftTextBlock | CraftHorizontalLineBlock | CraftCodeBlock | CraftImageBlock
  | CraftVideoBlock | CraftFileBlock | CraftDrawingBlock | CraftUrlBlock | CraftTableBlock;

// General interface traits of different block types

interface HasId {
  id: string;
  spaceId?: string;
  documentId?: string;
}

interface HasBaseProperties {
  indentationLevel: number;
  listStyle: ListStyle;
  hasBlockDecoration: boolean;
  hasFocusDecoration: boolean;
  color: Color;
}

type HasBasePropertiesInsert = Partial<HasBaseProperties>;

type CraftBaseBlock = HasId & HasBaseProperties;

interface HasSubblocks {
  readonly subblocks: CraftBlock[];
}

interface HasSubblocksInsert {
  readonly subblocks?: CraftBlockInsert[];
}

 export interface CraftTextBlockStyle {
  textStyle: TextStyle;
  fontStyle: FontStyle;
  alignmentStyle: AlignmentStyle;
  cardStyle?: CraftCardStyle;
  coverImage?: CraftCoverImage;
}

export type CraftTextBlockStyleInsert = Partial<CraftTextBlockStyle>;

export interface CraftCardStyle {
  type: CraftCardType;

  fontStyle?: CraftCardFontStyle;
  backgroundColorKey?: CraftCardBackgroundColorKey;
  backgroundColor?: string;
  backgroundUrl?: string;
  isLightColor: boolean;
}

export interface CraftCoverImage {
  enabled:boolean;
  url?: string;
  aspectRatio?: number;
  attribution?: string;
  primaryColor?: string;
  imageWidth?: number;
  hasTransparency?: boolean;
}

export type CraftCardType =
  | "subtle"
  | "small"
  | "square"
  | "wide"
  | "large";

export type CraftCardFontStyle =
  | "regular"
  | "serif"
  | "rounded";

export type CraftCardBackgroundColorKey =
  | "white"
  | "dark-gray"
  | "blue"
  | "ocean"
  | "cyan"
  | "green"
  | "purple"
  | "magenta"
  | "bloodOrange"
  | "orange"
  | "brown"
  | "lightYellow"
  | "lightGreen"
  | "lightBlue"
  | "lightPink"
  | "blue_dimmed"
  | "ocean_dimmed"
  | "cyan_dimmed"
  | "green_dimmed"
  | "purple_dimmed"
  | "magenta_dimmed"
  | "bloodOrange_dimmed"
  | "orange_dimmed"
  | "brown_dimmed"
  | "lightYellow_dimmed"
  | "lightGreen_dimmed"
  | "lightBlue_dimmed"
  | "lightPink_dimmed"
  | "blue_vivid"
  | "ocean_vivid"
  | "cyan_vivid"
  | "green_vivid"
  | "purple_vivid"
  | "magenta_vivid"
  | "bloodOrange_vivid"
  | "orange_vivid"
  | "brown_vivid"
  | "lightYellow_vivid"
  | "lightGreen_vivid"
  | "lightBlue_vivid"
  | "lightPink_vivid";

// Block types returned by queries

export type CraftTextBlock = CraftBaseBlock & HasSubblocks & {
  type: "textBlock";
  content: CraftTextRun[];
  style: CraftTextBlockStyle;
};

export interface CraftHorizontalLineBlock extends CraftBaseBlock {
  type: "horizontalLineBlock";
  lineStyle: LineStyle;
}

export interface CraftCodeBlock extends CraftBaseBlock {
  type: "codeBlock";
  code: string;
  language: CodeLanguage;
}

export interface CraftResourceBlock extends CraftBaseBlock {
  url?: string;
  previewUrl?: string;
}

export interface CraftImageBlock extends CraftResourceBlock {
  type: "imageBlock";
}

export interface CraftVideoBlock extends CraftResourceBlock {
  type: "videoBlock";
}

export interface CraftFileBlock extends CraftResourceBlock {
  type: "fileBlock";
}

export interface CraftDrawingBlock extends CraftResourceBlock {
  type: "drawingBlock";
}

export interface CraftUrlBlock extends CraftBaseBlock {
  type: "urlBlock";
  url?: string;
  imageUrl?: string;
  title?: string;
  pageDescription?: string;
}

export interface CraftTableBlock extends CraftBaseBlock {
  type: "tableBlock";
  rows: CraftTableRow[];
}

export interface CraftTableRow {
  cells: CraftTableCell[];
}

export interface CraftTableCell {
  fillColor?: CraftTableCellFillColor;
  block?: CraftBlock;
}

export interface CraftTextRun {
  text: string;
  isBold?: boolean;
  isItalic?: boolean;
  isStrikethrough?: boolean;
  isCode?: boolean;
  highlightColor?: TextHighlightColor;
  link?: CraftLink;
}

export type CraftLink = CraftBlockLink | CraftUrl | CraftFormula | CraftDateLink;

export interface CraftBlockLink {
  type: "blockLink";
  spaceId: string;
  blockId: string;
}

export interface CraftUrl {
  type: "url";
  url: string;
}

export interface CraftFormula {
  type: "formula";
  formula: string;
}

export interface CraftDateLink {
  type: "dateLink";
  date: string;
}

// Block types use for insert

export type CraftBlockInsert = CraftTextBlockInsert | CraftHorizontalLineBlockInsert | CraftCodeBlockInsert
| CraftImageBlockInsert | CraftVideoBlockInsert | CraftFileBlockInsert | CraftDrawingBlockInsert | CraftUrlBlockInsert
| CraftTableBlockInsert;


export type CraftTextBlockInsert = CraftTextBlockConfig & {
  type: "textBlock";
};

export type CraftHorizontalLineBlockInsert = CraftHorizontalLineBlockConfig & {
  type: "horizontalLineBlock";
};

export type CraftCodeBlockInsert = CraftCodeBlockConfig & {
  type: "codeBlock";
};

export type CraftImageBlockInsert = Omit<CraftImageBlock, keyof HasId>;

export type CraftVideoBlockInsert = Omit<CraftVideoBlock, keyof HasId>;

export type CraftFileBlockInsert = Omit<CraftFileBlock, keyof HasId>;

export type CraftDrawingBlockInsert = Omit<CraftDrawingBlock, keyof HasId>;

export type CraftUrlBlockInsert = Omit<CraftUrlBlock, keyof HasId>;

export type CraftTableBlockInsert = Omit<CraftTableBlock, keyof HasId>;

// Block type used for update

export type CraftBlockUpdate = Omit<CraftBlock, "subblocks">;

// Block config types are the input for factory methods

export type CraftTextBlockConfig = HasBasePropertiesInsert & HasSubblocksInsert & {
  content: CraftTextRun[] | string;
  style?: CraftTextBlockStyleInsert;
};

export type CraftHorizontalLineBlockConfig = HasBasePropertiesInsert & {
  lineStyle?: LineStyle;
};

export type CraftCodeBlockConfig = HasBasePropertiesInsert & {
  code: string;
  language?: CodeLanguage;
};

export interface BlockFactory {
  textBlock(block: CraftTextBlockConfig): CraftTextBlockInsert;
  codeBlock(block: CraftCodeBlockConfig): CraftCodeBlockInsert;
  horizontalLineBlock(block: CraftHorizontalLineBlockConfig): CraftHorizontalLineBlockInsert;
  defaultListStyle(type: ListStyleType): ListStyle;
}

export interface CraftStorageApi {
  put(key: string, value: string): Promise<ApiResponse<void>>;
  get(key: string): Promise<ApiResponse<string>>;
  delete(key: string): Promise<ApiResponse<void>>;
}

export interface CraftDataApi {
  addBlocks(blocks: CraftBlockInsert[], location?: BlockLocation): Promise<ApiResponse<CraftBlock[]>>;
  updateBlocks(blockModels: CraftBlockUpdate[]): Promise<ApiResponse<CraftBlock[]>>;
  moveBlocks(blockIds: string[], location: BlockLocation): Promise<ApiResponse<CraftBlock[]>>;
  deleteBlocks(blockIds: string[]): Promise<ApiResponse<string[]>>;

  getCurrentPage(): Promise<ApiResponse<CraftTextBlock>>;
}

export interface CraftHttpProxy {
  fetch(request: CraftHttpRequest): Promise<ApiResponse<CraftHttpResponse>>;
}

export interface CraftHttpRequest {
  url: string;
  method?: string;
  headers?: CraftHttpHeaders;
  body?: CraftHttpRequestBody;
}

export type CraftHttpHeaders = { readonly [key: string]: string };

export type CraftHttpRequestBody = CraftHttpTextRequestBody;

export interface CraftHttpTextRequestBody {
  type: "text";
  text: string;
}

export interface CraftHttpResponse {
  status: number;
  headers: CraftHttpHeaders;
  body?: CraftHttpResponseBody;
}

export interface CraftHttpResponseBody {
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<any>;
  text(): Promise<string>;
}

type MarkdownGenerator = (blocks: CraftBlock[]) => string;

export type MarkdownFlavor = keyof MarkdownFactory;

export interface MarkdownOptions {
  tableSupported: boolean;
}

export interface MarkdownFactory {
  bear: MarkdownGenerator;
  common: MarkdownGenerator;
}

export interface MarkdownApi {
  markdownToCraftBlocks(source: string): CraftBlockInsert[];
  craftBlockToMarkdown(blocks: CraftBlock[], flavor: MarkdownFlavor, options: MarkdownOptions): string;
}

export interface CraftEditorApi {
  selectBlocks(blockIds: string[]): Promise<ApiResponse<CraftBlock[]>>;
  getSelection(): Promise<ApiResponse<CraftBlock[]>>;
  getTextSelection(): Promise<ApiResponse<string>>;
  navigateToBlockId(blockId: string): Promise<ApiResponse<void>>;
  openURL(url: string): Promise<ApiResponse<void>>;
}

export type ColorScheme  = "dark" | "light";
export type DevicePlatform  = "iPhone" | "iPad" | "Mac" | "Web";

export interface Environment {
  readonly colorScheme: ColorScheme;
  readonly platform: DevicePlatform;
}

export type EnvironmentListener = (currentEnv: Environment, prevEnv: Environment | undefined) => void;

export interface EnvironmentApi {
  setListener(listener: EnvironmentListener | null): void;
}

export type DOMString = string;

export interface ExperimentalApi {
  renderSmallBlockPreview(previewId: string, blocks: CraftBlock[], isDarkMode: boolean): DOMString;
}

export interface CraftAPI {
  blockFactory: BlockFactory;
  storageApi: CraftStorageApi;
  dataApi: CraftDataApi;
  editorApi: CraftEditorApi;
  markdown: MarkdownApi;
  location: LocationFactory;
  env: EnvironmentApi;
  experimental: ExperimentalApi;
  httpProxy: CraftHttpProxy;
}

export type BlockLocation = IndexLocation | AfterBlockLocation;

export interface IndexLocation {
  type: "indexLocation";
  pageId: string;
  index: number;
}

export interface AfterBlockLocation {
  type: "afterBlockLocation";
  pageId: string
  blockId?: string;
}

export interface LocationFactory {
  indexLocation(pageId: string, index: number): IndexLocation;
  afterBlockLocation(pageId: string, blockId?: string): AfterBlockLocation;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError<T>;

interface ApiResponseSuccess<T> {
  status: "success";
  data: T;
}

interface ApiResponseError<T> {
  status: "error";
  message: string;
  error?: any;
  data?: T;
}

export type ListStyleType = "none" | "bullet" | "numbered" | "todo" | "toggle";
export type ListStyle = NoneListStyle | BulletListStyle | NumberedListStyle | TodoListStyle | ToggleListStyle;

export interface NoneListStyle {
  type: "none";
}

export interface BulletListStyle {
  type: "bullet";
}

export interface NumberedListStyle {
  type: "numbered";
  ordinal?: number;
}

export type TodoState = "unchecked" | "checked" | "canceled";

export interface TodoListStyle {
  type: "todo";
  state: TodoState;
}

export interface ToggleListStyle {
  type: "toggle";
}

export type TextStyle =
  | "title"
  | "subtitle"
  | "heading"
  | "strong"
  | "body"
  | "caption"
  | "card"
  | "page";
export type FontStyle = "system-rounded" | "system-serif" | "system" | "system-mono";
export type AlignmentStyle = "left" | "right" | "center";
export type ImageFillStyle = "scaleAspectFit" | "scaleAspectFill";
export type ImageSizeStyle = "auto" | "fullWidth";
export type LineStyle = "strong" | "regular" | "light" | "extraLight";
export type CodeLanguage =
  | "Bash"
  | "ada"
  | "cpp"
  | "cs"
  | "css"
  | "dart"
  | "go"
  | "groovy"
  | "haskell"
  | "html"
  | "java"
  | "javascript"
  | "json"
  | "julia"
  | "kotlin"
  | "lua"
  | "markdown"
  | "math_formula"
  | "matlab"
  | "objectivec"
  | "perl"
  | "php"
  | "prolog"
  | "python"
  | "r"
  | "ruby"
  | "rust"
  | "scala"
  | "shell"
  | "sql"
  | "swift"
  | "typescript"
  | "vbnet"
  | "xml"
  | "yaml"
  | "other"
export type TextHighlightColor =
  | "yellow"
  | "lime"
  | "green"
  | "cyan"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "grey"
  | "beachGradient"
  | "nightSkyGradient"
  | "sunsetGradient"
  | "orangeGradient"
  | "goldGradient";
export type Color =
  | "text"
  | "text1"
  | "text2"
  | "text3"
  | "text4"
  | "grey"
  | "grey1"
  | "grey2"
  | "grey3"
  | "grey4"
  | "pink"
  | "pink1"
  | "pink2"
  | "pink3"
  | "pink4"
  | "purple"
  | "purple1"
  | "purple2"
  | "purple3"
  | "purple4"
  | "blue"
  | "blue1"
  | "blue2"
  | "blue3"
  | "blue4"
  | "cyan"
  | "cyan1"
  | "cyan2"
  | "cyan3"
  | "cyan4"
  | "green"
  | "green1"
  | "green2"
  | "green3"
  | "green4"
  | "olive"
  | "olive1"
  | "olive2"
  | "olive3"
  | "olive4"
  | "red"
  | "red1"
  | "red2"
  | "red3"
  | "red4"
  | "yellow"
  | "yellow1"
  | "yellow2"
  | "yellow3"
  | "yellow4";

  export type CraftTableCellFillColor =
  | "greyFill"
  | "greyFill1"
  | "greyFill2"
  | "greyFill3"
  | "greyFill4"
  | "greyFill5"
  | "greyFill6"
  | "greyFill7"
  | "purpleFill"
  | "purpleFill1"
  | "purpleFill2"
  | "blueFill"
  | "blueFill1"
  | "blueFill2"
  | "cyanFill"
  | "cyanFill1"
  | "cyanFill2"
  | "oliveFill"
  | "oliveFill1"
  | "oliveFill2"
  | "greenFill"
  | "greenFill1"
  | "greenFill2"
  | "yellowFill"
  | "yellowFill1"
  | "yellowFill2"
  | "pinkFill"
  | "pinkFill1"
  | "pinkFill2"
  | "pinkFill3"
  | "pinkFill4"
  | "pinkFill5"
  | "redFill"
  | "redFill1"
  | "redFill2";
