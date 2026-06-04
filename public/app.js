const modelEl = document.querySelector('#model');
const loadModelsEl = document.querySelector('#loadModels');
const modelHintEl = document.querySelector('#modelHint');
const promptEl = document.querySelector('#prompt');
const optimizePromptEl = document.querySelector('#optimizePrompt');
const promptPresetMenuEl = document.querySelector('#promptPresetMenu');
const randomPromptEl = document.querySelector('#randomPrompt');
const resolutionEl = document.querySelector('#resolution');
const aspectRatioEl = document.querySelector('#aspectRatio');
const officialFallbackEl = document.querySelector('#officialFallback');
const sideNavButtons = [...document.querySelectorAll('.side-nav-item')];
const buttonEl = document.querySelector('#generate');
const messageEl = document.querySelector('#message');
const resultFrameEl = document.querySelector('#resultFrame');
const emptyEl = document.querySelector('#empty');
const previewPanelEl = document.querySelector('#previewPanel');
const sendToResizeEl = document.querySelector('#sendToResize');
const sendToLayerEl = document.querySelector('#sendToLayer');
const sendToPhotoshopEl = document.querySelector('#sendToPhotoshop');
const downloadEl = document.querySelector('#download');
const fullscreenEl = document.querySelector('#fullscreen');
const imageModalEl = document.querySelector('#imageModal');
const modalCanvasEl = document.querySelector('.modal-canvas');
const modalImageEl = document.querySelector('#modalImage');
const closeModalEl = document.querySelector('#closeModal');
const modalPrevEl = document.querySelector('#modalPrev');
const modalNextEl = document.querySelector('#modalNext');
const modalRegenerateEl = document.querySelector('#modalRegenerate');
const modalDownloadEl = document.querySelector('#modalDownload');
const modalPromptEl = document.querySelector('#modalPrompt');
const modalReferenceListEl = document.querySelector('#modalReferenceList');
const modalRatioEl = document.querySelector('#modalRatio');
const modalResolutionEl = document.querySelector('#modalResolution');
const modalModelEl = document.querySelector('#modalModel');

if (imageModalEl?.parentElement !== document.body) {
  document.body.append(imageModalEl);
}

const deleteConfirmEl = document.querySelector('#deleteConfirm');
const deleteConfirmTextEl = document.querySelector('#deleteConfirmText');
const cancelDeleteEl = document.querySelector('#cancelDelete');
const confirmDeleteEl = document.querySelector('#confirmDelete');
const referenceImageEl = document.querySelector('#referenceImage');
const uploadBoxEl = document.querySelector('.upload-box');
const referencePreviewEl = document.querySelector('#referencePreview');
const uploadNameEl = document.querySelector('#uploadName');
const apiKeyBoxEl = document.querySelector('#apiKeyBox');
const apiKeyInputEl = document.querySelector('#apiKeyInput');
const chatApiKeyInputEl = document.querySelector('#chatApiKeyInput');
const baseUrlInputEl = document.querySelector('#baseUrlInput');
const apiEntryNameInputEl = document.querySelector('#apiEntryNameInput');
const imageModelInputEl = document.querySelector('#imageModelInput');
const chatModelInputSettingsEl = document.querySelector('#chatModelInputSettings');
const fillApimartPresetEl = document.querySelector('#fillApimartPreset');
const fillSuperApiPresetEl = document.querySelector('#fillSuperApiPreset');
const fillYdn99PresetEl = document.querySelector('#fillYdn99Preset');
const saveApiKeyEl = document.querySelector('#saveApiKey');
const apiKeyStatusEl = document.querySelector('#apiKeyStatus');
const psBridgeChannelInputEl = document.querySelector('#psBridgeChannelInput');
const psBridgeStatusEl = document.querySelector('#psBridgeStatus');
let psBridgeIncomingTimer = null;
const generatorPageEl = document.querySelector('#generatorPage');
const resizePageEl = document.querySelector('#resizePage');
const layerPageEl = document.querySelector('#layerPage');
const galleryPageEl = document.querySelector('#galleryPage');
const toolboxPageEl = document.querySelector('#toolboxPage');
const chatPageEl = document.querySelector('#chatPage');
const helpPageEl = document.querySelector('#helpPage');
const settingsPageEl = document.querySelector('#settingsPage');
const historySectionEl = document.querySelector('#historySection');
const historyGridEl = document.querySelector('#historyGrid');
const historyCountEl = document.querySelector('#historyCount');
const historyPrevEl = document.querySelector('#historyPrev');
const historyNextEl = document.querySelector('#historyNext');
const galleryGridEl = document.querySelector('#galleryGrid');
const galleryCountEl = document.querySelector('#galleryCount');
const gallerySelectAllEl = document.querySelector('#gallerySelectAll');
const galleryClearSelectionEl = document.querySelector('#galleryClearSelection');
const galleryDownloadSelectedEl = document.querySelector('#galleryDownloadSelected');
const galleryDeleteSelectedEl = document.querySelector('#galleryDeleteSelected');
const resizeImageInputEl = document.querySelector('#resizeImageInput');
const resizeUploadEl = document.querySelector('#resizeImageInput')?.closest('.resize-upload');
const resizeSourcePreviewEl = document.querySelector('#resizeSourcePreview');
const resizeFileNameEl = document.querySelector('#resizeFileName');
const layerImageInputEl = document.querySelector('#layerImageInput');
const layerUploadEl = document.querySelector('#layerImageInput')?.closest('.resize-upload');
const layerSourcePreviewEl = document.querySelector('#layerSourcePreview');
const layerOptionCards = [...document.querySelectorAll('.layer-option-card')];
const layerAnalyzeImageEl = document.querySelector('#layerAnalyzeImage');
const layerAnalysisTextEl = document.querySelector('#layerAnalysisText');
const layerGenerateFromSelectionEl = document.querySelector('#layerGenerateFromSelection');
const layerResultEmptyEl = document.querySelector('#layerResultEmpty');
const layerResultListEl = document.querySelector('#layerResultList');
const layerResultInfoEl = document.querySelector('#layerResultInfo');
const layerGenerateSelectedEl = document.querySelector('#layerGenerateSelected');
const layerMessageEl = document.querySelector('#layerMessage');
const resizeCategoryButtons = [...document.querySelectorAll('#resizeCategory button')];
const resizePresetCards = [...document.querySelectorAll('.resize-preset-card')];
let activeResizeCategory = resizeCategoryButtons.find((button) => button.classList.contains('active'))?.dataset.category
  || resizeCategoryButtons[0]?.dataset.category
  || 'merchant-story';
const toolboxHomeEl = document.querySelector('#toolboxHome');
const cutoutToolEl = document.querySelector('#cutoutTool');
const iconRedrawToolEl = document.querySelector('#iconRedrawTool');
const imageEditToolEl = document.querySelector('#imageEditTool');
const promptGalleryToolEl = document.querySelector('#promptGalleryTool');
const importantGalleryToolEl = document.querySelector('#importantGalleryTool');
const openCutoutToolEl = document.querySelector('#openCutoutTool');
const openIconRedrawToolEl = document.querySelector('#openIconRedrawTool');
const openImageEditToolEl = document.querySelector('#openImageEditTool');
const openPromptGalleryToolEl = document.querySelector('#openPromptGalleryTool');
const openImportantGalleryToolEl = document.querySelector('#openImportantGalleryTool');
const backToToolboxHomeEl = document.querySelector('#backToToolboxHome');
const backToToolboxHomeFromIconEl = document.querySelector('#backToToolboxHomeFromIcon');
const backToToolboxHomeFromEditEl = document.querySelector('#backToToolboxHomeFromEdit');
const backToToolboxHomeFromPromptEl = document.querySelector('#backToToolboxHomeFromPrompt');
const backToToolboxHomeFromImportantEl = document.querySelector('#backToToolboxHomeFromImportant');
const togglePromptGalleryFormEl = document.querySelector('#togglePromptGalleryForm');
const cancelPromptGalleryFormEl = document.querySelector('#cancelPromptGalleryForm');
const promptSavePanelEl = document.querySelector('#promptSavePanel');
const promptCategoryTabsEl = document.querySelector('#promptCategoryTabs');
const promptGalleryTitleEl = document.querySelector('#promptGalleryTitle');
const promptGalleryCategoryEl = document.querySelector('#promptGalleryCategory');
const promptGalleryImageEl = document.querySelector('#promptGalleryImage');
const promptGalleryImagePreviewEl = document.querySelector('#promptGalleryImagePreview');
const promptGalleryPromptEl = document.querySelector('#promptGalleryPrompt');
const savePromptGalleryItemEl = document.querySelector('#savePromptGalleryItem');
const promptGalleryMessageEl = document.querySelector('#promptGalleryMessage');
const promptGalleryCountEl = document.querySelector('#promptGalleryCount');
const promptGalleryGridEl = document.querySelector('#promptGalleryGrid');
const toggleImportantGalleryFormEl = document.querySelector('#toggleImportantGalleryForm');
const cancelImportantGalleryFormEl = document.querySelector('#cancelImportantGalleryForm');
const importantSavePanelEl = document.querySelector('#importantSavePanel');
const importantGalleryTitleEl = document.querySelector('#importantGalleryTitle');
const importantGalleryCategoryEl = document.querySelector('#importantGalleryCategory');
const importantGalleryImageEl = document.querySelector('#importantGalleryImage');
const importantGalleryImagePreviewEl = document.querySelector('#importantGalleryImagePreview');
const saveImportantGalleryItemEl = document.querySelector('#saveImportantGalleryItem');
const importantGalleryMessageEl = document.querySelector('#importantGalleryMessage');
const importantGalleryCountEl = document.querySelector('#importantGalleryCount');
const importantGalleryGridEl = document.querySelector('#importantGalleryGrid');
const imageEditInputEl = document.querySelector('#imageEditInput');
const imageEditCanvasEl = document.querySelector('#imageEditCanvas');
const imageEditCanvasShellEl = document.querySelector('.image-edit-canvas-shell');
const imageEditEmptyEl = document.querySelector('#imageEditEmpty');
const imageEditModeButtons = [...document.querySelectorAll('[data-image-edit-mode]')];
const imageEditBrushEl = document.querySelector('#imageEditBrush');
const imageEditBrushValueEl = document.querySelector('#imageEditBrushValue');
const imageEditClearMaskEl = document.querySelector('#imageEditClearMask');
const imageEditFitEl = document.querySelector('#imageEditFit');
const imageEditInfoEl = document.querySelector('#imageEditInfo');
const imageEditPromptEl = document.querySelector('#imageEditPrompt');
const imageEditSizeControlsEl = document.querySelector('#imageEditSizeControls');
const imageEditResolutionEl = document.querySelector('#imageEditResolution');
const imageEditRatioEl = document.querySelector('#imageEditRatio');
const imageEditQualityEl = document.querySelector('#imageEditQuality');
const imageEditGenerateEl = document.querySelector('#imageEditGenerate');
const imageEditMessageEl = document.querySelector('#imageEditMessage');
const imageEditResultEl = document.querySelector('#imageEditResult');
const iconRedrawInputEl = document.querySelector('#iconRedrawInput');
const iconRedrawUploadEl = document.querySelector('#iconRedrawInput')?.closest('.icon-redraw-upload');
const iconRedrawCanvasEl = document.querySelector('#iconRedrawCanvas');
const iconRedrawPreviewShellEl = document.querySelector('.icon-redraw-preview-shell');
const iconRedrawEmptyEl = document.querySelector('#iconRedrawEmpty');
const iconRedrawClearEl = document.querySelector('#iconRedrawClear');
const iconRedrawResetViewEl = document.querySelector('#iconRedrawResetView');
const iconRedrawMergeEl = document.querySelector('#iconRedrawMerge');
const iconRedrawCountEl = document.querySelector('#iconRedrawCount');
const iconRedrawModeEl = document.querySelector('#iconRedrawMode');
const iconRedrawPromptEl = document.querySelector('#iconRedrawPrompt');
const iconRedrawResolutionEl = document.querySelector('#iconRedrawResolution');
const iconRedrawRatioEl = document.querySelector('#iconRedrawRatio');
const iconRedrawGenerateEl = document.querySelector('#iconRedrawGenerate');
const iconRedrawMessageEl = document.querySelector('#iconRedrawMessage');
const iconRedrawResultEl = document.querySelector('#iconRedrawResult');
const cutTemplateInputEl = document.querySelector('#cutTemplateInput');
const cutCanvasShellEl = document.querySelector('#cutCanvasShell');
const cutCanvasEl = document.querySelector('#cutCanvas');
const cutCanvasEmptyEl = document.querySelector('#cutCanvasEmpty');
const cutClearMasksEl = document.querySelector('#cutClearMasks');
const cutTemplateInfoEl = document.querySelector('#cutTemplateInfo');
const cutZoomOutEl = document.querySelector('#cutZoomOut');
const cutZoomFitEl = document.querySelector('#cutZoomFit');
const cutZoomInEl = document.querySelector('#cutZoomIn');
const cutZoomValueEl = document.querySelector('#cutZoomValue');
const cutExportNameEl = document.querySelector('#cutExportName');
const cutRadiusEl = document.querySelector('#cutRadius');
const cutFitModeEl = document.querySelector('#cutFitMode');
const cutRatioButtons = [...document.querySelectorAll('[data-cut-ratio]')];
const chatModelInputEl = document.querySelector('#chatModelInput');
const chatTranscriptEl = document.querySelector('#chatTranscript');
const chatFormEl = document.querySelector('#chatForm');
const chatInputEl = document.querySelector('#chatInput');
const chatToolToggleEl = document.querySelector('#chatToolToggle');
const chatPresetButtons = [...document.querySelectorAll('[data-chat-preset]')];
const chatPresetStatusEl = document.querySelector('#chatPresetStatus');
const chatMobileTitleEl = document.querySelector('#chatMobileTitle');
const clearChatTodayEl = document.querySelector('#clearChatToday');
const chatCustomPresetEl = document.querySelector('#chatCustomPreset');
const saveChatCustomPresetEl = document.querySelector('#saveChatCustomPreset');
const useChatCustomPresetEl = document.querySelector('#useChatCustomPreset');
const chatCustomPresetStatusEl = document.querySelector('#chatCustomPresetStatus');
const chatPresetMenuEl = document.querySelector('#chatPresetMenu');
const chatPresetEditorEl = document.querySelector('#chatPresetEditor');
const chatPresetEditorFormEl = document.querySelector('.chat-preset-editor-card');
const chatPresetEditLabelEl = document.querySelector('#chatPresetEditLabel');
const chatPresetEditDescriptionEl = document.querySelector('#chatPresetEditDescription');
const chatPresetEditPromptEl = document.querySelector('#chatPresetEditPrompt');
const closeChatPresetEditorEl = document.querySelector('#closeChatPresetEditor');
const cancelChatPresetEditorEl = document.querySelector('#cancelChatPresetEditor');
const saveChatPresetEditorEl = document.querySelector('#saveChatPresetEditor');
const loadChatModelsEl = document.querySelector('#loadChatModels');
const sendChatEl = document.querySelector('#sendChat');
const chatModelOptionsEl = document.querySelector('#chatModelOptions');
const chatImageInputEl = document.querySelector('#chatImageInput');
const chatImagePreviewEl = document.querySelector('#chatImagePreview');
const cutRatioWidthEl = document.querySelector('#cutRatioWidth');
const cutRatioHeightEl = document.querySelector('#cutRatioHeight');
const cutApplyCustomRatioEl = document.querySelector('#cutApplyCustomRatio');
const cutPhotoInputEl = document.querySelector('#cutPhotoInput');
const cutMaskCountEl = document.querySelector('#cutMaskCount');
const cutPhotoCountEl = document.querySelector('#cutPhotoCount');
const cutMaskListEl = document.querySelector('#cutMaskList');
const cutGeneratePreviewEl = document.querySelector('#cutGeneratePreview');
const cutExportAllEl = document.querySelector('#cutExportAll');
const cutMessageEl = document.querySelector('#cutMessage');
const cutPreviewCountEl = document.querySelector('#cutPreviewCount');
const cutPreviewGridEl = document.querySelector('#cutPreviewGrid');
const resizeResultEmptyEl = document.querySelector('#resizeResultEmpty');
const resizeResultListEl = document.querySelector('#resizeResultList');
const resizeResultInfoEl = document.querySelector('#resizeResultInfo');
const resizeGenerateSelectedEl = document.querySelector('#resizeGenerateSelected');
const resizeMessageEl = document.querySelector('#resizeMessage');
const authGateEl = document.querySelector('#authGate');
const authFormEl = document.querySelector('#authForm');
const authTitleEl = document.querySelector('#authTitle');
const authUsernameEl = document.querySelector('#authUsername');
const authPasswordEl = document.querySelector('#authPassword');
const authSubmitEl = document.querySelector('#authSubmit');
const authToggleEl = document.querySelector('#authToggle');
const authMessageEl = document.querySelector('#authMessage');
const currentUserEl = document.querySelector('#currentUser');
const logoutButtonEl = document.querySelector('#logoutButton');
const appPageEl = document.querySelector('.page');
const canUseSettingsHere = true;

function preventPageZoom() {
  document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  ['gesturestart', 'gesturechange', 'gestureend'].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      event.preventDefault();
    });
  });
}

function syncKeyboardInset() {
  const viewport = window.visualViewport;
  const inset = viewport
    ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
    : 0;
  document.documentElement.style.setProperty('--keyboard-inset', `${Math.round(inset)}px`);
}

function initializeMobileViewportTracking() {
  syncKeyboardInset();
  window.visualViewport?.addEventListener('resize', syncKeyboardInset);
  window.visualViewport?.addEventListener('scroll', syncKeyboardInset);
  window.addEventListener('resize', syncKeyboardInset);

  const resync = () => {
    [0, 80, 180, 320].forEach((delay) => {
      window.setTimeout(syncKeyboardInset, delay);
    });
  };

  chatInputEl?.addEventListener('focus', () => {
    resync();
    window.setTimeout(() => {
      chatFormEl?.scrollIntoView({ block: 'end', inline: 'nearest' });
    }, 220);
  });

  chatInputEl?.addEventListener('blur', resync);
}

const selectedCount = 1;
const imageTaskPollAttempts = 75;
let selectedHistoryId = '';
let currentPreview = null;
let currentUser = null;
let authMode = 'login';
let pendingDeleteResolver = null;
let hasSavedImageApiKey = false;
let referenceImages = [];
let referenceDragId = '';
let historyItems = [];
let lastHistorySnapshot = [];
let selectedGalleryIds = new Set();
let pendingGenerationItems = [];
const transparentLayerCache = new Map();
const promptGalleryStorageKey = 'huabuwan-prompt-gallery';
const promptGalleryDeletedSeedsKey = 'huabuwan-prompt-gallery-deleted-seeds';
const pendingGenerationStoragePrefix = 'huabuwan-pending-generations';
const defaultPromptCategories = [
  'Marketing Visuals',
];
const defaultPromptGallerySeeds = [
  {
    id: 'seed-meituan-children-day',
    title: '美团六一福利开屏页',
    category: 'Marketing Visuals',
    imageDataUrl: '/assets/prompt-meituan-children-day.png',
    colorA: '#fff3b8',
    colorB: '#1ca7ff',
    label: 'MEITUAN',
    prompt: '趣味卡通标题：六一福利专场，全场低至5折起，产品放零食、鲜果、鲜榨果汁的图片, 美团风格海报，背景蓝天白云，带上美团吉祥物，产品不能太多，橙色标题，最上面是美团的白色logo，画面是吉祥物坐着热气球，产品放在热气球里面，比例9:16，仰视图，突出产品，注意是美团风格开屏页',
  },
];
const currentPromptGallerySeedIds = new Set(defaultPromptGallerySeeds.map((item) => item.id));
let resizeSourceObjectUrl = '';
let resizeSourceFile = null;
let activeResizeJobCount = 0;
let layerSourceObjectUrl = '';
let layerSourceFile = null;
let layerSourceDimensions = null;
let layerLastAnalysis = '';
let promptGalleryItems = [];
let promptGalleryImageDataUrl = '';
let editingPromptGalleryId = '';
let activePromptGalleryCategory = '全部';
let importantGalleryItems = [];
let importantGalleryImageDataUrl = '';
const restoredPendingTaskIds = new Set();
const defaultLayerResolution = '2k';
let modalMode = 'history';
let cutoutPreviewIndex = -1;
let chatMessages = [];
let chatImageAttachments = [];
let activeChatPresetId = localStorage.getItem('huabuwan-chat-preset') || 'general';
let chatPresetMenuTargetId = '';
let chatPresetEditorTargetId = '';
const defaultChatModel = 'gpt-5.4-mini';
const chatModelPresets = [
  'gpt-5.2',
  'gpt-5.2-pro',
  'gpt-5.3-codex',
  'gpt-5.3-codex-spark',
  'gpt-5.4-2026-03-05',
  defaultChatModel,
  'gpt-5.5',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
  'gemini-3-flash-c',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite-preview',
  'gemini-3.1-pro-high-c',
  'gemini-3.1-pro-low-c',
  'gemini-3.1-pro-preview',
  'gemini-3.5-flash',
];
const chatCustomPresetStorageKey = 'huabuwan-chat-custom-preset';
const chatPresetOverridesStorageKey = 'huabuwan-chat-preset-overrides';
const chatPresetDeletedStorageKey = 'huabuwan-chat-preset-deleted';
function isOfficialFallbackEnabled() {
  return Boolean(officialFallbackEl?.checked);
}
const chatPresetConfigs = {
  general: {
    label: '通用聊天',
    description: '日常问答、整理想法',
    prompt: '',
  },
  translator: {
    label: '英语翻译',
    description: '你输入什么，就翻译成英文',
    prompt: '你是一个中译英翻译工具。用户接下来输入任何中文、混合语言或口语内容，你都只需要翻译成自然、准确、适合日常和商务沟通的英文。不要解释，不要加引号，不要输出中文，除非用户明确要求解释。',
  },
  photographer: {
    label: '专业摄影设计师',
    description: '画面、光影、构图建议',
    prompt: '你是一位专业摄影设计师和视觉顾问。回答时重点从构图、光影、色彩、镜头语言、画面层次、商业视觉效果和可执行调整建议出发，语言简洁，给出能直接落地的方案。',
  },
  copywriter: {
    label: '文案策划师',
    description: '标题、卖点、活动文案',
    prompt: '你是一位资深文案策划师。擅长提炼卖点、标题、短视频口播、活动文案、电商详情页和社媒内容。回答时给出清晰结构、多个可选版本和能直接复制使用的文案。',
  },
  youtube: {
    label: 'YouTube 百万博主',
    description: '选题、脚本、爆款结构',
    prompt: '你是一位 YouTube 百万级博主和内容策划。擅长选题、标题、封面钩子、脚本结构、留存节奏和变现思路。回答时以增长和观众留存为核心，给出具体可执行方案。',
  },
  custom: {
    label: '自定义角色',
    prompt: '',
  },
};

const cutoutState = {
  template: null,
  masks: [],
  templateLayers: [],
  selectedTemplateLayerId: '',
  photos: [],
  currentPhotoIndex: -1,
  activeLayer: 'mask',
  previews: [],
  drawing: null,
  selectedIndex: -1,
  interaction: null,
  zoom: 1,
  pan: null,
};

const iconRedrawState = {
  source: null,
  sourceDataUrl: '',
  sourceName: '',
  selections: [],
  drawing: null,
  referenceDataUrl: '',
  view: {
    scale: 1,
    zoom: 1,
    x: 0,
    y: 0,
    isPanning: false,
    lastX: 0,
    lastY: 0,
    spaceDown: false,
  },
};

const imageEditState = {
  source: null,
  sourceDataUrl: '',
  sourceName: '',
  mode: 'mask',
  drawing: false,
  lastPoint: null,
  maskCanvas: document.createElement('canvas'),
  outpaint: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    interaction: null,
  },
  view: {
    scale: 1,
    x: 0,
    y: 0,
    isPanning: false,
    lastX: 0,
    lastY: 0,
    spaceDown: false,
  },
};

const modalView = {
  scale: 1,
  x: 0,
  y: 0,
  isPanning: false,
  lastX: 0,
  lastY: 0,
};

const superAiAspectOptions = [
  { value: 'square', label: '方图 1:1', resolutions: ['1k', '2k', '4k'] },
  { value: 'widescreen', label: '宽屏 16:9', resolutions: ['2k', '4k'] },
  { value: 'story', label: '竖屏 9:16', resolutions: ['2k', '4k'] },
  { value: 'landscape', label: '横图 4:3', resolutions: ['1k', '2k', '4k'] },
  { value: 'portrait', label: '竖图 3:4', resolutions: ['1k', '2k', '4k'] },
  { value: 'classic', label: '横图 3:2', resolutions: ['1k', '2k', '4k'] },
  { value: 'verticalClassic', label: '竖图 2:3', resolutions: ['1k', '2k', '4k'] },
  { value: 'fiveFour', label: '横图 5:4', resolutions: ['1k', '2k', '4k'] },
  { value: 'fourFive', label: '竖图 4:5', resolutions: ['1k', '2k', '4k'] },
  { value: 'tripleWide', label: '横长 3:1', resolutions: ['2k', '4k'] },
  { value: 'tripleTall', label: '竖长 1:3', resolutions: ['2k', '4k'] },
  { value: 'panorama', label: '宽幅 2:1', resolutions: ['2k', '4k'] },
  { value: 'tall', label: '长图 1:2', resolutions: ['2k', '4k'] },
  { value: 'cinema', label: '电影 21:9', resolutions: ['2k', '4k'] },
  { value: 'verticalCinema', label: '竖长 9:21', resolutions: ['2k', '4k'] },
];

const customSelects = new Map();
const aspectRatioDisplayOrder = [
  'square',
  'widescreen',
  'landscape',
  'classic',
  'fiveFour',
  'tripleWide',
  'panorama',
  'cinema',
  'story',
  'portrait',
  'verticalClassic',
  'fourFive',
  'tripleTall',
  'tall',
  'verticalCinema',
];
const promptOptimizationText = '无噪点，干净画面，平滑过渡，无颗粒感，锐利清晰，摄影级画质，高细节，无压缩无噪点。';
const promptOptimizationPresets = {
  clean: promptOptimizationText,
  photo: '写实摄影质感，自然光影，真实材质，镜头景深，细节清晰，色彩干净，高级商业摄影画质。',
  product: '商品主体突出，干净高级背景，柔和棚拍光，精致阴影，构图留白合理，适合电商海报。',
  illustration: '角色轮廓清晰，表情生动，服装和道具细节丰富，色彩统一，画面干净，插画完成度高。',
  icon: '图标线条清晰，边缘干净，统一粗细，简洁高识别度，居中构图，适合 UI 图标使用。',
  background: '背景简洁干净，主体周围保留呼吸感，避免杂乱元素，留出文字排版空间，整体高级清爽。',
};
const iconRedrawPromptPresets = {
  icon: '高清重绘这些 icon，黑白的就行',
  element: '局部重绘所选元素，保持和原图风格、线条粗细、光影细节一致，和周围画面自然衔接',
};

function setMessage(text, isError = false) {
  messageEl.textContent = '';
  messageEl.className = `message ${isError ? 'error' : ''}`;
  if (isError && text) {
    showErrorDetail(text);
  }
}

function getSelectedOption(select) {
  return select.options[select.selectedIndex] || select.options[0];
}

const aspectRatioIconMap = {
  square: [1, 1],
  widescreen: [16, 9],
  story: [9, 16],
  landscape: [4, 3],
  portrait: [3, 4],
  classic: [3, 2],
  verticalClassic: [2, 3],
  fiveFour: [5, 4],
  fourFive: [4, 5],
  tripleWide: [3, 1],
  tripleTall: [1, 3],
  panorama: [2, 1],
  tall: [1, 2],
  cinema: [21, 9],
  verticalCinema: [9, 21],
};

function shouldRenderAspectRatioIcon(select, option) {
  return select === aspectRatioEl && Object.prototype.hasOwnProperty.call(aspectRatioIconMap, option?.value);
}

function createAspectRatioIcon(value) {
  const icon = document.createElement('span');
  icon.className = 'aspect-ratio-icon';

  const ratio = aspectRatioIconMap[value];
  if (!ratio) {
    icon.classList.add('aspect-ratio-icon-auto');
    return icon;
  }

  const [width, height] = ratio;
  const maxWidth = 20;
  const maxHeight = 20;
  const scale = Math.min(maxWidth / width, maxHeight / height);
  icon.style.width = `${Math.max(7, Math.round(width * scale))}px`;
  icon.style.height = `${Math.max(7, Math.round(height * scale))}px`;
  return icon;
}

function createCustomSelectLabel(select, option) {
  const label = document.createDocumentFragment();

  if (shouldRenderAspectRatioIcon(select, option)) {
    label.append(createAspectRatioIcon(option.value));
  }

  const labelText = option?.textContent || select.value;
  const ratioMatch = shouldRenderAspectRatioIcon(select, option)
    ? labelText.match(/^(.*?)(\s+\d+:\d+)$/)
    : null;
  const text = document.createElement('span');
  text.className = 'custom-select-label-text';
  text.textContent = ratioMatch ? ratioMatch[1].trim() : labelText;
  label.append(text);

  if (ratioMatch) {
    const ratioText = document.createElement('span');
    ratioText.className = 'custom-select-ratio-text';
    ratioText.textContent = ratioMatch[2].trim();
    label.append(ratioText);
  }

  return label;
}

function closeCustomSelects(exceptSelect) {
  customSelects.forEach(({ root, trigger }, select) => {
    if (select !== exceptSelect) {
      root.classList.remove('open', 'drop-up');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function positionCustomSelectMenu(root, menu) {
  root.classList.remove('drop-up');
  const rect = root.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const belowSpace = viewportHeight - rect.bottom;
  const aboveSpace = rect.top;

  menu.style.maxHeight = '';
  const menuHeight = Math.min(menu.scrollHeight || 360, Math.round(viewportHeight * 0.58));

  if (belowSpace < menuHeight + 16 && aboveSpace > belowSpace) {
    root.classList.add('drop-up');
    menu.style.maxHeight = `${Math.max(180, Math.min(menuHeight, aboveSpace - 16))}px`;
    return;
  }

  menu.style.maxHeight = `${Math.max(180, Math.min(menuHeight, belowSpace - 16))}px`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function refreshCustomSelect(select) {
  const custom = customSelects.get(select);
  if (!custom) {
    return;
  }

  const { trigger, menu } = custom;
  const selected = getSelectedOption(select);
  const triggerLabel = trigger.querySelector('span');
  triggerLabel.replaceChildren(createCustomSelectLabel(select, selected));
  const isAspectRatioSelect = select === aspectRatioEl;
  trigger.classList.toggle('has-ratio-icon', shouldRenderAspectRatioIcon(select, selected));
  custom.root.classList.toggle('aspect-ratio-select', isAspectRatioSelect);
  menu.replaceChildren();

  const options = [...select.options].sort((a, b) => {
    if (!isAspectRatioSelect) {
      return 0;
    }

    const indexA = aspectRatioDisplayOrder.indexOf(a.value);
    const indexB = aspectRatioDisplayOrder.indexOf(b.value);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  options.forEach((option) => {
    if (isAspectRatioSelect && option.value === select.value) {
      return;
    }

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'custom-select-option';
    item.replaceChildren(createCustomSelectLabel(select, option));
    item.classList.toggle('has-ratio-icon', shouldRenderAspectRatioIcon(select, option));
    item.dataset.value = option.value;
    item.classList.toggle('active', option.value === select.value);
    item.addEventListener('click', () => {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      refreshCustomSelect(select);
      closeCustomSelects();
    });
    menu.append(item);
  });
}

function setupCustomSelect(select) {
  const root = document.createElement('div');
  root.className = 'custom-select';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = '<span></span><i aria-hidden="true"></i>';

  const menu = document.createElement('div');
  menu.className = 'custom-select-menu';
  menu.setAttribute('role', 'listbox');

  root.append(trigger, menu);
  select.classList.add('native-select-hidden');
  select.after(root);
  customSelects.set(select, { root, trigger, menu });

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = root.classList.contains('open');
    closeCustomSelects(select);
    root.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) {
      positionCustomSelectMenu(root, menu);
    }
  });

  select.addEventListener('change', () => refreshCustomSelect(select));
  refreshCustomSelect(select);
}

function syncAspectOptionsForResolution() {
  const resolution = resolutionEl.value || '1k';
  const currentValue = aspectRatioEl.value;
  const supportedOptions = superAiAspectOptions.filter((option) => option.resolutions.includes(resolution));

  aspectRatioEl.replaceChildren(...supportedOptions.map((option) => {
    const item = document.createElement('option');
    item.value = option.value;
    item.textContent = option.label;
    return item;
  }));

  if (supportedOptions.some((option) => option.value === currentValue)) {
    aspectRatioEl.value = currentValue;
  } else {
    aspectRatioEl.value = supportedOptions.some((option) => option.value === 'classic') ? 'classic' : 'square';
  }

  refreshCustomSelect(aspectRatioEl);
}

function syncIconRedrawPromptPreset() {
  if (!iconRedrawModeEl || !iconRedrawPromptEl) {
    return;
  }

  iconRedrawPromptEl.value = iconRedrawPromptPresets[iconRedrawModeEl.value] || iconRedrawPromptPresets.icon;
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    const title = text.match(/<title>(.*?)<\/title>/i)?.[1]?.trim();
    throw new Error(title ? `服务返回了网页错误页：${title}` : '服务返回了非 JSON 响应，请检查 Railway 部署日志。');
  }
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = authMode === 'register';
  authTitleEl.textContent = isRegister ? '注册账号' : '登录账号';
  authSubmitEl.textContent = isRegister ? '注册并登录' : '登录';
  authToggleEl.textContent = isRegister ? '已有账号，去登录' : '注册新账号';
  authPasswordEl.autocomplete = isRegister ? 'new-password' : 'current-password';
  authMessageEl.textContent = '';
  authMessageEl.className = 'api-key-status';
}

function showAuthGate() {
  currentUser = null;
  chatMessages = [];
  chatInputEl.value = '';
  authGateEl.hidden = false;
  appPageEl.hidden = true;
  authUsernameEl.focus();
}

function showAppForUser(user) {
  currentUser = user;
  authGateEl.hidden = true;
  appPageEl.hidden = false;
  currentUserEl.textContent = user?.username ? `@${user.username}` : '';

  if (!window.location.hash) {
    if (isMobileViewport()) {
      showChatPage();
    } else {
      showGeneratorPage();
    }
  }
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 760px)').matches;
}

function normalizeInitialMobileRoute() {
  if (!isMobileViewport()) {
    return;
  }

  const route = window.location.hash.replace(/^#/, '');
  if (!route || route === 'settings') {
    window.history.replaceState(null, '', '#chat');
  }
}

async function fetchCurrentUser() {
  const response = await fetch('/api/auth/me');
  const data = await readJsonResponse(response);
  return data.user || null;
}

async function requireSignedIn() {
  const user = await fetchCurrentUser();
  if (!user) {
    showAuthGate();
    return false;
  }

  showAppForUser(user);
  return true;
}

async function checkStatus() {
  try {
    const response = await fetch('/api/health');
    if (response.status === 401) {
      showAuthGate();
      return;
    }
    const data = await readJsonResponse(response);
    if (data.user) {
      showAppForUser(data.user);
    }
    hasSavedImageApiKey = Boolean(data.hasApiKey);
    modelEl.value = data.model || 'gpt-image-2';
    refreshCustomSelect(modelEl);
    imageModelInputEl.value = data.model || 'gpt-image-2';
    updateChatModelOptions(chatModelPresets, data.chatModel || defaultChatModel);
    chatModelInputSettingsEl.value = data.chatModel || defaultChatModel;
    syncChatModelInputs(data.chatModel || defaultChatModel);
    baseUrlInputEl.value = data.baseUrl || 'https://superaiapi.com/v1';
    apiEntryNameInputEl.value = data.apiEntryName || '';
    apiKeyBoxEl.hidden = false;

    if (data.hasApiKey) {
      setMessage('API 已配置，可以生成图片。');
      apiKeyStatusEl.textContent = '已保存 API key，可以直接生成图片。';
      apiKeyStatusEl.className = 'api-key-status ok';
      saveApiKeyEl.textContent = '已保存';
      return;
    }

    if (canUseSettingsHere && data.canEditApiKey) {
      setMessage('缺少 API Key，请先在 API 设置里保存。', true);
      apiKeyStatusEl.textContent = '还没有保存 API key。';
      apiKeyStatusEl.className = 'api-key-status error';
      saveApiKeyEl.textContent = '保存';
      return;
    }

    setMessage(`缺少 API Key。请在这台电脑打开 ${window.location.origin} 保存。`, true);
  } catch {
    setMessage('服务异常，请确认 node server.js 正在运行。', true);
  }
}

function updateModelOptions(models, preferredModels = []) {
  const currentModel = modelEl.value || 'gpt-image-2';
  const uniqueModels = [...new Set([currentModel, ...models].filter(Boolean))];
  modelEl.replaceChildren();

  uniqueModels.forEach((model) => {
    const option = document.createElement('option');
    option.value = model;
    option.textContent = model;
    modelEl.append(option);
  });

  modelEl.value = preferredModels.length > 0 && !preferredModels.includes(currentModel)
    ? preferredModels[0]
    : currentModel;
  refreshCustomSelect(modelEl);

}

function setChatMessage(text, isError = false) {
  void text;
  void isError;
}

function setChatCustomPresetStatus(text = '', isError = false) {
  if (!chatCustomPresetStatusEl) {
    return;
  }
  chatCustomPresetStatusEl.textContent = text;
  chatCustomPresetStatusEl.classList.toggle('error', Boolean(isError));
}

function getChatCustomPresetPrompt() {
  return String(chatCustomPresetEl?.value || '').trim();
}

function getSavedChatCustomPresetPrompt() {
  return String(localStorage.getItem(chatCustomPresetStorageKey) || '').trim();
}

function getChatPresetOverrides() {
  try {
    return JSON.parse(localStorage.getItem(chatPresetOverridesStorageKey) || '{}') || {};
  } catch {
    return {};
  }
}

function saveChatPresetOverride(presetId, override) {
  const overrides = getChatPresetOverrides();
  overrides[presetId] = override;
  localStorage.setItem(chatPresetOverridesStorageKey, JSON.stringify(overrides));
}

function clearChatPresetOverride(presetId) {
  const overrides = getChatPresetOverrides();
  delete overrides[presetId];
  localStorage.setItem(chatPresetOverridesStorageKey, JSON.stringify(overrides));
}

function getDeletedChatPresetIds() {
  try {
    const deletedIds = JSON.parse(localStorage.getItem(chatPresetDeletedStorageKey) || '[]');
    return Array.isArray(deletedIds) ? deletedIds : [];
  } catch {
    return [];
  }
}

function saveDeletedChatPresetIds(deletedIds) {
  localStorage.setItem(chatPresetDeletedStorageKey, JSON.stringify([...new Set(deletedIds)]));
}

function restoreChatPresetId(presetId) {
  saveDeletedChatPresetIds(getDeletedChatPresetIds().filter((deletedId) => deletedId !== presetId));
}

function isChatPresetDeleted(presetId) {
  return getDeletedChatPresetIds().includes(presetId);
}

function hasSavedChatCustomPreset() {
  return Boolean(getSavedChatCustomPresetPrompt());
}

function getChatCustomPresetDescription() {
  const customOverride = getChatPresetOverrides().custom;
  if (customOverride?.description) {
    return customOverride.description;
  }

  const prompt = getSavedChatCustomPresetPrompt() || getChatCustomPresetPrompt();
  return prompt.length > 28 ? `${prompt.slice(0, 28)}...` : prompt || '使用你保存的角色设定';
}

function getFirstAvailableChatPresetId() {
  const deletedIds = new Set(getDeletedChatPresetIds());
  const firstButton = chatPresetButtons.find((button) => {
    const presetId = button.dataset.chatPreset || 'general';
    return !deletedIds.has(presetId) && (presetId !== 'custom' || hasSavedChatCustomPreset());
  });
  return firstButton?.dataset.chatPreset || 'custom';
}

function getChatPresetConfig(presetId) {
  const baseConfig = chatPresetConfigs[presetId] || chatPresetConfigs.general;
  const override = getChatPresetOverrides()[presetId];
  return override ? { ...baseConfig, ...override } : baseConfig;
}

function getActiveChatPreset() {
  if (activeChatPresetId === 'custom') {
    const customConfig = getChatPresetConfig('custom');
    return {
      label: customConfig.label,
      prompt: getChatCustomPresetPrompt() || getSavedChatCustomPresetPrompt(),
    };
  }

  return getChatPresetConfig(activeChatPresetId);
}

function renderChatPresetSelection() {
  if (activeChatPresetId !== 'custom' && isChatPresetDeleted(activeChatPresetId)) {
    activeChatPresetId = getFirstAvailableChatPresetId();
    localStorage.setItem('huabuwan-chat-preset', activeChatPresetId);
  }

  const activePreset = getActiveChatPreset();
  const deletedIds = new Set(getDeletedChatPresetIds());
  chatPresetButtons.forEach((button) => {
    const presetId = button.dataset.chatPreset || 'general';
    const isCustomPreset = presetId === 'custom';
    button.hidden = deletedIds.has(presetId) || (isCustomPreset && !hasSavedChatCustomPreset());
    const preset = getChatPresetConfig(presetId);
    const label = button.querySelector('strong');
    const description = button.querySelector('span');
    if (label) {
      label.textContent = preset.label;
    }
    if (description) {
      description.textContent = isCustomPreset
        ? getChatCustomPresetDescription()
        : preset.description || '';
    }
    button.classList.toggle('active', button.dataset.chatPreset === activeChatPresetId);
  });

  if (chatPresetStatusEl) {
    chatPresetStatusEl.textContent = activePreset.label;
  }
  if (chatMobileTitleEl) {
    chatMobileTitleEl.textContent = activePreset.label;
  }
}

function setActiveChatPreset(presetId) {
  const nextPresetId = chatPresetConfigs[presetId] && !isChatPresetDeleted(presetId)
    ? presetId
    : getFirstAvailableChatPresetId();
  activeChatPresetId = nextPresetId;
  localStorage.setItem('huabuwan-chat-preset', activeChatPresetId);
  renderChatPresetSelection();
}

function initializeChatPresets() {
  if (chatCustomPresetEl) {
    chatCustomPresetEl.value = getSavedChatCustomPresetPrompt();
  }

  if (activeChatPresetId === 'custom' && !getChatCustomPresetPrompt() && !getSavedChatCustomPresetPrompt()) {
    activeChatPresetId = 'general';
  }

  if (activeChatPresetId !== 'custom' && isChatPresetDeleted(activeChatPresetId)) {
    activeChatPresetId = getFirstAvailableChatPresetId();
    localStorage.setItem('huabuwan-chat-preset', activeChatPresetId);
  }

  renderChatPresetSelection();
}

function saveChatCustomPreset({ activate = false, closeTools = false } = {}) {
  const prompt = getChatCustomPresetPrompt();
  if (!prompt) {
    setChatCustomPresetStatus('先输入自定义角色描述。', true);
    chatCustomPresetEl?.focus();
    return false;
  }

  localStorage.setItem(chatCustomPresetStorageKey, prompt);
  restoreChatPresetId('custom');
  if (activate) {
    setActiveChatPreset('custom');
    setChatCustomPresetStatus('已启用自定义角色。');
  } else {
    renderChatPresetSelection();
    setChatCustomPresetStatus('已保存。');
  }

  if (closeTools) {
    setMobileChatToolsOpen(false);
  }
  chatInputEl?.focus();
  return true;
}

function setMobileChatToolsOpen(isOpen) {
  chatPageEl?.classList.toggle('chat-tools-page-open', Boolean(isOpen));
  chatToolToggleEl?.setAttribute('aria-expanded', String(Boolean(isOpen)));
}

function closeChatPresetMenu() {
  chatPresetMenuTargetId = '';
  if (chatPresetMenuEl) {
    chatPresetMenuEl.hidden = true;
  }
}

function openChatPresetMenu(event, presetId) {
  if (!chatPresetMenuEl || !presetId) {
    return;
  }

  event.preventDefault();
  chatPresetMenuTargetId = presetId;
  chatPresetMenuEl.hidden = false;

  const menuRect = chatPresetMenuEl.getBoundingClientRect();
  const panelRect = chatPresetMenuEl.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
  const left = Math.min(
    Math.max(event.clientX - panelRect.left, 8),
    Math.max(8, panelRect.width - menuRect.width - 8),
  );
  const top = Math.min(
    Math.max(event.clientY - panelRect.top, 8),
    Math.max(8, panelRect.height - menuRect.height - 8),
  );

  chatPresetMenuEl.style.left = `${left}px`;
  chatPresetMenuEl.style.top = `${top}px`;
}

function closeChatPresetEditor() {
  chatPresetEditorTargetId = '';
  if (chatPresetEditorEl) {
    chatPresetEditorEl.hidden = true;
  }
}

function openChatPresetEditor(presetId) {
  const current = getChatPresetConfig(presetId);
  if (!chatPresetEditorEl || !chatPresetEditLabelEl || !chatPresetEditDescriptionEl || !chatPresetEditPromptEl) {
    return;
  }

  chatPresetEditorTargetId = presetId;
  chatPresetEditLabelEl.value = current.label || '';
  chatPresetEditDescriptionEl.value = current.description || '';
  chatPresetEditPromptEl.value = presetId === 'custom'
    ? getSavedChatCustomPresetPrompt()
    : current.prompt || '';
  chatPresetEditorEl.hidden = false;
  closeChatPresetMenu();
  chatPresetEditLabelEl.focus();
  chatPresetEditLabelEl.select();
}

function deleteChatPreset(presetId) {
  if (presetId === 'custom') {
    localStorage.removeItem(chatCustomPresetStorageKey);
    clearChatPresetOverride(presetId);
    chatCustomPresetEl.value = '';
    setChatCustomPresetStatus('已删除自定义角色。');
    if (activeChatPresetId === presetId) {
      activeChatPresetId = getFirstAvailableChatPresetId();
      localStorage.setItem('huabuwan-chat-preset', activeChatPresetId);
    }
    renderChatPresetSelection();
    closeChatPresetMenu();
    return;
  }

  const deletedIds = getDeletedChatPresetIds();
  saveDeletedChatPresetIds([...deletedIds, presetId]);
  clearChatPresetOverride(presetId);
  if (activeChatPresetId === presetId) {
    activeChatPresetId = getFirstAvailableChatPresetId();
    localStorage.setItem('huabuwan-chat-preset', activeChatPresetId);
  }
  renderChatPresetSelection();
  closeChatPresetMenu();
}

function saveChatPresetEditor() {
  if (!chatPresetEditorTargetId) {
    return;
  }

  const current = getChatPresetConfig(chatPresetEditorTargetId);
  if (chatPresetEditorTargetId === 'custom') {
    const prompt = chatPresetEditPromptEl.value.trim();
    if (!prompt) {
      chatPresetEditPromptEl.focus();
      return;
    }
    localStorage.setItem(chatCustomPresetStorageKey, prompt);
    restoreChatPresetId('custom');
  }

  saveChatPresetOverride(chatPresetEditorTargetId, {
    label: chatPresetEditLabelEl.value.trim() || current.label,
    description: chatPresetEditDescriptionEl.value.trim() || current.description || '',
    prompt: chatPresetEditPromptEl.value.trim(),
  });
  renderChatPresetSelection();
  closeChatPresetEditor();
}

function syncChatInputSize() {
  chatInputEl.style.height = 'auto';
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  const minHeight = isMobile ? 46 : 56;
  const maxHeight = isMobile ? 164 : 220;
  const styles = window.getComputedStyle(chatInputEl);
  const lineHeight = Number.parseFloat(styles.lineHeight) || (isMobile ? 22 : 24);
  const shouldExpand = chatInputEl.value.includes('\n') || chatInputEl.scrollHeight > minHeight + lineHeight * 1.6;
  const nextHeight = shouldExpand
    ? Math.min(maxHeight, Math.max(minHeight, chatInputEl.scrollHeight))
    : minHeight;
  chatInputEl.style.height = `${nextHeight}px`;
  chatInputEl.style.overflowY = chatInputEl.scrollHeight > maxHeight ? 'auto' : 'hidden';
  chatFormEl.classList.toggle('chat-composer-expanded', shouldExpand);
}

function renderChatImagePreview() {
  chatImagePreviewEl.replaceChildren();

  if (!chatImageAttachments.length) {
    chatImagePreviewEl.hidden = true;
    return;
  }

  chatImageAttachments.forEach((attachment, index) => {
    const item = document.createElement('div');
    item.className = 'chat-image-preview-item';

    const thumb = document.createElement('div');
    thumb.className = 'chat-image-thumb';

    const image = document.createElement('img');
    image.src = attachment.dataUrl;
    image.alt = attachment.name;
    makeImageOpenable(image, attachment.dataUrl, attachment.name || '上传图片预览');

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'chat-image-remove';
    removeButton.setAttribute('aria-label', `删除 ${attachment.name}`);
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
      removeChatImageAttachment(index);
    });

    thumb.append(image, removeButton);

    item.append(thumb);
    chatImagePreviewEl.append(item);
  });
  chatImagePreviewEl.hidden = false;
}

function clearChatImageAttachment() {
  chatImageAttachments = [];
  chatImageInputEl.value = '';
  renderChatImagePreview();
}

function removeChatImageAttachment(index) {
  chatImageAttachments = chatImageAttachments.filter((_, itemIndex) => itemIndex !== index);
  if (!chatImageAttachments.length) {
    chatImageInputEl.value = '';
  }
  renderChatImagePreview();
}

function sanitizeMarkdownLink(href) {
  try {
    const url = new URL(href, window.location.href);
    if (['http:', 'https:', 'mailto:'].includes(url.protocol)) {
      return url.href;
    }
  } catch {
    // Ignore invalid URLs.
  }
  return '#';
}

function appendMarkdownInline(parent, text) {
  if (!text) {
    return;
  }

  const tokenPattern = /(`[^`]*`|\[[^\]\n]+\]\([^)]+\)|\*\*[\s\S]+?\*\*|__[\s\S]+?__|~~[\s\S]+?~~|\*[^*\n]+?\*|_[^_\n]+?_)/g;
  let lastIndex = 0;
  let match;

  const appendText = (value) => {
    if (value) {
      parent.append(document.createTextNode(value));
    }
  };

  while ((match = tokenPattern.exec(text))) {
    appendText(text.slice(lastIndex, match.index));
    const token = match[0];

    if (token.startsWith('`') && token.endsWith('`')) {
      const code = document.createElement('code');
      code.textContent = token.slice(1, -1);
      parent.append(code);
    } else if ((token.startsWith('**') && token.endsWith('**')) || (token.startsWith('__') && token.endsWith('__'))) {
      const strong = document.createElement('strong');
      appendMarkdownInline(strong, token.slice(2, -2));
      parent.append(strong);
    } else if (token.startsWith('~~') && token.endsWith('~~')) {
      const del = document.createElement('del');
      appendMarkdownInline(del, token.slice(2, -2));
      parent.append(del);
    } else if ((token.startsWith('*') && token.endsWith('*')) || (token.startsWith('_') && token.endsWith('_'))) {
      const em = document.createElement('em');
      appendMarkdownInline(em, token.slice(1, -1));
      parent.append(em);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const link = document.createElement('a');
        link.href = sanitizeMarkdownLink(linkMatch[2].trim());
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        appendMarkdownInline(link, linkMatch[1]);
        parent.append(link);
      } else {
        appendText(token);
      }
    }

    lastIndex = tokenPattern.lastIndex;
  }

  appendText(text.slice(lastIndex));
}

function buildMarkdownParagraph(lines) {
  const p = document.createElement('p');
  lines.forEach((line, index) => {
    if (index > 0) {
      p.append(document.createElement('br'));
    }
    appendMarkdownInline(p, line);
  });
  return p;
}

function isTableDivider(line) {
  return /^\s*\|?[\s:-]+(\|[\s:-]+)+\|?\s*$/.test(line);
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function buildMarkdownTable(lines) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  splitTableRow(lines[0]).forEach((cell) => {
    const th = document.createElement('th');
    appendMarkdownInline(th, cell);
    headerRow.append(th);
  });
  thead.append(headerRow);

  lines.slice(2).forEach((line) => {
    const row = document.createElement('tr');
    splitTableRow(line).forEach((cell) => {
      const td = document.createElement('td');
      appendMarkdownInline(td, cell);
      row.append(td);
    });
    tbody.append(row);
  });

  table.append(thead, tbody);
  return table;
}

function buildMarkdownBlockquote(lines) {
  const blockquote = document.createElement('blockquote');
  lines.forEach((line, index) => {
    if (index > 0) {
      blockquote.append(document.createElement('br'));
    }
    appendMarkdownInline(blockquote, line.replace(/^\s*>\s?/, ''));
  });
  return blockquote;
}

function renderMarkdownContent(text, { streaming = false } = {}) {
  const root = document.createElement('div');
  root.className = 'chat-markdown';
  if (streaming) {
    root.classList.add('streaming');
  }

  const lines = String(text || '').replace(/\r\n/g, '\n').split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = Math.min(6, headingMatch[1].length + 1);
      const heading = document.createElement(`h${level}`);
      appendMarkdownInline(heading, headingMatch[2]);
      root.append(heading);
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      root.append(document.createElement('hr'));
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i]);
        i += 1;
      }
      root.append(buildMarkdownBlockquote(quoteLines));
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const list = document.createElement('ul');
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        const item = document.createElement('li');
        appendMarkdownInline(item, lines[i].replace(/^\s*[-*+]\s+/, ''));
        list.append(item);
        i += 1;
      }
      root.append(list);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const list = document.createElement('ol');
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const item = document.createElement('li');
        appendMarkdownInline(item, lines[i].replace(/^\s*\d+\.\s+/, ''));
        list.append(item);
        i += 1;
      }
      root.append(list);
      continue;
    }

    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        i += 1;
      }

      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = codeLines.join('\n');
      pre.append(code);
      root.append(pre);
      continue;
    }

    if (
      line.trim().startsWith('|')
      && i + 1 < lines.length
      && isTableDivider(lines[i + 1])
    ) {
      const tableLines = [line, lines[i + 1]];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i += 1;
      }
      root.append(buildMarkdownTable(tableLines));
      continue;
    }

    const paragraphLines = [line];
    i += 1;
    while (
      i < lines.length
      && lines[i].trim()
      && !/^(#{1,6})\s+/.test(lines[i])
      && !/^>\s?/.test(lines[i])
      && !/^\s*[-*+]\s+/.test(lines[i])
      && !/^\s*\d+\.\s+/.test(lines[i])
      && !lines[i].trim().startsWith('```')
      && !(lines[i].trim().startsWith('|') && i + 1 < lines.length && isTableDivider(lines[i + 1]))
      && !/^---+$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i]);
      i += 1;
    }

    root.append(buildMarkdownParagraph(paragraphLines));
  }

  if (!root.childNodes.length) {
    const p = document.createElement('p');
    p.textContent = text || '';
    root.append(p);
  }

  if (streaming) {
    const cursor = document.createElement('span');
    cursor.className = 'chat-stream-cursor';
    root.append(cursor);
  }

  return root;
}

function syncChatModelInputs(model) {
  const value = String(model || '').trim();
  if (!value) {
    return;
  }

  if (chatModelInputEl.tagName === 'SELECT' && ![...chatModelInputEl.options].some((option) => option.value === value)) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    chatModelInputEl.prepend(option);
  }

  chatModelInputEl.value = value;
  chatModelInputSettingsEl.value = value;
  refreshCustomSelect(chatModelInputEl);
}

function updateChatModelOptions(models = [], preferredModel = '') {
  const currentModel = chatModelInputEl.value.trim()
    || chatModelInputSettingsEl.value.trim()
    || preferredModel
    || defaultChatModel;
  const uniqueModels = [...new Set([currentModel, preferredModel, ...chatModelPresets, ...models].filter(Boolean))];

  if (chatModelInputEl.tagName === 'SELECT') {
    chatModelInputEl.replaceChildren();
    uniqueModels.forEach((model) => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      chatModelInputEl.append(option);
    });
    chatModelInputEl.value = currentModel;
  }

  chatModelOptionsEl.replaceChildren();

  uniqueModels.forEach((model) => {
    const option = document.createElement('option');
    option.value = model;
    chatModelOptionsEl.append(option);
  });

  if (!chatModelInputEl.value.trim()) {
    chatModelInputEl.value = currentModel;
  }

  if (!chatModelInputSettingsEl.value.trim()) {
    chatModelInputSettingsEl.value = currentModel;
  }

  refreshCustomSelect(chatModelInputEl);
}

async function copyTextToClipboard(text) {
  const value = String(text || '').trim();
  if (!value) {
    return false;
  }

  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

function createChatCopyButton(text) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'chat-copy-button';
  button.title = '复制';
  button.setAttribute('aria-label', '复制助手回复');
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 4h6a4 4 0 0 1 4 4v6"></path>
      <rect x="4" y="8" width="12" height="12" rx="3"></rect>
    </svg>
  `;

  button.addEventListener('click', async (event) => {
    event.stopPropagation();
    const copied = await copyTextToClipboard(text);
    if (!copied) {
      return;
    }

    button.classList.add('copied');
    button.setAttribute('aria-label', '已复制');
    button.title = '已复制';
    window.setTimeout(() => {
      button.classList.remove('copied');
      button.setAttribute('aria-label', '复制助手回复');
      button.title = '复制';
    }, 1200);
  });

  return button;
}

function setPromptGalleryMessage(text, isError = false) {
  promptGalleryMessageEl.textContent = text;
  promptGalleryMessageEl.className = `message ${isError ? 'error' : ''}`;
}

function readPromptGalleryItems() {
  try {
    const deletedSeedIds = new Set(JSON.parse(localStorage.getItem(promptGalleryDeletedSeedsKey) || '[]'));
    const seeded = defaultPromptGallerySeeds.map((item) => ({
      ...item,
      imageDataUrl: item.imageDataUrl || createPromptSeedImage(item),
      createdAt: new Date().toISOString(),
    })).filter((item) => !deletedSeedIds.has(item.id));
    const stored = localStorage.getItem(promptGalleryStorageKey);
    if (!stored) {
      localStorage.setItem(promptGalleryStorageKey, JSON.stringify(seeded));
      return seeded;
    }

    const items = JSON.parse(stored || '[]');
    if (!Array.isArray(items)) {
      return [];
    }

    const activeItems = items.filter((item) => !String(item?.id || '').startsWith('seed-')
      || currentPromptGallerySeedIds.has(item.id));
    const existingIds = new Set(items.map((item) => item.id));
    const missingSeeds = seeded.filter((item) => !existingIds.has(item.id) && !deletedSeedIds.has(item.id));
    const nextItems = missingSeeds.length ? [...missingSeeds, ...activeItems] : activeItems;

    if (missingSeeds.length || activeItems.length !== items.length) {
      localStorage.setItem(promptGalleryStorageKey, JSON.stringify(nextItems.slice(0, 40)));
    }

    return nextItems;
  } catch {
    return [];
  }
}

function createPromptSeedImage(item) {
  const title = String(item.title || 'Prompt').replace(/[<&>]/g, '');
  const label = String(item.label || 'IMAGE').replace(/[<&>]/g, '');
  const colorA = String(item.colorA || '#dbeafe');
  const colorB = String(item.colorB || '#0f766e');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${colorA}"/>
          <stop offset="1" stop-color="${colorB}"/>
        </linearGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="960" height="640" fill="url(#bg)"/>
      <rect width="960" height="640" fill="url(#grid)"/>
      <circle cx="740" cy="132" r="150" fill="rgba(255,255,255,.16)"/>
      <circle cx="176" cy="508" r="220" fill="rgba(0,0,0,.12)"/>
      <rect x="70" y="420" width="220" height="86" fill="rgba(0,0,0,.68)"/>
      <text x="100" y="475" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="8">${label}</text>
      <text x="70" y="96" fill="rgba(255,255,255,.94)" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800">${title}</text>
      <text x="72" y="146" fill="rgba(255,255,255,.76)" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="4">GPT IMAGE 2 PROMPT</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function savePromptGalleryItems() {
  localStorage.setItem(promptGalleryStorageKey, JSON.stringify(promptGalleryItems.slice(0, 40)));
}

function rememberDeletedPromptSeed(id) {
  if (!String(id || '').startsWith('seed-')) {
    return;
  }

  try {
    const deletedSeedIds = new Set(JSON.parse(localStorage.getItem(promptGalleryDeletedSeedsKey) || '[]'));
    deletedSeedIds.add(id);
    localStorage.setItem(promptGalleryDeletedSeedsKey, JSON.stringify([...deletedSeedIds]));
  } catch {}
}

function clearPromptGalleryForm() {
  editingPromptGalleryId = '';
  promptGalleryTitleEl.value = '';
  promptGalleryCategoryEl.value = '';
  promptGalleryPromptEl.value = '';
  promptGalleryImageEl.value = '';
  promptGalleryImageDataUrl = '';
  promptGalleryImagePreviewEl.hidden = true;
  promptGalleryImagePreviewEl.replaceChildren();
  togglePromptGalleryFormEl.textContent = '添加 Prompt';
  savePromptGalleryItemEl.querySelector('span').textContent = '保存 Prompt';
  cancelPromptGalleryFormEl.textContent = '取消';
}

function renderPromptGalleryImagePreview(dataUrl) {
  promptGalleryImagePreviewEl.replaceChildren();

  if (!dataUrl) {
    promptGalleryImagePreviewEl.hidden = true;
    return;
  }

  const image = document.createElement('img');
  image.src = dataUrl;
  image.alt = 'Prompt 对应图片预览';
  makeImageOpenable(image, dataUrl, 'Prompt 图片预览');
  promptGalleryImagePreviewEl.append(image);
  promptGalleryImagePreviewEl.hidden = false;
}

function editPromptGalleryItem(item) {
  editingPromptGalleryId = item.id || '';
  promptGalleryTitleEl.value = item.title || '';
  promptGalleryCategoryEl.value = item.category || '';
  promptGalleryPromptEl.value = item.prompt || '';
  promptGalleryImageEl.value = '';
  promptGalleryImageDataUrl = item.imageDataUrl || '';
  renderPromptGalleryImagePreview(promptGalleryImageDataUrl);
  promptSavePanelEl.hidden = false;
  togglePromptGalleryFormEl.textContent = '收起编辑';
  savePromptGalleryItemEl.querySelector('span').textContent = '保存修改';
  cancelPromptGalleryFormEl.textContent = '取消编辑';
  setPromptGalleryMessage('正在编辑这条 Prompt。');
  promptSavePanelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  promptGalleryTitleEl.focus({ preventScroll: true });
}

function getPromptGalleryCategories(items = promptGalleryItems) {
  return ['全部', ...new Set([
    ...defaultPromptCategories,
    ...items.map((item) => String(item.category || '').trim()).filter(Boolean),
  ])];
}

function renderPromptCategoryTabs() {
  const categories = getPromptGalleryCategories();
  if (!categories.includes(activePromptGalleryCategory)) {
    activePromptGalleryCategory = '全部';
  }

  promptCategoryTabsEl.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = category === activePromptGalleryCategory ? 'active' : '';
    button.textContent = category;
    button.addEventListener('click', () => {
      activePromptGalleryCategory = category;
      renderPromptGallery();
    });
    promptCategoryTabsEl.append(button);
  });
}

function renderPromptGallery() {
  promptGalleryItems = readPromptGalleryItems();
  renderPromptCategoryTabs();
  promptGalleryGridEl.replaceChildren();
  const visibleItems = activePromptGalleryCategory === '全部'
    ? promptGalleryItems
    : promptGalleryItems.filter((item) => item.category === activePromptGalleryCategory);
  promptGalleryCountEl.textContent = `${visibleItems.length} 条`;

  if (!visibleItems.length) {
    const empty = document.createElement('p');
    empty.className = 'history-empty';
    empty.textContent = promptGalleryItems.length
      ? '这个分类里还没有 Prompt。'
      : '还没有保存 Prompt。点击右上角添加一条。';
    promptGalleryGridEl.append(empty);
    return;
  }

  visibleItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'prompt-gallery-card';

    const media = document.createElement('div');
    media.className = 'prompt-gallery-media';
    const image = document.createElement('img');
    image.src = item.imageDataUrl;
    image.alt = item.title || 'Prompt 对应图片';
    makeImageOpenable(image, item.imageDataUrl, item.title || 'Prompt 图片预览');
    media.append(image);

    const body = document.createElement('div');
    body.className = 'prompt-gallery-card-body';

    const title = document.createElement('strong');
    title.textContent = item.title || '未命名 Prompt';

    const promptBox = document.createElement('div');
    promptBox.className = 'prompt-card-text';
    const promptText = document.createElement('p');
    promptText.textContent = item.prompt || '';
    const expandButton = document.createElement('button');
    expandButton.type = 'button';
    expandButton.textContent = '展开提示词';
    expandButton.addEventListener('click', () => {
      const expanded = promptBox.classList.toggle('expanded');
      expandButton.textContent = expanded ? '收起提示词' : '展开提示词';
    });
    promptBox.append(promptText, expandButton);

    const actions = document.createElement('div');
    actions.className = 'prompt-gallery-actions';

    const copyButton = document.createElement('button');
    copyButton.className = 'secondary-button compact-button';
    copyButton.type = 'button';
    copyButton.textContent = '复制';
    copyButton.addEventListener('click', async () => {
      const copied = await copyTextToClipboard(item.prompt);
      setPromptGalleryMessage(copied ? 'Prompt 已复制。' : '复制失败。', !copied);
    });

    const useButton = document.createElement('button');
    useButton.className = 'secondary-button compact-button';
    useButton.type = 'button';
    useButton.textContent = '去创作';
    useButton.addEventListener('click', () => {
      promptEl.value = item.prompt || '';
      showGeneratorPage();
      promptEl.focus({ preventScroll: true });
      setMessage('已填入 Prompt，可以直接生成。');
    });

    const editButton = document.createElement('button');
    editButton.className = 'secondary-button compact-button';
    editButton.type = 'button';
    editButton.textContent = '编辑';
    editButton.addEventListener('click', () => {
      editPromptGalleryItem(item);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'secondary-button compact-button danger-button';
    deleteButton.type = 'button';
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', () => {
      rememberDeletedPromptSeed(item.id);
      promptGalleryItems = promptGalleryItems.filter((entry) => entry.id !== item.id);
      savePromptGalleryItems();
      renderPromptGallery();
      setPromptGalleryMessage('已删除这条 Prompt。');
    });

    actions.append(copyButton, useButton, editButton, deleteButton);
    body.append(title, promptBox, actions);
    card.append(media, body);
    promptGalleryGridEl.append(card);
  });
}

async function savePromptGalleryItem() {
  const title = promptGalleryTitleEl.value.trim();
  const promptText = promptGalleryPromptEl.value.trim();
  const category = promptGalleryCategoryEl.value.trim() || 'Marketing Visuals';

  if (!title) {
    setPromptGalleryMessage('请输入名称。', true);
    promptGalleryTitleEl.focus();
    return;
  }

  if (!promptGalleryImageDataUrl) {
    setPromptGalleryMessage('请上传一张对应图片。', true);
    promptGalleryImageEl.focus();
    return;
  }

  if (!promptText) {
    setPromptGalleryMessage('请输入 Prompt。', true);
    promptGalleryPromptEl.focus();
    return;
  }

  const currentItems = readPromptGalleryItems();
  const existingItem = editingPromptGalleryId
    ? currentItems.find((entry) => entry.id === editingPromptGalleryId)
    : null;
  const item = {
    id: existingItem?.id || `prompt-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title,
    category,
    imageDataUrl: promptGalleryImageDataUrl,
    prompt: promptText,
    createdAt: existingItem?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  promptGalleryItems = existingItem
    ? currentItems.map((entry) => (entry.id === item.id ? item : entry)).slice(0, 40)
    : [item, ...currentItems].slice(0, 40);
  try {
    savePromptGalleryItems();
  } catch {
    setPromptGalleryMessage('保存失败，图片可能太大或本地存储已满。', true);
    return;
  }
  clearPromptGalleryForm();
  promptSavePanelEl.hidden = true;
  renderPromptGallery();
  setPromptGalleryMessage(existingItem ? 'Prompt 已更新。' : 'Prompt 已保存。');
}

function setImportantGalleryMessage(text, isError = false) {
  importantGalleryMessageEl.textContent = text || '';
  importantGalleryMessageEl.className = `message ${isError ? 'error' : ''}`;
}

function clearImportantGalleryForm() {
  importantGalleryTitleEl.value = '';
  importantGalleryCategoryEl.value = '';
  importantGalleryImageEl.value = '';
  importantGalleryImageDataUrl = '';
  importantGalleryImagePreviewEl.hidden = true;
  importantGalleryImagePreviewEl.replaceChildren();
  toggleImportantGalleryFormEl.textContent = '添加素材';
}

function renderImportantGalleryImagePreview(dataUrl) {
  importantGalleryImagePreviewEl.replaceChildren();

  if (!dataUrl) {
    importantGalleryImagePreviewEl.hidden = true;
    return;
  }

  const image = document.createElement('img');
  image.src = dataUrl;
  image.alt = '重要素材预览';
  makeImageOpenable(image, dataUrl, '重要素材预览');
  importantGalleryImagePreviewEl.append(image);
  importantGalleryImagePreviewEl.hidden = false;
}

async function loadImportantGallery() {
  const response = await fetch('/api/important-images');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || '读取重要图库失败');
  }
  importantGalleryItems = Array.isArray(data.items) ? data.items : [];
  renderImportantGallery();
}

function renderImportantGallery() {
  importantGalleryGridEl.replaceChildren();
  importantGalleryCountEl.textContent = `${importantGalleryItems.length} 张`;

  if (!importantGalleryItems.length) {
    const empty = document.createElement('p');
    empty.className = 'history-empty';
    empty.textContent = '还没有重要素材。点击右上角添加一张常用图片。';
    importantGalleryGridEl.append(empty);
    return;
  }

  importantGalleryItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'prompt-gallery-card important-gallery-card';

    const media = document.createElement('div');
    media.className = 'prompt-gallery-media';
    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.title || '重要素材';
    makeImageOpenable(image, item.imageUrl, item.title || '重要素材预览');
    media.append(image);

    const body = document.createElement('div');
    body.className = 'prompt-gallery-card-body';

    const title = document.createElement('strong');
    title.textContent = item.title || '未命名素材';

    const category = document.createElement('span');
    category.className = 'important-gallery-meta';
    category.textContent = item.category || '默认';

    const actions = document.createElement('div');
    actions.className = 'prompt-gallery-actions';

    const useButton = document.createElement('button');
    useButton.className = 'secondary-button compact-button';
    useButton.type = 'button';
    useButton.textContent = '去创作';
    useButton.addEventListener('click', async () => {
      useButton.disabled = true;
      useButton.textContent = '导入中...';
      try {
        const dataUrl = await urlToDataUrl(item.imageUrl);
        const extension = dataUrl.match(/^data:image\/([^;]+);base64,/i)?.[1]?.replace('jpeg', 'jpg') || 'png';
        const safeTitle = String(item.title || '重要素材').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 48) || '重要素材';
        const file = dataUrlToFile(dataUrl, `${safeTitle}.${extension}`);
        showGeneratorPage();
        await addReferenceFiles([file]);
        setMessage(`已把“${item.title || '重要素材'}”添加为参考图。`);
      } catch (error) {
        setImportantGalleryMessage(error.message || '导入创作页失败。', true);
      } finally {
        useButton.disabled = false;
        useButton.textContent = '去创作';
      }
    });

    const downloadLink = document.createElement('a');
    downloadLink.className = 'secondary-button compact-button';
    downloadLink.href = item.imageUrl;
    downloadLink.download = item.title || '重要素材';
    downloadLink.textContent = '下载';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'secondary-button compact-button danger-button';
    deleteButton.type = 'button';
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', async () => {
      deleteButton.disabled = true;
      deleteButton.textContent = '删除中...';
      try {
        const response = await fetch(`/api/important-images/${encodeURIComponent(item.id)}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || '删除失败');
        }
        importantGalleryItems = Array.isArray(data.items) ? data.items : importantGalleryItems.filter((entry) => entry.id !== item.id);
        renderImportantGallery();
        setImportantGalleryMessage('已删除这张素材。');
      } catch (error) {
        setImportantGalleryMessage(error.message || '删除失败。', true);
        deleteButton.disabled = false;
        deleteButton.textContent = '删除';
      }
    });

    actions.append(useButton, downloadLink, deleteButton);
    body.append(title, category, actions);
    card.append(media, body);
    importantGalleryGridEl.append(card);
  });
}

async function saveImportantGalleryItem() {
  const title = importantGalleryTitleEl.value.trim();
  const category = importantGalleryCategoryEl.value.trim() || '默认';

  if (!title) {
    setImportantGalleryMessage('请输入素材名称。', true);
    importantGalleryTitleEl.focus();
    return;
  }

  if (!importantGalleryImageDataUrl) {
    setImportantGalleryMessage('请上传一张图片素材。', true);
    importantGalleryImageEl.focus();
    return;
  }

  saveImportantGalleryItemEl.disabled = true;
  saveImportantGalleryItemEl.querySelector('span').textContent = '保存中...';

  try {
    const response = await fetch('/api/important-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        dataUrl: importantGalleryImageDataUrl,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || '保存重要素材失败');
    }
    importantGalleryItems = Array.isArray(data.items) ? data.items : [data.item, ...importantGalleryItems].filter(Boolean);
    clearImportantGalleryForm();
    importantSavePanelEl.hidden = true;
    renderImportantGallery();
    setImportantGalleryMessage('素材已保存。');
  } catch (error) {
    setImportantGalleryMessage(error.message || '保存重要素材失败。', true);
  } finally {
    saveImportantGalleryItemEl.disabled = false;
    saveImportantGalleryItemEl.querySelector('span').textContent = '保存素材';
  }
}

function renderChatTranscript() {
  chatTranscriptEl.replaceChildren();

  if (!chatMessages.length) {
    if (window.matchMedia('(max-width: 760px)').matches) {
      const bubble = document.createElement('article');
      bubble.className = 'assistant chat-bubble chat-empty-state';

      const role = document.createElement('span');
      role.className = 'chat-bubble-role';
      role.textContent = '助手';
      bubble.append(role);

      const content = document.createElement('p');
      content.textContent = '我已经准备好了。输入消息开始对话吧！';
      bubble.append(content);
      chatTranscriptEl.append(bubble);
    }
    return;
  }

  chatMessages.forEach((message) => {
    const bubble = document.createElement('article');
    bubble.className = `${message.role === 'assistant' ? 'assistant' : 'user'} chat-bubble`;
    bubble.classList.toggle('streaming', Boolean(message.streaming));
    bubble.classList.toggle('error', Boolean(message.error));

    const head = document.createElement('div');
    head.className = 'chat-bubble-head';

    const role = document.createElement('span');
    role.className = 'chat-bubble-role';
    role.textContent = message.role === 'assistant' ? '助手' : '你';
    head.append(role);

    if (message.role === 'assistant' && !message.thinking && !message.streaming && message.content) {
      head.append(createChatCopyButton(message.content));
    }

    bubble.append(head);

    if (message.images?.length) {
      const images = document.createElement('div');
      images.className = 'chat-bubble-images';
      message.images.forEach((item) => {
        const image = document.createElement('img');
        image.src = item.dataUrl || item.url;
        image.alt = item.name || '上传图片';
        makeImageOpenable(image, image.src, item.name || '上传图片预览');
        images.append(image);
      });
      bubble.append(images);
    }

    if (message.role === 'assistant') {
      if (message.thinking) {
        const thinking = document.createElement('div');
        thinking.className = 'chat-thinking-state';

        const label = document.createElement('span');
        label.className = 'chat-thinking-label';
        label.textContent = 'Thinking';

        const dots = document.createElement('span');
        dots.className = 'chat-thinking-dots';
        dots.setAttribute('aria-hidden', 'true');
        dots.innerHTML = '<i></i><i></i><i></i>';

        thinking.append(label, dots);
        bubble.append(thinking);
      } else {
        bubble.append(renderMarkdownContent(message.content || (message.streaming ? '正在输出' : ''), {
          streaming: message.streaming,
        }));
      }
    } else {
      const content = document.createElement('p');
      content.textContent = message.content || (message.streaming ? '正在输出' : '');
      bubble.append(content);
    }
    chatTranscriptEl.append(bubble);
  });

  chatTranscriptEl.scrollTop = chatTranscriptEl.scrollHeight;
}

function clearTodayChat() {
  chatMessages = [];
  clearChatImageAttachment();
  renderChatTranscript();
  chatInputEl?.focus();
}

function extractChatDelta(payload) {
  const choice = payload?.choices?.[0];
  const content = choice?.delta?.content ?? choice?.message?.content ?? '';

  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((item) => item?.text || item?.content || '').join('');
  }

  return '';
}

function createChatStreamRenderer(assistantIndex) {
  let targetText = '';
  let shownLength = 0;
  let timerId = 0;
  let waitResolve = null;

  const renderNextFrame = () => {
    timerId = 0;

    if (shownLength >= targetText.length) {
      if (waitResolve) {
        waitResolve();
        waitResolve = null;
      }
      return;
    }

    const remaining = targetText.length - shownLength;
    const step = remaining > 120 ? 12 : remaining > 48 ? 6 : remaining > 16 ? 3 : 1;
    shownLength = Math.min(targetText.length, shownLength + step);
    chatMessages[assistantIndex].content = targetText.slice(0, shownLength);
    renderChatTranscript();
    timerId = window.setTimeout(renderNextFrame, 18);
  };

  const schedule = () => {
    if (!timerId) {
      timerId = window.setTimeout(renderNextFrame, 0);
    }
  };

  return {
    append(delta) {
      if (chatMessages[assistantIndex].thinking) {
        chatMessages[assistantIndex].thinking = false;
      }
      targetText += delta;
      schedule();
    },
    set(text) {
      if (chatMessages[assistantIndex].thinking) {
        chatMessages[assistantIndex].thinking = false;
      }
      targetText = text;
      schedule();
    },
    finish() {
      if (shownLength >= targetText.length) {
        return Promise.resolve();
      }

      schedule();
      return new Promise((resolve) => {
        waitResolve = resolve;
      });
    },
  };
}

async function readChatStream(response, assistantIndex) {
  const contentType = response.headers.get('content-type') || '';
  const streamRenderer = createChatStreamRenderer(assistantIndex);

  if (!contentType.includes('text/event-stream') || !response.body) {
    const data = await response.json();
    chatMessages[assistantIndex].thinking = false;
    streamRenderer.set(data.reply || '');
    await streamRenderer.finish();
    chatMessages[assistantIndex].streaming = false;
    renderChatTranscript();
    return data.model || '';
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let reply = '';
  let usedModel = '';

  const consumeEvent = (eventText) => {
    const dataLines = eventText
      .split(/\r?\n/)
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trim());

    dataLines.forEach((line) => {
      if (!line || line === '[DONE]') {
        return;
      }

      try {
        const payload = JSON.parse(line);
        usedModel = payload.model || usedModel;
        const delta = extractChatDelta(payload);
        if (delta) {
          reply += delta;
          streamRenderer.append(delta);
        }
      } catch {
        // Ignore malformed keep-alive chunks from upstream.
      }
    });
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() || '';
    events.forEach(consumeEvent);
  }

  buffer += decoder.decode();
  if (buffer.trim()) {
    consumeEvent(buffer);
  }

  if (reply && chatMessages[assistantIndex].content !== reply) {
    streamRenderer.set(reply);
  }
  await streamRenderer.finish();
  chatMessages[assistantIndex].content = reply || chatMessages[assistantIndex].content || '';
  chatMessages[assistantIndex].thinking = false;
  chatMessages[assistantIndex].streaming = false;
  renderChatTranscript();
  return usedModel;
}

function showChatPage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = false;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('chat');
  setAppRoute('chat');
  setMobileChatToolsOpen(false);
  renderChatTranscript();
  scrollPageToTop();
}

function buildChatRequestMessages() {
  const activePreset = getActiveChatPreset();
  const messages = chatMessages
    .filter((message) => !message.streaming)
    .map((message) => {
      if (message.role === 'user' && message.images?.length) {
        const content = [];
        if (message.content) {
          content.push({ type: 'text', text: message.content });
        }
        message.images.forEach((image) => {
          content.push({
            type: 'image_url',
            image_url: {
              url: image.dataUrl || image.url,
            },
          });
        });
        return { role: 'user', content };
      }

      return {
        role: message.role,
        content: message.content || '',
      };
    })
    .filter((message) => Array.isArray(message.content) ? message.content.length : message.content);

  if (activePreset.prompt) {
    return [
      { role: 'system', content: activePreset.prompt },
      ...messages,
    ];
  }

  return messages;
}

async function submitChatMessage() {
  const prompt = chatInputEl.value.trim();
  const imageAttachments = [...chatImageAttachments];
  if (!prompt && !imageAttachments.length) {
    setChatMessage('\u5148\u8f93\u5165\u4e00\u6761\u6d88\u606f\u6216\u4e0a\u4f20\u56fe\u7247\u3002', true);
    chatInputEl.focus();
    return;
  }

  const model = chatModelInputEl.value.trim() || chatModelInputSettingsEl.value.trim() || defaultChatModel;
  const userContent = prompt || (imageAttachments.length > 1 ? '\u8bf7\u63cf\u8ff0\u8fd9\u4e9b\u56fe\u7247\u3002' : '\u8bf7\u63cf\u8ff0\u8fd9\u5f20\u56fe\u7247\u3002');
  chatMessages.push({
    role: 'user',
    content: userContent,
    images: imageAttachments,
  });
  const assistantIndex = chatMessages.push({
    role: 'assistant',
    content: '',
    thinking: true,
    streaming: true,
  }) - 1;
  renderChatTranscript();
  chatInputEl.value = '';
  syncChatInputSize();
  clearChatImageAttachment();
  sendChatEl.disabled = true;
  setChatMessage(imageAttachments.length ? '\u6b63\u5728\u8bf7\u6c42\u804a\u5929\u8bc6\u56fe\u6a21\u578b...' : '\u6b63\u5728\u8bf7\u6c42\u804a\u5929\u6a21\u578b...');

  try {
    const requestMessages = buildChatRequestMessages();
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: requestMessages,
      }),
    });

    if (!response.ok) {
      const data = await response.clone().json().catch(async () => ({ error: await response.text() }));
      throw new Error(data.error || '\u804a\u5929\u5931\u8d25');
    }

    const usedModel = await readChatStream(response, assistantIndex);
    setChatMessage(`\u5df2\u4f7f\u7528 ${usedModel || model} \u56de\u590d\u3002`);
  } catch (error) {
    const assistantMessage = chatMessages[assistantIndex];
    if (assistantMessage?.role === 'assistant') {
      assistantMessage.content = error.message || '\u804a\u5929\u5931\u8d25\u3002';
      assistantMessage.thinking = false;
      assistantMessage.streaming = false;
      assistantMessage.error = true;
    }
    renderChatTranscript();
    setChatMessage(error.message || '\u804a\u5929\u5931\u8d25\u3002', true);
  } finally {
    sendChatEl.disabled = false;
  }
}

function setActiveSideNav(target) {
  sideNavButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.sideNav === target);
  });
}

function setAppRoute(route) {
  const nextHash = `#${route}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, '', nextHash);
  }
}

function scrollPageToTop() {
  const isMobile = isMobileViewport();
  window.scrollTo({ top: 0, behavior: isMobile ? 'auto' : 'smooth' });
}

function focusCreatePromptOnMobile() {
  if (!isMobileViewport()) {
    return;
  }

  window.setTimeout(() => {
    promptEl?.focus({ preventScroll: true });
  }, 80);
}

function showGeneratorPage() {
  generatorPageEl.hidden = false;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = false;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('create');
  setAppRoute('create');
  scrollPageToTop();
  focusCreatePromptOnMobile();
}

function showResizePage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = false;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('template');
  setAppRoute('template');
  scrollPageToTop();
}

function showLayerPage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = false;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('layers');
  setAppRoute('layers');
  scrollPageToTop();
}

function showGalleryPage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = false;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('gallery');
  setAppRoute('gallery');
  scrollPageToTop();
}

function showToolboxPage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = false;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('toolbox');
  setAppRoute('toolbox');
  toolboxHomeEl.hidden = false;
  cutoutToolEl.hidden = true;
  iconRedrawToolEl.hidden = true;
  imageEditToolEl.hidden = true;
  promptGalleryToolEl.hidden = true;
  importantGalleryToolEl.hidden = true;
  scrollPageToTop();
}

function showCutoutTool() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = false;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('toolbox');
  setAppRoute('cutout');
  toolboxHomeEl.hidden = true;
  cutoutToolEl.hidden = false;
  iconRedrawToolEl.hidden = true;
  imageEditToolEl.hidden = true;
  promptGalleryToolEl.hidden = true;
  importantGalleryToolEl.hidden = true;
  scrollPageToTop();
}

function showIconRedrawTool() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = false;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('toolbox');
  setAppRoute('icon-redraw');
  toolboxHomeEl.hidden = true;
  cutoutToolEl.hidden = true;
  iconRedrawToolEl.hidden = false;
  imageEditToolEl.hidden = true;
  promptGalleryToolEl.hidden = true;
  importantGalleryToolEl.hidden = true;
  scrollPageToTop();
}

function showImageEditTool() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = false;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('toolbox');
  setAppRoute('image-edit');
  toolboxHomeEl.hidden = true;
  cutoutToolEl.hidden = true;
  iconRedrawToolEl.hidden = true;
  imageEditToolEl.hidden = false;
  promptGalleryToolEl.hidden = true;
  importantGalleryToolEl.hidden = true;
  scrollPageToTop();
}

function showPromptGalleryTool() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = false;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('toolbox');
  setAppRoute('prompt-gallery');
  toolboxHomeEl.hidden = true;
  cutoutToolEl.hidden = true;
  iconRedrawToolEl.hidden = true;
  imageEditToolEl.hidden = true;
  promptGalleryToolEl.hidden = false;
  importantGalleryToolEl.hidden = true;
  renderPromptGallery();
  scrollPageToTop();
}

async function showImportantGalleryTool() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = false;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('toolbox');
  setAppRoute('important-gallery');
  toolboxHomeEl.hidden = true;
  cutoutToolEl.hidden = true;
  iconRedrawToolEl.hidden = true;
  imageEditToolEl.hidden = true;
  promptGalleryToolEl.hidden = true;
  importantGalleryToolEl.hidden = false;
  scrollPageToTop();
  try {
    await loadImportantGallery();
    setImportantGalleryMessage('');
  } catch (error) {
    setImportantGalleryMessage(error.message || '读取重要图库失败。', true);
  }
}

function showHelpPage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = true;
  helpPageEl.hidden = false;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = true;
  document.body.classList.remove('settings-mode');
  setActiveSideNav('help');
  setAppRoute('help');
  scrollPageToTop();
}

function showSettingsPage() {
  generatorPageEl.hidden = true;
  resizePageEl.hidden = true;
  layerPageEl.hidden = true;
  galleryPageEl.hidden = true;
  toolboxPageEl.hidden = true;
  chatPageEl.hidden = true;
  helpPageEl.hidden = true;
  historySectionEl.hidden = true;
  settingsPageEl.hidden = false;
  document.body.classList.add('settings-mode');
  setActiveSideNav('settings');
  setAppRoute('settings');
  scrollPageToTop();
}

function applyRouteFromHash() {
  const route = window.location.hash.replace(/^#/, '');

  if (!route) {
    if (isMobileViewport()) {
      showChatPage();
      return;
    }

    showGeneratorPage();
    return;
  }

  if (route === 'cutout') {
    showCutoutTool();
    return;
  }

  if (route === 'icon-redraw') {
    showIconRedrawTool();
    return;
  }

  if (route === 'image-edit') {
    showImageEditTool();
    return;
  }

  if (route === 'prompt-gallery') {
    showPromptGalleryTool();
    return;
  }

  if (route === 'important-gallery') {
    showImportantGalleryTool();
    return;
  }

  if (route === 'toolbox') {
    showToolboxPage();
    return;
  }

  if (route === 'chat') {
    showChatPage();
    return;
  }

  if (route === 'template') {
    showResizePage();
    return;
  }

  if (route === 'layers') {
    showLayerPage();
    return;
  }

  if (route === 'gallery') {
    showGalleryPage();
    return;
  }

  if (route === 'help') {
    showHelpPage();
    return;
  }

  if (route === 'settings') {
    showSettingsPage();
    return;
  }

  if (route === 'create') {
    showGeneratorPage();
  }
}

function syncHistorySelection() {
  historyGridEl.querySelectorAll('.history-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.historyId === selectedHistoryId);
  });
  galleryGridEl.querySelectorAll('.gallery-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.historyId === selectedHistoryId);
  });
}

function openHistoryItemPreview(item) {
  selectedHistoryId = item.id;
  currentPreview = normalizePreviewData(item, item.imageUrl);
  syncHistorySelection();
  openImageModal();
}

function isCreateHistoryItem(item) {
  if (item.pending) {
    return !item.kind || item.kind === 'create';
  }

  if (item.kind) {
    return item.kind === 'create';
  }

  return !item.targetName && !item.targetSize;
}

function normalizePendingMatchText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function getPendingFallbackKey(item) {
  const prompt = normalizePendingMatchText(item.prompt);
  if (!prompt) {
    return '';
  }

  return [
    item.kind || 'create',
    prompt,
    item.size || item.aspectRatio || '',
    item.resolution || '',
  ].join('|');
}

function removeCompletedPendingItems(completedHistory = []) {
  if (!pendingGenerationItems.length || !completedHistory.length) {
    return;
  }

  const taskIds = new Set();
  const fallbackCounts = new Map();

  completedHistory.filter(isCreateHistoryItem).forEach((item) => {
    if (item.taskId) {
      taskIds.add(String(item.taskId));
      return;
    }

    const fallbackKey = getPendingFallbackKey(item);
    if (fallbackKey) {
      fallbackCounts.set(fallbackKey, (fallbackCounts.get(fallbackKey) || 0) + 1);
    }
  });

  const nextPendingItems = [];
  let removed = false;

  pendingGenerationItems.forEach((item) => {
    if (!isCreateHistoryItem(item)) {
      nextPendingItems.push(item);
      return;
    }

    if (item.taskId && taskIds.has(String(item.taskId))) {
      removed = true;
      return;
    }

    const fallbackKey = getPendingFallbackKey(item);
    const fallbackCount = fallbackKey ? fallbackCounts.get(fallbackKey) || 0 : 0;
    if (fallbackCount > 0) {
      fallbackCounts.set(fallbackKey, fallbackCount - 1);
      removed = true;
      return;
    }

    nextPendingItems.push(item);
  });

  if (removed) {
    pendingGenerationItems = nextPendingItems;
    persistPendingGenerationItems();
  }
}

function isLayerHistoryItem(item) {
  if (item.pending) {
    return item.kind === 'layer';
  }

  return (item.kind || '') === 'layer' || (item.targetSize || '') === '分层';
}

function isResizeHistoryItem(item) {
  if (item.pending) {
    return item.kind === 'resize';
  }

  return (item.kind || '') === 'resize';
}

function isIconRedrawHistoryItem(item) {
  if (item.pending) {
    return item.kind === 'icon-redraw';
  }

  return (item.kind || '') === 'icon-redraw'
    || ((item.kind || '') === 'create' && (item.targetName || '') === '局部重绘');
}

function syncGallerySelectionControls(history = lastHistorySnapshot) {
  const ids = new Set((history || []).map((item) => item.id));
  selectedGalleryIds = new Set([...selectedGalleryIds].filter((id) => ids.has(id)));
  const selectedCount = selectedGalleryIds.size;
  const totalCount = ids.size;

  galleryGridEl.querySelectorAll('.gallery-card').forEach((card) => {
    const selected = selectedGalleryIds.has(card.dataset.historyId);
    card.classList.toggle('selected', selected);
    const checkbox = card.querySelector('.gallery-select-checkbox');
    if (checkbox) {
      checkbox.checked = selected;
    }
  });

  if (gallerySelectAllEl) {
    gallerySelectAllEl.disabled = totalCount === 0 || selectedCount === totalCount;
  }
  if (galleryClearSelectionEl) {
    galleryClearSelectionEl.disabled = selectedCount === 0;
  }
  if (galleryDownloadSelectedEl) {
    galleryDownloadSelectedEl.disabled = selectedCount === 0;
    galleryDownloadSelectedEl.textContent = selectedCount ? `下载选中 ${selectedCount}` : '下载选中';
  }
  if (galleryDeleteSelectedEl) {
    galleryDeleteSelectedEl.disabled = selectedCount === 0;
    galleryDeleteSelectedEl.textContent = selectedCount ? `删除选中 ${selectedCount}` : '删除选中';
  }
}

function toggleGallerySelection(item, selected = !selectedGalleryIds.has(item.id)) {
  if (selected) {
    selectedGalleryIds.add(item.id);
  } else {
    selectedGalleryIds.delete(item.id);
  }

  syncGallerySelectionControls();
}

function renderGallery(history) {
  galleryGridEl.replaceChildren();
  galleryCountEl.textContent = `${history.length} 张`;
  syncGallerySelectionControls(history);

  if (history.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'history-empty gallery-empty';
    empty.textContent = '还没有生成记录。';
    galleryGridEl.append(empty);
    return;
  }

  history.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.dataset.historyId = item.id;
    card.classList.toggle('active', item.id === selectedHistoryId);
    card.classList.toggle('selected', selectedGalleryIds.has(item.id));
    card.addEventListener('click', () => toggleGallerySelection(item));

    const imageButton = document.createElement('button');
    imageButton.className = 'gallery-image-button';
    imageButton.type = 'button';
    imageButton.setAttribute('aria-label', '查看大图');
    imageButton.addEventListener('click', (event) => {
      event.stopPropagation();
      openHistoryItemPreview(item);
    });

    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.prompt || '生成图片';
    imageButton.append(image);

    const selectedMark = document.createElement('span');
    selectedMark.className = 'history-selected-mark';
    selectedMark.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 12.4 3.2 3.2L17.5 8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const selectToggle = document.createElement('label');
    selectToggle.className = 'gallery-select-toggle';
    selectToggle.setAttribute('aria-label', '选择这张图片');
    selectToggle.addEventListener('click', (event) => event.stopPropagation());
    const selectCheckbox = document.createElement('input');
    selectCheckbox.className = 'gallery-select-checkbox';
    selectCheckbox.type = 'checkbox';
    selectCheckbox.checked = selectedGalleryIds.has(item.id);
    selectCheckbox.addEventListener('change', () => toggleGallerySelection(item, selectCheckbox.checked));
    selectToggle.append(selectCheckbox, document.createElement('span'));

    const prompt = document.createElement('p');
    prompt.textContent = item.prompt || '未记录提示词';

    const meta = document.createElement('span');
    meta.textContent = [item.size, item.resolution].filter(Boolean).join(' · ');

    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = '';
    link.textContent = '下载';
    link.addEventListener('click', (event) => event.stopPropagation());

    const sendPsButton = document.createElement('button');
    sendPsButton.className = 'resize-send-ps-button';
    sendPsButton.type = 'button';
    sendPsButton.textContent = '发到 PS';
    sendPsButton.addEventListener('click', (event) => {
      event.stopPropagation();
      sendImageToPhotoshop(
        item.imageUrl,
        item.targetName || item.prompt || '分层图片',
        sendPsButton,
        { openMode: 'document' },
      );
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'history-delete';
    deleteButton.type = 'button';
    deleteButton.title = '删除';
    deleteButton.setAttribute('aria-label', '删除生成记录');
    deleteButton.innerHTML = '<svg aria-hidden="true"><use href="#icon-trash"></use></svg>';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteHistoryItem(item);
    });

    const actions = document.createElement('div');
    actions.className = 'history-card-actions';
    actions.append(link, sendPsButton, deleteButton);

    card.append(imageButton, selectedMark, selectToggle, prompt, meta, actions);
    galleryGridEl.append(card);
  });

  syncGallerySelectionControls(history);
}

function sanitizePhotoshopBridgeChannel(value) {
  return String(value || '').trim().replace(/[^a-z0-9_-]/gi, '');
}

function createPhotoshopBridgeChannel() {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `ps-${randomPart}`;
}

function getPhotoshopBridgeChannel() {
  let channel = sanitizePhotoshopBridgeChannel(localStorage.getItem('huabuwan-ps-bridge-channel'));

  if (!channel) {
    channel = createPhotoshopBridgeChannel();
    localStorage.setItem('huabuwan-ps-bridge-channel', channel);
  }

  return channel;
}

function savePhotoshopBridgeChannel(value) {
  const channel = sanitizePhotoshopBridgeChannel(value);

  if (!channel || channel.length < 4) {
    throw new Error('PS 桥接码至少 4 位，只能包含字母、数字、下划线或横线。');
  }

  localStorage.setItem('huabuwan-ps-bridge-channel', channel);
  if (psBridgeChannelInputEl) {
    psBridgeChannelInputEl.value = channel;
  }
  if (psBridgeStatusEl) {
    psBridgeStatusEl.textContent = `已保存桥接码：${channel}。网页可发到 PS，也会自动接收 PS 发来的图片。`;
  }
  startPhotoshopIncomingReceiver();
  return channel;
}

function restorePhotoshopBridgeChannel() {
  const channel = getPhotoshopBridgeChannel();
  if (psBridgeChannelInputEl) {
    psBridgeChannelInputEl.value = channel;
  }
  if (psBridgeStatusEl) {
    psBridgeStatusEl.textContent = `当前桥接码：${channel}。网页可发到 PS，也会自动接收 PS 发来的图片。`;
  }
  startPhotoshopIncomingReceiver();
}

async function sendImageToPhotoshop(imageUrl, title = '', button = null, options = {}) {
  const channel = getPhotoshopBridgeChannel();

  if (!channel) {
    return;
  }

  const previousText = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = '发送中...';
  }

  try {
    const response = await fetch('/api/ps-bridge/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel,
        imageUrl,
        title,
        openMode: options.openMode === 'document' ? 'document' : 'layer',
      }),
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || '发送失败');
    }

    if (button) {
      button.textContent = '已发送';
      window.setTimeout(() => {
        button.textContent = previousText || '发到 PS';
        button.disabled = false;
      }, 1200);
    }
  } catch (error) {
    if (button) {
      button.textContent = previousText || '发到 PS';
      button.disabled = false;
    }
    window.alert(error?.message || '发送到 Photoshop 失败');
  }
}

async function addPhotoshopBridgeReference(item) {
  if (!item?.dataUrl) {
    return false;
  }

  const target = ['create', 'resize', 'layer', 'icon-redraw'].includes(item.target)
    ? item.target
    : 'create';
  const safeTitle = String(item.title || 'Photoshop 图片')
    .replace(/[\\/:*?"<>|]+/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 48) || 'Photoshop 图片';
  const extension = item.dataUrl.match(/^data:image\/([^;]+);base64,/i)?.[1]?.replace('jpeg', 'jpg') || 'png';
  const file = dataUrlToFile(item.dataUrl, `${safeTitle}.${extension}`);
  const targetLabels = {
    create: '创作',
    resize: '改尺寸',
    layer: '分层',
    'icon-redraw': '局部重绘',
  };

  if (target === 'resize') {
    showResizePage();
    loadResizeImage(file);
    setResizeMessage(`已接收 Photoshop 图片：${safeTitle}`);
  } else if (target === 'layer') {
    showLayerPage();
    loadLayerImage(file);
    setLayerMessage(`已接收 Photoshop 图片：${safeTitle}`);
  } else if (target === 'icon-redraw') {
    showIconRedrawTool();
    await loadIconRedrawSource(file, { source: 'ps-bridge' });
    setIconRedrawMessage(`已接收 Photoshop 图片：${safeTitle}`);
  } else {
    showGeneratorPage();
    await addReferenceFiles([file]);
    setMessage(`已接收 Photoshop 图片：${safeTitle}`);
  }

  if (psBridgeStatusEl) {
    psBridgeStatusEl.textContent = `已接收 Photoshop 图片到${targetLabels[target]}：${safeTitle}`;
  }
  return true;
}

async function pollPhotoshopIncomingOnce() {
  const channel = getPhotoshopBridgeChannel();
  if (!channel || channel.length < 4) {
    return false;
  }

  const response = await fetch(`/api/ps-bridge/from-ps/poll/${encodeURIComponent(channel)}`);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || '接收 Photoshop 图片失败。');
  }

  if (!data.item) {
    return false;
  }

  return addPhotoshopBridgeReference(data.item);
}

function startPhotoshopIncomingReceiver() {
  if (psBridgeIncomingTimer) {
    window.clearInterval(psBridgeIncomingTimer);
  }

  psBridgeIncomingTimer = window.setInterval(() => {
    pollPhotoshopIncomingOnce().catch((error) => {
      if (psBridgeStatusEl) {
        psBridgeStatusEl.textContent = error?.message || '接收 Photoshop 图片失败。';
      }
    });
  }, 1800);
}

function renderHistory(history) {
  lastHistorySnapshot = history || [];
  const completedCreateHistory = lastHistorySnapshot.filter(isCreateHistoryItem);
  removeCompletedPendingItems(completedCreateHistory);
  const createHistory = [
    ...pendingGenerationItems.filter(isCreateHistoryItem),
    ...completedCreateHistory,
  ];
  historyItems = completedCreateHistory;
  historyGridEl.replaceChildren();
  historyCountEl.textContent = `${createHistory.length} 张`;
  renderGallery(lastHistorySnapshot);
  renderLayerHistory(lastHistorySnapshot);

  if (createHistory.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'history-empty';
    empty.textContent = '还没有创作页生成记录。';
    historyGridEl.append(empty);
    requestAnimationFrame(updateHistoryNav);
    return;
  }

  createHistory.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.dataset.historyId = item.id;
    card.classList.toggle('active', item.id === selectedHistoryId);

    if (item.pending) {
      card.classList.add('pending');
      card.classList.toggle('error', item.status === 'failed');

      const thumb = document.createElement('div');
      thumb.className = 'history-pending-thumb';
      thumb.innerHTML = item.status === 'failed'
        ? '<span class="history-pending-error">!</span>'
        : '<span class="history-spinner" aria-hidden="true"></span>';

      const prompt = document.createElement('p');
      prompt.textContent = item.prompt || '未记录提示词';

      const meta = document.createElement('span');
      meta.textContent = [item.size, item.resolution].filter(Boolean).join(' · ');

      const status = document.createElement('strong');
      status.className = 'history-pending-status';
      status.textContent = item.statusText || '生成中...';
      status.title = item.statusText || '';

      card.append(thumb, prompt, meta, status);
      attachPendingErrorDetail(card, item);

      if (item.status === 'failed' && item.retryPayload) {
        const retryButton = document.createElement('button');
        retryButton.className = 'history-retry-button';
        retryButton.type = 'button';
        retryButton.textContent = '重试';
        retryButton.addEventListener('click', (event) => {
          event.stopPropagation();
          retryGenerationItem(item, retryButton);
        });
        card.append(retryButton);
      }

      historyGridEl.append(card);
      return;
    }

    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.addEventListener('mousedown', (event) => event.preventDefault());

    const selectCard = () => {
      const scrollLeft = historyGridEl.scrollLeft;
      selectedHistoryId = item.id;
      renderImageResult(item);
      syncHistorySelection();
      card.blur();
      requestAnimationFrame(() => {
        historyGridEl.scrollLeft = scrollLeft;
        updateHistoryNav();
      });
    };

    card.addEventListener('click', selectCard);
    card.addEventListener('dblclick', (event) => {
      if (event.target.closest('a, button')) {
        return;
      }

      event.preventDefault();
      selectCard();
      openImageModal();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectCard();
      }
    });

    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.prompt || '生成图片';

    const selectedMark = document.createElement('span');
    selectedMark.className = 'history-selected-mark';
    selectedMark.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 12.4 3.2 3.2L17.5 8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const prompt = document.createElement('p');
    prompt.textContent = item.prompt || '未记录提示词';

    const meta = document.createElement('span');
    meta.textContent = [item.size, item.resolution].filter(Boolean).join(' · ');

    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = '';
    link.textContent = '下载';
    link.addEventListener('click', (event) => event.stopPropagation());

    const actions = document.createElement('div');
    actions.className = 'history-card-actions';
    actions.addEventListener('mousedown', (event) => event.stopPropagation());

    const deleteButton = document.createElement('button');
    deleteButton.className = 'history-delete';
    deleteButton.type = 'button';
    deleteButton.title = '删除';
    deleteButton.setAttribute('aria-label', '删除生成记录');
    deleteButton.innerHTML = '<svg aria-hidden="true"><use href="#icon-trash"></use></svg>';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteHistoryItem(item);
    });

    actions.append(link, deleteButton);
    card.append(image, selectedMark, prompt, meta, actions);
    historyGridEl.append(card);
  });

  requestAnimationFrame(updateHistoryNav);
}

function showFirstHistoryImageIfNeeded(history = lastHistorySnapshot) {
  if (currentPreview || resultFrameEl.dataset.imageUrl) {
    return;
  }

  const firstCreateItem = (history || []).find(isCreateHistoryItem);
  if (firstCreateItem?.imageUrl) {
    renderImageResult(firstCreateItem);
    syncHistorySelection();
  }
}

function renderLayerHistory(history) {
  if (!layerResultListEl || !layerResultInfoEl || !layerResultEmptyEl) {
    return;
  }

  const completedLayerHistory = (history || []).filter(isLayerHistoryItem);
  const layerHistory = [
    ...pendingGenerationItems.filter(isLayerHistoryItem),
    ...completedLayerHistory,
  ];

  layerResultListEl.replaceChildren();
  layerResultInfoEl.textContent = layerHistory.length ? `${layerHistory.length} 个图层` : '未生成';

  if (!layerHistory.length) {
    layerResultListEl.hidden = true;
    layerResultEmptyEl.hidden = false;
    return;
  }

  layerResultListEl.hidden = false;
  layerResultEmptyEl.hidden = true;

  layerHistory.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'history-card layer-history-card';
    card.dataset.historyId = item.id;

    if (item.pending) {
      card.classList.add('pending');
      card.classList.toggle('error', item.status === 'failed');

      const thumb = document.createElement('div');
      thumb.className = 'history-pending-thumb';
      thumb.innerHTML = item.status === 'failed'
        ? '<span class="history-pending-error">!</span>'
        : '<span class="history-spinner" aria-hidden="true"></span>';

      const prompt = document.createElement('p');
      prompt.textContent = item.targetName || item.prompt || '分层图层';

      const meta = document.createElement('span');
      meta.textContent = item.targetSize || item.size || '分层';

      const status = document.createElement('strong');
      status.className = 'history-pending-status';
      status.textContent = item.statusText || '生成中...';
      status.title = item.statusText || '';

      card.append(thumb, prompt, meta, status);
      attachPendingErrorDetail(card, item);
      layerResultListEl.append(card);
      return;
    }

    card.setAttribute('role', 'button');
    card.tabIndex = 0;

    const openLayerPreview = () => openHistoryItemPreview(item);
    card.addEventListener('click', openLayerPreview);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLayerPreview();
      }
    });

    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.targetName || item.prompt || '分层图层';

    const prompt = document.createElement('p');
    prompt.textContent = item.targetName || item.prompt || '分层图层';

    const meta = document.createElement('span');
    meta.textContent = [item.targetSize || '分层', item.resolution].filter(Boolean).join(' · ');

    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = '';
    link.textContent = '下载';
    link.addEventListener('click', (event) => event.stopPropagation());

    const sendPsButton = document.createElement('button');
    sendPsButton.className = 'resize-send-ps-button';
    sendPsButton.type = 'button';
    sendPsButton.textContent = '发到 PS';
    sendPsButton.addEventListener('click', (event) => {
      event.stopPropagation();
      sendImageToPhotoshop(
        item.imageUrl,
        item.targetName || item.prompt || '分层图片',
        sendPsButton,
        { openMode: 'document' },
      );
    });

    const actions = document.createElement('div');
    actions.className = 'history-card-actions';
    actions.addEventListener('mousedown', (event) => event.stopPropagation());

    const deleteButton = document.createElement('button');
    deleteButton.className = 'history-delete';
    deleteButton.type = 'button';
    deleteButton.title = '删除';
    deleteButton.setAttribute('aria-label', '删除分层记录');
    deleteButton.innerHTML = '<svg aria-hidden="true"><use href="#icon-trash"></use></svg>';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteHistoryItem(item);
    });

    actions.append(link, sendPsButton, deleteButton);
    card.append(image, prompt, meta, actions);
    layerResultListEl.append(card);
  });
}

function renderResizeHistory(history) {
  if (!resizeResultListEl || !resizeResultInfoEl || !resizeResultEmptyEl || activeResizeJobCount > 0) {
    return;
  }

  const resizeHistory = (history || []).filter(isResizeHistoryItem);
  resizeResultListEl.replaceChildren();

  if (!resizeHistory.length) {
    resizeResultListEl.hidden = true;
    resizeResultEmptyEl.hidden = false;
    resizeResultInfoEl.textContent = '未生成';
    return;
  }

  resizeResultListEl.hidden = false;
  resizeResultEmptyEl.hidden = true;
  resizeResultInfoEl.textContent = `历史记录 ${resizeHistory.length} 张`;

  resizeHistory.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'resize-generated-card';
    resizeResultListEl.append(card);
    updateResizeResultCard(card, { historyItem: item });
  });
}

function renderIconRedrawHistory(history) {
  if (!iconRedrawResultEl) {
    return;
  }

  const iconRedrawHistory = (history || []).filter(isIconRedrawHistoryItem);

  if (!iconRedrawHistory.length) {
    if (!iconRedrawResultEl.querySelector('.pending')) {
      const empty = document.createElement('p');
      empty.className = 'icon-redraw-history-empty';
      empty.textContent = '暂无局部重绘历史。';
      iconRedrawResultEl.replaceChildren(empty);
      iconRedrawResultEl.hidden = false;
    }
    return;
  }

  iconRedrawResultEl.replaceChildren();
  iconRedrawResultEl.hidden = false;

  iconRedrawHistory.slice().reverse().forEach((item) => {
    renderIconRedrawResult({
      historyItem: item,
      title: item.targetName || '局部重绘',
      downloadName: `icon-redraw-${item.id || Date.now()}.png`,
      append: true,
    });
  });
}

async function loadHistory() {
  try {
    const response = await fetch('/api/history');
    const data = await response.json();
    renderHistory(data.history || []);
    showFirstHistoryImageIfNeeded(data.history || []);
    renderResizeHistory(data.history || []);
    renderIconRedrawHistory(data.history || []);
  } catch {
    renderHistory([]);
    renderResizeHistory([]);
    renderIconRedrawHistory([]);
  }
}

function refreshHistoryWithPending() {
  renderHistory(lastHistorySnapshot);
}

function getPendingGenerationStorageKey() {
  return `${pendingGenerationStoragePrefix}:${currentUser?.id || currentUser?.username || 'anonymous'}`;
}

function getPersistablePendingItems() {
  return pendingGenerationItems
    .filter((item) => item.pending && item.status !== 'failed' && item.taskId)
    .map((item) => ({
      id: item.id,
      localId: item.localId,
      jobId: item.jobId,
      taskId: item.taskId,
      pending: true,
      status: item.status || 'polling',
      statusText: item.statusText || '等待生成结果',
      prompt: item.prompt || '',
      size: item.size || item.aspectRatio || '-',
      resolution: item.resolution || '',
      kind: item.kind || 'create',
      targetName: item.targetName || '',
      targetSize: item.targetSize || '',
      provider: item.provider || '',
      createdAt: item.createdAt || Date.now(),
    }));
}

function persistPendingGenerationItems() {
  try {
    const items = getPersistablePendingItems();
    const key = getPendingGenerationStorageKey();
    if (items.length) {
      localStorage.setItem(key, JSON.stringify(items));
    } else {
      localStorage.removeItem(key);
    }
  } catch {
    // Pending cards are only a recovery aid; generation continues on the server.
  }
}

function readPersistedPendingGenerationItems() {
  try {
    const items = JSON.parse(localStorage.getItem(getPendingGenerationStorageKey()) || '[]');
    const maxAgeMs = 1000 * 60 * 60 * 24;
    return Array.isArray(items)
      ? items
        .filter((item) => item?.taskId && Date.now() - Number(item.createdAt || Date.now()) < maxAgeMs)
        .map((item) => ({
          ...item,
          pending: true,
          status: item.taskId ? 'polling' : (item.status || 'submitted'),
          statusText: item.taskId
            ? (item.statusText || '刷新后继续等待结果')
            : (item.statusText || '已提交，等待结果'),
          retryPayload: null,
        }))
      : [];
  } catch {
    return [];
  }
}

function restorePendingGenerationItems() {
  const restoredItems = readPersistedPendingGenerationItems();
  if (!restoredItems.length) {
    return;
  }

  const existingKeys = new Set(pendingGenerationItems.map((item) => item.taskId || item.localId).filter(Boolean));
  const nextItems = restoredItems.filter((item) => !existingKeys.has(item.taskId || item.localId));
  if (!nextItems.length) {
    return;
  }

  pendingGenerationItems = [...nextItems, ...pendingGenerationItems];
  refreshHistoryWithPending();
  requestAnimationFrame(updateHistoryNav);
}

function resumePendingGenerationPolling() {
  pendingGenerationItems
    .filter((item) => item.pending && item.taskId && item.kind === 'create' && !restoredPendingTaskIds.has(item.taskId))
    .forEach((item) => {
      restoredPendingTaskIds.add(item.taskId);
      pollTask(item.taskId, item, item).catch((error) => {
        updatePendingGenerationItem(item.localId, {
          status: 'failed',
          statusText: error.message || '任务查询失败',
        });
      });
    });
}

function createPendingGenerationItems({
  prompt,
  aspectRatio,
  resolution,
  count,
  kind = 'create',
  targetName = '',
  targetSize = '',
  retryPayload = null,
}) {
  const jobId = `job-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const size = targetSize || aspectRatio || '-';
  const items = Array.from({ length: Math.max(1, Number(count) || 1) }, (_, index) => ({
    id: `${jobId}-${index}`,
    localId: `${jobId}-${index}`,
    jobId,
    pending: true,
    status: 'queued',
    statusText: `等待提交 ${index + 1} / ${count}`,
    prompt,
    size,
    resolution,
    kind,
    targetName,
    targetSize,
    retryPayload,
    createdAt: Date.now(),
  }));

  pendingGenerationItems = [...items, ...pendingGenerationItems];
  persistPendingGenerationItems();
  refreshHistoryWithPending();
  requestAnimationFrame(updateHistoryNav);
  return items;
}

function updatePendingGenerationItem(localId, patch) {
  pendingGenerationItems = pendingGenerationItems.map((item) => (
    item.localId === localId ? { ...item, ...patch } : item
  ));
  persistPendingGenerationItems();
  refreshHistoryWithPending();
}

function updatePendingGenerationJob(jobId, patch) {
  pendingGenerationItems = pendingGenerationItems.map((item) => (
    item.jobId === jobId ? { ...item, ...patch } : item
  ));
  persistPendingGenerationItems();
  refreshHistoryWithPending();
}

function removePendingGenerationItems(items) {
  const ids = new Set(items.map((item) => item.localId));
  pendingGenerationItems = pendingGenerationItems.filter((item) => !ids.has(item.localId));
  persistPendingGenerationItems();
  refreshHistoryWithPending();
}

function failPendingGenerationItems(items, message) {
  const ids = new Set(items.map((item) => item.localId));
  pendingGenerationItems = pendingGenerationItems.map((item) => (
    ids.has(item.localId)
      ? { ...item, status: 'failed', statusText: message || '生成失败' }
      : item
  ));
  persistPendingGenerationItems();
  refreshHistoryWithPending();
}

function retryGenerationItem(item, button = null) {
  const payload = item.retryPayload;

  if (!payload) {
    setMessage('这条失败记录没有保存重试参数。', true);
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = '重试中...';
  }

  pendingGenerationItems = pendingGenerationItems.filter((pendingItem) => pendingItem.localId !== item.localId);
  refreshHistoryWithPending();
  submitGeneration({
    ...payload,
    button: button || buttonEl,
    loadingText: '重试中...',
    resetText: '重试',
  });
}

function closeDeleteConfirm(confirmed = false) {
  deleteConfirmEl.hidden = true;
  if (pendingDeleteResolver) {
    pendingDeleteResolver(confirmed);
    pendingDeleteResolver = null;
  }
}

function confirmHistoryDelete(item) {
  const prompt = item.prompt ? `“${item.prompt}”` : '这张图片';
  deleteConfirmTextEl.textContent = `确定要删除 ${prompt} 吗？删除后会同时移除本机 generated 文件夹里的图片。`;
  deleteConfirmEl.hidden = false;
  confirmDeleteEl.focus();

  return new Promise((resolve) => {
    pendingDeleteResolver = resolve;
  });
}

function confirmGalleryBulkDelete(count) {
  deleteConfirmTextEl.textContent = `确定要删除选中的 ${count} 张图片吗？删除后会同时移除本机 generated 文件夹里的图片。`;
  deleteConfirmEl.hidden = false;
  confirmDeleteEl.focus();

  return new Promise((resolve) => {
    pendingDeleteResolver = resolve;
  });
}

async function deleteHistoryItem(item) {
  const confirmed = await confirmHistoryDelete(item);
  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/history/${encodeURIComponent(item.id)}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '删除失败。');
    }

    const nextHistory = data.history || [];
    if (selectedHistoryId === item.id) {
      if (nextHistory.length > 0) {
        renderImageResult(nextHistory[0]);
      } else {
        clearImageResult();
      }
    }

    renderHistory(nextHistory);
    renderResizeHistory(nextHistory);
    renderIconRedrawHistory(nextHistory);
    setMessage('已删除一条生成记录。');
  } catch (error) {
    setMessage(error?.message || '删除失败，请稍后再试。', true);
  }
}

gallerySelectAllEl?.addEventListener('click', () => {
  selectedGalleryIds = new Set(lastHistorySnapshot.map((item) => item.id));
  syncGallerySelectionControls();
});

galleryClearSelectionEl?.addEventListener('click', () => {
  selectedGalleryIds.clear();
  syncGallerySelectionControls();
});

galleryDownloadSelectedEl?.addEventListener('click', downloadSelectedGalleryItems);
galleryDeleteSelectedEl?.addEventListener('click', deleteSelectedGalleryItems);

const zipCrcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) ? (0xEDB88320 ^ (value >>> 1)) : (value >>> 1);
  }
  return value >>> 0;
});

function getCrc32(bytes) {
  let crc = 0xFFFFFFFF;
  bytes.forEach((byte) => {
    crc = zipCrcTable[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
  });
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function getZipDateParts(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function writeZipUint16(bytes, value) {
  bytes.push(value & 0xFF, (value >>> 8) & 0xFF);
}

function writeZipUint32(bytes, value) {
  bytes.push(value & 0xFF, (value >>> 8) & 0xFF, (value >>> 16) & 0xFF, (value >>> 24) & 0xFF);
}

function getImageExtension(item, blob) {
  const contentType = String(blob?.type || '').toLowerCase();
  if (contentType.includes('jpeg') || contentType.includes('jpg')) {
    return 'jpg';
  }
  if (contentType.includes('webp')) {
    return 'webp';
  }
  if (contentType.includes('png')) {
    return 'png';
  }

  const pathName = new URL(item.imageUrl, window.location.href).pathname;
  const match = pathName.match(/\.([a-z0-9]{2,5})$/i);
  return match ? match[1].toLowerCase() : 'png';
}

function getSafeDownloadName(item, index, extension) {
  const rawName = String(item.targetName || item.prompt || item.id || `image-${index + 1}`).trim();
  const safeName = rawName
    .slice(0, 36)
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '') || `image-${index + 1}`;
  return `${String(index + 1).padStart(2, '0')}-${safeName}.${extension}`;
}

function buildZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const centralDirectory = [];
  let offset = 0;
  const { dosTime, dosDate } = getZipDateParts();

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = new Uint8Array(file.buffer);
    const crc = getCrc32(dataBytes);
    const localHeader = [];

    writeZipUint32(localHeader, 0x04034B50);
    writeZipUint16(localHeader, 20);
    writeZipUint16(localHeader, 0x0800);
    writeZipUint16(localHeader, 0);
    writeZipUint16(localHeader, dosTime);
    writeZipUint16(localHeader, dosDate);
    writeZipUint32(localHeader, crc);
    writeZipUint32(localHeader, dataBytes.byteLength);
    writeZipUint32(localHeader, dataBytes.byteLength);
    writeZipUint16(localHeader, nameBytes.byteLength);
    writeZipUint16(localHeader, 0);

    chunks.push(new Uint8Array(localHeader), nameBytes, dataBytes);

    const centralHeader = [];
    writeZipUint32(centralHeader, 0x02014B50);
    writeZipUint16(centralHeader, 20);
    writeZipUint16(centralHeader, 20);
    writeZipUint16(centralHeader, 0x0800);
    writeZipUint16(centralHeader, 0);
    writeZipUint16(centralHeader, dosTime);
    writeZipUint16(centralHeader, dosDate);
    writeZipUint32(centralHeader, crc);
    writeZipUint32(centralHeader, dataBytes.byteLength);
    writeZipUint32(centralHeader, dataBytes.byteLength);
    writeZipUint16(centralHeader, nameBytes.byteLength);
    writeZipUint16(centralHeader, 0);
    writeZipUint16(centralHeader, 0);
    writeZipUint16(centralHeader, 0);
    writeZipUint16(centralHeader, 0);
    writeZipUint32(centralHeader, 0);
    writeZipUint32(centralHeader, offset);

    centralDirectory.push(new Uint8Array(centralHeader), nameBytes);
    offset += localHeader.length + nameBytes.byteLength + dataBytes.byteLength;
  });

  const centralSize = centralDirectory.reduce((sum, part) => sum + part.byteLength, 0);
  const endRecord = [];
  writeZipUint32(endRecord, 0x06054B50);
  writeZipUint16(endRecord, 0);
  writeZipUint16(endRecord, 0);
  writeZipUint16(endRecord, files.length);
  writeZipUint16(endRecord, files.length);
  writeZipUint32(endRecord, centralSize);
  writeZipUint32(endRecord, offset);
  writeZipUint16(endRecord, 0);

  return new Blob([...chunks, ...centralDirectory, new Uint8Array(endRecord)], { type: 'application/zip' });
}

function triggerBlobDownload(blob, fileName) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

async function downloadSelectedGalleryItems() {
  const selectedItems = lastHistorySnapshot.filter((item) => selectedGalleryIds.has(item.id) && item.imageUrl);
  if (!selectedItems.length) {
    return;
  }

  galleryDownloadSelectedEl.disabled = true;
  galleryDownloadSelectedEl.textContent = '打包中...';

  try {
    const files = [];

    for (const [index, item] of selectedItems.entries()) {
      const response = await fetch(item.imageUrl);
      if (!response.ok) {
        throw new Error(`下载第 ${index + 1} 张图片失败。`);
      }

      const blob = await response.blob();
      const extension = getImageExtension(item, blob);
      files.push({
        name: getSafeDownloadName(item, index, extension),
        buffer: await blob.arrayBuffer(),
      });
    }

    const zipBlob = buildZip(files);
    triggerBlobDownload(zipBlob, `huabuwan-gallery-${Date.now()}.zip`);
    setMessage(`已打包 ${files.length} 张图片。`);
  } catch (error) {
    setMessage(error?.message || '批量下载失败，请稍后再试。', true);
  } finally {
    syncGallerySelectionControls();
  }
}

async function deleteSelectedGalleryItems() {
  const ids = [...selectedGalleryIds];
  if (!ids.length) {
    return;
  }

  const confirmed = await confirmGalleryBulkDelete(ids.length);
  if (!confirmed) {
    return;
  }

  galleryDeleteSelectedEl.disabled = true;
  galleryDeleteSelectedEl.textContent = '删除中...';

  try {
    for (const id of ids) {
      const response = await fetch(`/api/history/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '删除失败。');
      }
    }

    selectedGalleryIds.clear();
    if (ids.includes(selectedHistoryId)) {
      clearImageResult();
    }
    await loadHistory();
    setMessage(`已删除 ${ids.length} 张图片。`);
  } catch (error) {
    setMessage(error?.message || '批量删除失败，请稍后再试。', true);
    await loadHistory();
  } finally {
    syncGallerySelectionControls();
  }
}

function updateHistoryNav() {
  const maxScroll = historyGridEl.scrollWidth - historyGridEl.clientWidth;
  historyPrevEl.hidden = maxScroll <= 0 || historyGridEl.scrollLeft <= 4;
  historyNextEl.hidden = maxScroll <= 0 || historyGridEl.scrollLeft >= maxScroll - 4;
}

function resetResizeResult() {
  resizePresetCards.forEach((card) => card.classList.remove('active'));
  resizeResultListEl.replaceChildren();
  resizeResultListEl.hidden = true;
  resizeResultEmptyEl.hidden = false;
  resizeResultInfoEl.textContent = '未生成';
}

function loadResizeImage(file) {
  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    setResizeMessage('请上传 JPG / PNG / WebP 图片。', true);
    return;
  }

  if (resizeSourceObjectUrl) {
    URL.revokeObjectURL(resizeSourceObjectUrl);
  }

  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  image.onload = () => {
    resizeSourceFile = file;
    resizeSourceObjectUrl = objectUrl;
    resizeFileNameEl.textContent = '';
    resizeSourcePreviewEl.innerHTML = `
      <div class="layer-source-thumb">
        <img src="${objectUrl}" alt="改尺寸参考图预览" />
        <button class="layer-source-remove" type="button" aria-label="删除上传的图片">×</button>
      </div>
      <div>
        <strong>参考图已导入</strong>
        <span>${image.naturalWidth}×${image.naturalHeight}</span>
      </div>
    `;
    makeImageOpenable(
      resizeSourcePreviewEl.querySelector('img'),
      objectUrl,
      file.name || '改尺寸参考图预览',
    );
    resizeSourcePreviewEl.querySelector('.layer-source-remove')?.addEventListener('click', clearResizeImage);
    resizeSourcePreviewEl.hidden = false;
    resetResizeResult();
    setResizeMessage('参考图已导入，可以勾选尺寸生成。');
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    resizeFileNameEl.textContent = '图片读取失败，请换一张图。';
    resizeSourceFile = null;
    resizeSourcePreviewEl.hidden = true;
    resizeSourcePreviewEl.replaceChildren();
    resetResizeResult();
  };

  image.src = objectUrl;
}

function loadLayerImage(file) {
  if (!file) {
    return;
  }

  if (layerSourceObjectUrl) {
    URL.revokeObjectURL(layerSourceObjectUrl);
  }

  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  image.onload = () => {
    layerSourceFile = file;
    layerSourceDimensions = {
      width: image.naturalWidth || image.width,
      height: image.naturalHeight || image.height,
    };
    layerSourceObjectUrl = objectUrl;
    layerLastAnalysis = '';
    layerAnalysisTextEl.value = '';
    layerSourcePreviewEl.innerHTML = `
      <div class="layer-source-thumb">
        <img src="${objectUrl}" alt="分层参考图预览" />
        <button class="layer-source-remove" type="button" aria-label="删除上传的图片">×</button>
      </div>
      <div>
        <strong>参考图已导入</strong>
        <span>${image.naturalWidth}×${image.naturalHeight}</span>
      </div>
    `;
    makeImageOpenable(
      layerSourcePreviewEl.querySelector('img'),
      objectUrl,
      file.name || '分层参考图预览',
    );
    layerSourcePreviewEl.querySelector('.layer-source-remove')?.addEventListener('click', clearLayerImage);
    layerSourcePreviewEl.hidden = false;
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    layerSourceFile = null;
    layerSourceDimensions = null;
    layerLastAnalysis = '';
    layerAnalysisTextEl.value = '';
    layerSourcePreviewEl.hidden = true;
    layerSourcePreviewEl.replaceChildren();
  };

  image.src = objectUrl;
}

function getResizeAspectRatio(width, height) {
  return getSupportedAspectRatioForResize(width, height).aspectRatio;
}

function getSupportedAspectRatioForResize(width, height) {
  const aspectRatio = getClosestSupportedAspectRatio(width, height);
  const option = superAiAspectOptions.find((item) => item.value === aspectRatio);
  const resolution = option?.resolutions.includes('1k') ? '1k' : '2k';
  return { aspectRatio, resolution };
}

function getAspectRatioText(aspectRatio) {
  const ratioMap = {
    auto: '1:1',
    square: '1:1',
    widescreen: '16:9',
    story: '9:16',
    landscape: '4:3',
    portrait: '3:4',
    classic: '3:2',
    verticalClassic: '2:3',
    fiveFour: '5:4',
    fourFive: '4:5',
    tripleWide: '3:1',
    tripleTall: '1:3',
    panorama: '2:1',
    tall: '1:2',
    cinema: '21:9',
    verticalCinema: '9:21',
  };
  return ratioMap[aspectRatio] || String(aspectRatio || '1:1');
}

function getRatioValue(ratioText) {
  const [widthText, heightText] = String(ratioText || '').split(':');
  const width = Number(widthText);
  const height = Number(heightText);
  return width > 0 && height > 0 ? width / height : 1;
}

function getTargetRatioFromSize(sizeText) {
  const match = String(sizeText || '').match(/(\d+)\s*[x×]\s*(\d+)/i);
  if (!match) {
    return '';
  }
  return `${match[1]}:${match[2]}`;
}

function getResizePaddingText(targetRatio, supportedRatio) {
  const targetValue = getRatioValue(targetRatio);
  const supportedValue = getRatioValue(supportedRatio);

  if (targetValue > supportedValue) {
    return '内容比例比画布更宽，所以内容区域上下保留灰色边框。';
  }

  if (targetValue < supportedValue) {
    return '内容比例比画布更窄，所以内容区域左右保留灰色边框。';
  }

  return '内容比例与画布比例接近，必要时只保留少量灰色安全边框。';
}

function getResizeLayoutPrompt(presetName) {
  return ['顶部 banner', '内页', '活动精选', '中部 banner'].includes(String(presetName || ''))
    ? '横版 App 广告位固定版式要求：标题、主文案、利益点、按钮等文字信息放在画面左侧；产品、食物、商品或主体视觉放在画面右侧。左右信息层级清楚，右侧主体不能挡住左侧文字。'
    : '';
}

function getSupportedAspectRatioForResolution(width, height, resolution = '1k') {
  const ratio = Number(width) / Number(height);
  if (!Number.isFinite(ratio) || ratio <= 0) {
    return 'square';
  }

  const ratioMap = {
    square: 1,
    widescreen: 16 / 9,
    story: 9 / 16,
    landscape: 4 / 3,
    portrait: 3 / 4,
    classic: 3 / 2,
    verticalClassic: 2 / 3,
    fiveFour: 5 / 4,
    fourFive: 4 / 5,
    tripleWide: 3,
    tripleTall: 1 / 3,
    panorama: 2,
    tall: 1 / 2,
    cinema: 21 / 9,
    verticalCinema: 9 / 21,
  };

  const supported = superAiAspectOptions
    .filter((option) => option.value !== 'auto' && option.resolutions.includes(resolution))
    .filter((option) => ratioMap[option.value]);

  return supported
    .map((option) => ({ value: option.value, diff: Math.abs(ratioMap[option.value] - ratio) }))
    .sort((a, b) => a.diff - b.diff)[0]?.value || 'square';
}

function getClosestSupportedAspectRatio(width, height) {
  const ratio = Number(width) / Number(height);
  if (!Number.isFinite(ratio) || ratio <= 0) {
    return 'square';
  }

  const ratioMap = {
    square: 1,
    widescreen: 16 / 9,
    story: 9 / 16,
    landscape: 4 / 3,
    portrait: 3 / 4,
    classic: 3 / 2,
    verticalClassic: 2 / 3,
    fiveFour: 5 / 4,
    fourFive: 4 / 5,
    tripleWide: 3,
    tripleTall: 1 / 3,
    panorama: 2,
    tall: 1 / 2,
    cinema: 21 / 9,
    verticalCinema: 9 / 21,
  };

  return superAiAspectOptions
    .filter((option) => option.value !== 'auto' && ratioMap[option.value])
    .map((option) => ({ value: option.value, diff: Math.abs(ratioMap[option.value] - ratio) }))
    .sort((a, b) => a.diff - b.diff)[0]?.value || 'square';
}

function getLayerAspectRatio(resolution = '1k') {
  return getSupportedAspectRatioForResolution(
    layerSourceDimensions?.width,
    layerSourceDimensions?.height,
    resolution,
  );
}

function getLayerGenerationSettings(layer) {
  const layerName = String(layer?.name || '').trim();
  const resolution = defaultLayerResolution;
  const aspectRatio = ['纯标题', '纯副标题'].includes(layerName)
    ? 'cinema'
    : getLayerAspectRatio(resolution);

  return { aspectRatio, resolution };
}

function setResizeMessage(text, isError = false) {
  resizeMessageEl.textContent = text;
  resizeMessageEl.className = `message ${isError ? 'error' : ''}`;
}

function setLayerMessage(text, isError = false) {
  layerMessageEl.textContent = text;
  layerMessageEl.className = `message ${isError ? 'error' : ''}`;
  layerMessageEl.title = isError && text ? '双击查看完整错误' : '';
  layerMessageEl.ondblclick = isError && text
    ? () => showErrorDetail(text)
    : null;
}

function clearResizeImage() {
  if (resizeSourceObjectUrl) {
    URL.revokeObjectURL(resizeSourceObjectUrl);
  }

  resizeSourceObjectUrl = '';
  resizeSourceFile = null;
  resizeImageInputEl.value = '';
  resizeSourcePreviewEl.hidden = true;
  resizeSourcePreviewEl.replaceChildren();
  resetResizeResult();
  setResizeMessage('已删除上传的参考图。');
}

function clearLayerImage() {
  if (layerSourceObjectUrl) {
    URL.revokeObjectURL(layerSourceObjectUrl);
  }

  layerSourceObjectUrl = '';
  layerSourceFile = null;
  layerSourceDimensions = null;
  layerLastAnalysis = '';
  layerAnalysisTextEl.value = '';
  layerImageInputEl.value = '';
  layerSourcePreviewEl.hidden = true;
  layerSourcePreviewEl.replaceChildren();
  setLayerMessage('已删除上传的参考图。');
}

function createResizeResultCard(preset) {
  const card = document.createElement('article');
  card.className = 'resize-generated-card';
  card.innerHTML = `
    <div class="resize-generated-thumb"><span>生成中...</span></div>
    <div>
      <strong>${preset.name}</strong>
      <span>${preset.width}×${preset.height}</span>
    </div>
  `;
  resizeResultListEl.append(card);
  return card;
}

function updateResizeResultCard(card, data) {
  const imageUrl = data.historyItem?.imageUrl || data.imageUrl;
  const downloadUrl = data.historyItem?.imageUrl || data.imageUrl || '#';
  const sourceImageUrl = data.historyItem?.generatedSourceImageUrl || data.generatedSourceImageUrl || data.remoteImageUrl || '';
  const title = data.historyItem?.prompt || data.prompt || '';
  const targetName = data.targetName || data.historyItem?.targetName || '已生成';
  const targetSize = data.targetSize || data.historyItem?.targetSize || data.size || '';
  const generatedSize = data.historyItem?.size || data.size || '';
  const generatedAspectRatio = data.historyItem?.aspectRatio || data.aspectRatio || inferAspectRatio(generatedSize);
  const generatedRatioLabel = getAspectRatioText(generatedAspectRatio);
  const targetRatioLabel = getTargetRatioFromSize(targetSize);
  const metaText = targetSize && generatedRatioLabel
    ? `画布 GPT ${generatedRatioLabel} · 内容 ${targetRatioLabel || targetSize}`
    : (targetSize || generatedSize || '');
  const showSourceDownload = sourceImageUrl && sourceImageUrl !== downloadUrl;

  card.classList.add('done');
  card.innerHTML = `
    <img src="${imageUrl}" alt="${title.replace(/"/g, '&quot;')}" title="点击查看大图" />
    <div>
      <strong>${targetName}</strong>
      <span>${metaText}</span>
    </div>
    <div class="resize-generated-links">
      <a href="${downloadUrl}" download>下载图片</a>
      <button class="resize-send-ps-button" type="button">发到 PS</button>
      <button class="resize-send-layer-button" type="button">发送到分层</button>
      ${showSourceDownload ? `<a href="${sourceImageUrl}" download>下载 GPT 源图</a>` : ''}
    </div>
  `;

  const actionsEl = card.querySelector('.resize-generated-links');
  const historyItem = data.historyItem || null;
  if (actionsEl && historyItem?.id) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'history-delete resize-generated-delete-button';
    deleteButton.type = 'button';
    deleteButton.title = '删除';
    deleteButton.setAttribute('aria-label', '删除改尺寸记录');
    deleteButton.innerHTML = '<svg aria-hidden="true"><use href="#icon-trash"></use></svg>';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteHistoryItem(historyItem);
    });
    actionsEl.append(deleteButton);
  }

  card.querySelector('.resize-send-ps-button')?.addEventListener('click', (event) => {
    sendImageToPhotoshop(imageUrl, targetName || title || '生成图片', event.currentTarget, { openMode: 'document' });
  });

  card.querySelector('.resize-send-layer-button')?.addEventListener('click', (event) => {
    sendResizeResultToLayer(data, event.currentTarget);
  });

  card.querySelector('img')?.addEventListener('click', () => {
    currentPreview = {
      id: data.historyItem?.id || data.id || '',
      imageUrl,
      displayUrl: imageUrl,
      sourceImageUrl,
      prompt: title || targetName,
      size: generatedSize || '-',
      generatedSize: generatedSize || '-',
      resolution: data.historyItem?.resolution || data.resolution || resolutionEl.value || '-',
      model: data.historyItem?.model || data.model || modelEl.value || '-',
      aspectRatio: generatedAspectRatio,
      targetSize,
      targetRatio: targetRatioLabel,
      referenceImages: data.historyItem?.referenceImages || data.referenceImages || [],
      kind: data.historyItem?.kind || data.kind || '',
    };
    openImageModal();
  });

  if (shouldAutoTransparentize(data) && !data.skipAutoTransparentize && (data.historyItem?.model || data.model) !== 'background-removal') {
    const imageEl = card.querySelector('img');
    const anchorEl = card.querySelector('a[download]');

    getTransparentLayerAsset(data).then((asset) => {
      if (imageEl) {
        imageEl.src = asset.objectUrl;
      }
      if (anchorEl) {
        anchorEl.href = asset.objectUrl;
        anchorEl.download = asset.fileName;
      }
    }).catch(() => {});
  }
}

async function sendResizeResultToLayer(data, triggerButton) {
  const item = data?.historyItem || data || {};
  const imageUrl = item.imageUrl || data?.imageUrl || '';

  if (!imageUrl) {
    setResizeMessage('没有可发送到分层的图片。', true);
    return;
  }

  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.textContent = '导入中...';
  }

  try {
    const dataUrl = await urlToDataUrl(imageUrl);
    const safeName = (item.targetName || data?.targetName || '改尺寸结果')
      .slice(0, 24)
      .replace(/[\\/:*?"<>|]+/g, '-');
    const file = dataUrlToFile(dataUrl, `${safeName}-分层参考图-${Date.now()}.png`);

    showLayerPage();
    loadLayerImage(file);
    layerOptionCards.forEach((card) => {
      const isBackgroundLayer = card.dataset.layerName === '纯背景';
      const input = card.querySelector('input[type="checkbox"]');
      card.classList.toggle('active', isBackgroundLayer);
      if (input) {
        input.checked = isBackgroundLayer;
      }
    });
    setLayerMessage('已导入改尺寸结果，并默认勾选纯背景。');
  } catch (error) {
    setResizeMessage(error.message || '发送到分层失败。', true);
  } finally {
    if (triggerButton) {
      triggerButton.disabled = false;
      triggerButton.textContent = '发送到分层';
    }
  }
}

function updateResizeResultCardError(card, message) {
  card.classList.add('error');
  card.querySelector('.resize-generated-thumb')?.replaceChildren(document.createTextNode('生成失败'));
  const detail = document.createElement('p');
  detail.textContent = message;
  card.append(detail);
}

function getSelectedResizePresets() {
  return resizePresetCards
    .filter((card) => card.dataset.category === activeResizeCategory)
    .filter((card) => card.querySelector('input[type="checkbox"]').checked)
    .map((card) => ({
      card,
      name: card.dataset.resizeName,
      width: Number(card.dataset.width),
      height: Number(card.dataset.height),
      prompt: card.querySelector('textarea')?.value.trim() || '',
    }));
}

function getSelectedLayerOptions() {
  return layerOptionCards
    .filter((card) => card.querySelector('input[type="checkbox"]').checked)
    .map((card) => ({
      card,
      name: card.dataset.layerName,
      prompt: card.querySelector('textarea')?.value.trim() || '',
    }));
}

function syncResizeCategoryView() {
  resizePresetCards.forEach((card) => {
    card.hidden = card.dataset.category !== activeResizeCategory;
  });
}

async function pollResizeTask(taskId, meta, resultCard) {
  for (let attempt = 1; attempt <= imageTaskPollAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    setResizeMessage(`${meta.name} 生成中... 第 ${attempt} 次查询。`);

    let response;
    let data;

    try {
      const provider = pendingItem?.provider || meta?.provider || '';
      const query = provider ? `?provider=${encodeURIComponent(provider)}` : '';
      response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}${query}`);
      data = await response.json();
    } catch (error) {
      setIconRedrawMessage('查询网络波动，后台会继续重绘。');
      if (pendingItem) {
        updatePendingGenerationItem(pendingItem.localId, {
          status: 'polling',
          statusText: '查询网络波动，后台继续重绘',
        });
      }
      continue;
    }

    if (!response.ok) {
      if (isTemporaryTaskQueryFailure(null, data)) {
        setIconRedrawMessage('查询暂时失败，后台会继续重绘。');
        if (pendingItem) {
          updatePendingGenerationItem(pendingItem.localId, {
            status: 'polling',
            statusText: '查询暂时失败，后台继续重绘',
          });
        }
        continue;
      }

      throw new Error(data.error || '查询任务失败');
    }

    if (data.status === 'completed' && data.imageUrl) {
      updateResizeResultCard(resultCard, {
        ...data,
        targetName: meta.name,
        targetSize: `${meta.width}×${meta.height}`,
      });
      await loadHistory();
      return data;
    }

    if (data.status === 'failed') {
      throw new Error(data.error || '任务失败');
    }
  }

  throw new Error(`${meta.name} 还没完成，可以稍后在生成记录里查看。`);
}

async function generateResizePreset(preset, referencePayload, generation = {}) {
  const targetSize = `${preset.width}×${preset.height}`;
  const targetRatio = `${preset.width}:${preset.height}`;
  const generationIndex = Number(generation.index) || 0;
  const generationTotal = Number(generation.total) || 1;
  const targetName = generationTotal > 1
    ? `${preset.name} ${generation.index + 1}/${generation.total}`
    : preset.name;
  const { aspectRatio, resolution } = getSupportedAspectRatioForResize(preset.width, preset.height);
  const supportedRatio = getAspectRatioText(aspectRatio);
  const layoutPrompt = getResizeLayoutPrompt(preset.name);
  const variationPrompt = `请把这次改尺寸做成一个新的排版适配版本，不要简单复刻上一版；可以微调主体位置、留白和画面重心，但不要改动品牌、商品、文案或活动信息。方案编号：${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}。`;
  const prompt = [
    preset.prompt,
    layoutPrompt,
    variationPrompt,
    `输出整张图片的画布比例必须是 GPT 当前支持的 ${supportedRatio}，视觉版式要服务于目标尺寸比例 ${targetRatio}。`,
    '不要把原图当成一张缩略图直接贴到新画布中间；不要保留旧画布外框、灰色边框、截图边框或大块无意义留白。',
    '请基于参考图重新做适配排版：保持品牌、商品、人物、文案和活动信息完整准确，可以扩展或重绘背景，可以重新安排主体位置、文字区、信息栏和留白，让内容自然填满新版式。',
    '允许轻微调整元素间距、字号层级和画面重心，但不要改文案，不要新增参考图里没有的固定品牌、品类或活动信息，不要裁剪关键主体、文字、商品和 logo。',
  ].filter(Boolean).join('\n');

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      aspectRatio,
      resolution,
      count: 1,
      officialFallback: isOfficialFallbackEnabled(),
      imageUrls: referencePayload.map((item) => item.dataUrl),
      referenceImages: referencePayload,
      targetName,
      targetSize,
      kind: 'resize',
      model: imageModelInputEl.value.trim() || modelEl.value.trim() || 'gpt-image-2',
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `${preset.name} 生成失败`);
  }

  return data;
}

async function pollLayerTask(taskId, meta, pendingItem = null) {
  for (let attempt = 1; attempt <= imageTaskPollAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    if (pendingItem) {
      updatePendingGenerationItem(pendingItem.localId, {
        status: 'polling',
        statusText: `生成中，第 ${attempt} 次查询`,
      });
    }

    const response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '查询任务失败');
    }

    if (data.status === 'completed' && data.imageUrl) {
      if (pendingItem) {
        removePendingGenerationItems([pendingItem]);
      }

      if (data.cutoutError) {
        setLayerMessage(`${meta.name} 纯色底已生成，自动抠图失败：${data.cutoutError}`, true);
      }

      await loadHistory();
      return data;
    }

    if (data.status === 'failed') {
      if (pendingItem) {
        updatePendingGenerationItem(pendingItem.localId, {
          status: 'failed',
          statusText: data.error || '任务失败',
        });
      }
      throw new Error(data.error || '任务失败');
    }
  }

  if (pendingItem) {
    updatePendingGenerationItem(pendingItem.localId, {
      status: 'failed',
      statusText: '等待超时',
    });
  }
  throw new Error(`${meta.name} 还没完成，可以稍后在图库里查看。`);
}

async function generateLayerOption(layer, referencePayload) {
  const prompt = buildLayerOptionPrompt(layer);
  const resolution = layer.resolution || defaultLayerResolution;
  const aspectRatio = layer.aspectRatio || getLayerAspectRatio(resolution);

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      aspectRatio,
      resolution,
      count: 1,
      officialFallback: isOfficialFallbackEnabled(),
      imageUrls: referencePayload.map((item) => item.dataUrl),
      referenceImages: referencePayload,
      targetName: layer.name,
      targetSize: '分层',
      kind: 'layer',
      model: imageModelInputEl.value.trim() || modelEl.value.trim() || 'gpt-image-2',
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `${layer.name} 生成失败`);
  }

  return data;
}

function buildLayerOptionPrompt(layer) {
  const customPrompt = String(layer?.prompt || '').trim();
  const layerName = String(layer?.name || '分层').trim();

  return [
    '核心要求：下面的「自定义图层提示词」优先级最高，必须按照它生成，不要改成其它默认分层逻辑。',
    `图层名称：${layerName}`,
    '自定义图层提示词：',
    customPrompt || `单独生成参考图中的${layerName}图层。`,
    '通用约束：基于参考图原样提取或补全目标图层，保持原图的构图关系、风格、颜色、光影、透视、比例和细节。',
    '除非自定义提示词明确要求背景，否则输出透明背景 PNG 图层，不要添加额外的白色、黑色、灰色或棋盘格背景。',
    '不要重新设计，不要更改原图文字内容，不要混入未要求的元素。',
  ].filter(Boolean).join('\n');
}

function getLayerSelectionText() {
  const start = layerAnalysisTextEl.selectionStart;
  const end = layerAnalysisTextEl.selectionEnd;
  return layerAnalysisTextEl.value.slice(start, end).trim();
}

function getLayerNameFromPrompt(prompt) {
  const firstLine = prompt
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*\d.、\s]+/, '').trim())
    .find(Boolean);
  return (firstLine || '自定义图层').slice(0, 24);
}

async function analyzeLayerImage() {
  if (!layerSourceFile) {
    setLayerMessage('请先上传一张要分析的设计图。', true);
    layerImageInputEl.focus();
    return;
  }

  layerAnalyzeImageEl.disabled = true;
  layerAnalyzeImageEl.textContent = '分析中...';
  layerAnalysisTextEl.value = 'Thinking';
  layerAnalysisTextEl.classList.add('streaming');
  setLayerMessage('正在用聊天模型分析图片元素。');

  try {
    const compressedDataUrl = await compressImageFileToDataUrl(layerSourceFile, {
      maxDimension: 1280,
      mimeType: 'image/jpeg',
      quality: 0.82,
    });
    const prompt = [
      '你是平面设计图片分析助手。',
      '请用中文简短描述这张图里主要有什么元素、布局和视觉重点。',
      '只输出一段话，不要分点，不要列表，不要 JSON，不要给生成建议。',
      '开头使用“这张图里面有”。',
      '长度控制在 50 到 120 字之间。',
    ].join('\n');
    const model = chatModelInputEl.value.trim() || chatModelInputSettingsEl.value.trim() || defaultChatModel;
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: compressedDataUrl } },
          ],
        }],
      }),
    });

    if (!response.ok) {
      const data = await response.clone().json().catch(async () => ({ error: await response.text() }));
      throw new Error(data.error || '图片元素分析失败。');
    }

    layerAnalysisTextEl.value = '';
    layerLastAnalysis = await readLayerAnalysisResponse(response);
    layerAnalysisTextEl.value = layerLastAnalysis;
    setLayerMessage('已完成元素分析。选中一段文案后，可以生成对应图层。');
    layerAnalysisTextEl.focus();
  } catch (error) {
    layerAnalysisTextEl.value = '';
    setLayerMessage(error.message || '图片元素分析失败。', true);
  } finally {
    layerAnalysisTextEl.classList.remove('streaming');
    layerAnalyzeImageEl.disabled = false;
    layerAnalyzeImageEl.textContent = '分析图片元素';
  }
}

async function readLayerAnalysisResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('text/event-stream') || !response.body) {
    const data = await response.json();
    const text = data.reply || data.analysis || '';
    layerAnalysisTextEl.value = text;
    return text;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let reply = '';

  const render = () => {
    layerAnalysisTextEl.value = reply;
    layerAnalysisTextEl.scrollTop = layerAnalysisTextEl.scrollHeight;
  };

  const consumeEvent = (eventText) => {
    const dataLines = eventText
      .split(/\r?\n/)
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trim());

    dataLines.forEach((line) => {
      if (!line || line === '[DONE]') {
        return;
      }

      try {
        const payload = JSON.parse(line);
        const delta = extractChatDelta(payload);
        if (delta) {
          reply += delta;
          render();
        }
      } catch {
        // Ignore malformed keep-alive chunks.
      }
    });
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() || '';
    events.forEach(consumeEvent);
  }

  buffer += decoder.decode();
  if (buffer.trim()) {
    consumeEvent(buffer);
  }

  return reply.trim();
}

async function generateLayerFromSelection() {
  if (!layerSourceFile) {
    setLayerMessage('请先上传一张参考图。', true);
    layerImageInputEl.focus();
    return;
  }

  const selectedText = getLayerSelectionText();
  const fallbackText = layerAnalysisTextEl.value.trim();
  const promptText = selectedText || fallbackText;

  if (!promptText) {
    setLayerMessage('请先在文本窗口里选中一段元素描述，或者手动写一段图层需求。', true);
    layerAnalysisTextEl.focus();
    return;
  }

  const layer = {
    name: getLayerNameFromPrompt(promptText),
    prompt: [
      '核心要求：尽量从参考图原样提取目标图层，而不是重新创作一个相似元素。',
      '必须保持目标元素在参考图中的身份、轮廓、姿势、比例、视角、材质、颜色、光影和细节。',
      '如果目标是人物，必须保留同一张脸、同一发型、同一服装、同一姿势和同一表情；不要换人、不要美颜重绘、不要卡通化。',
      '请把目标元素放在纯绿色绿幕背景上，背景颜色使用均匀高饱和绿色 #00FF00，方便后续按绿色抠图。',
      '绿色背景必须干净、纯色、无渐变、无阴影、无纹理、无文字、无边框；不要让绿色反光或绿色描边污染目标元素边缘。',
      '只生成下面描述对应的元素，尽量不要带入无关背景或其它图层。',
      '如果是文字、标题、装饰、商品或人物，请保持原图的构图关系、风格、材质、颜色和光影。',
      '图层描述：',
      promptText,
    ].join('\n'),
  };
  Object.assign(layer, getLayerGenerationSettings(layer));

  const pendingItems = createPendingGenerationItems({
    prompt: layer.prompt,
    aspectRatio: layer.aspectRatio,
    resolution: layer.resolution,
    count: 1,
    kind: 'layer',
    targetName: layer.name,
    targetSize: '分层',
  });

  layerGenerateFromSelectionEl.disabled = true;
  layerGenerateFromSelectionEl.querySelector('span').textContent = '提交中...';
  setLayerMessage('');

  try {
    const referencePayload = [{
      name: layerSourceFile.name || '分层参考图',
      dataUrl: await fileToDataUrl(layerSourceFile),
    }];

    layerGenerateFromSelectionEl.disabled = false;
    layerGenerateFromSelectionEl.querySelector('span').textContent = '用选中文案生成图层';

    (async () => {
      try {
        const data = await generateLayerOption(layer, referencePayload);

        if (data.pending && data.taskId) {
          updatePendingGenerationItem(pendingItems[0].localId, {
            taskId: data.taskId,
            status: 'polling',
            statusText: '等待生成结果',
          });
          await pollLayerTask(data.taskId, layer, pendingItems[0]);
        } else if (data.pending && data.taskIds?.length) {
          updatePendingGenerationItem(pendingItems[0].localId, {
            taskId: data.taskIds[0],
            status: 'polling',
            statusText: '等待生成结果',
          });
          await pollLayerTask(data.taskIds[0], layer, pendingItems[0]);
        } else {
          removePendingGenerationItems(pendingItems);
          await loadHistory();
        }
      } catch (error) {
        failPendingGenerationItems(pendingItems, error.message);
        setLayerMessage(error.message || '选中文案生成失败。', true);
      }
    })();
  } catch (error) {
    failPendingGenerationItems(pendingItems, error.message);
    setLayerMessage(error.message || '选中文案生成失败。', true);
    layerGenerateFromSelectionEl.disabled = false;
    layerGenerateFromSelectionEl.querySelector('span').textContent = '用选中文案生成图层';
  }
}

async function generateSelectedResizePresets() {
  const selectedPresets = getSelectedResizePresets();
  const totalJobs = selectedPresets.length;

  if (!resizeSourceFile) {
    setResizeMessage('请先上传一张参考图。', true);
    resizeImageInputEl.focus();
    return;
  }

  if (!selectedPresets.length) {
    setResizeMessage('请至少勾选一个要生成的尺寸。', true);
    return;
  }

  resizeResultListEl.hidden = false;
  resizeResultEmptyEl.hidden = true;
  setResizeMessage('正在把参考图提交给 AI 生成，请稍等。');

  try {
    const referencePayload = [{
      name: resizeSourceFile.name || '参考图',
      dataUrl: await fileToDataUrl(resizeSourceFile),
    }];

    activeResizeJobCount += totalJobs;
    resizeResultInfoEl.textContent = `生成中 ${activeResizeJobCount} 个任务`;

    let doneCount = 0;

    for (const preset of selectedPresets) {
      const resultCard = createResizeResultCard(preset);

      try {
        const data = await generateResizePreset(preset, referencePayload);

        if (data.pending && data.taskId) {
          await pollResizeTask(data.taskId, preset, resultCard);
        } else if (data.pending && data.taskIds?.length) {
          await pollResizeTask(data.taskIds[0], preset, resultCard);
        } else {
          updateResizeResultCard(resultCard, {
            ...data,
            targetName: preset.name,
            targetSize: `${preset.width}×${preset.height}`,
          });
          await loadHistory();
        }

        doneCount += 1;
      } catch (error) {
        updateResizeResultCardError(resultCard, error.message);
        setResizeMessage(error.message, true);
      } finally {
        activeResizeJobCount = Math.max(0, activeResizeJobCount - 1);
        if (activeResizeJobCount === 0) {
          await loadHistory();
        }
        resizeResultInfoEl.textContent = activeResizeJobCount
          ? `生成中 ${activeResizeJobCount} 个任务`
          : `已完成，结果共 ${resizeResultListEl.children.length} 张`;
      }
    }

    setResizeMessage(doneCount > 0 ? `本轮已完成 ${doneCount} / ${totalJobs} 张。` : '');
  } catch (error) {
    activeResizeJobCount = Math.max(0, activeResizeJobCount - totalJobs);
    resizeResultInfoEl.textContent = activeResizeJobCount
      ? `生成中 ${activeResizeJobCount} 个任务`
      : `已完成，结果共 ${resizeResultListEl.children.length} 张`;
    setResizeMessage(error.message || '生成失败。', true);
  }
}

async function generateSelectedLayerOptions() {
  const selectedLayers = getSelectedLayerOptions();
  const layerSettings = selectedLayers.map((layer) => getLayerGenerationSettings(layer));

  if (!layerSourceFile) {
    setLayerMessage('请先上传一张参考图。', true);
    layerImageInputEl.focus();
    return;
  }

  if (!selectedLayers.length) {
    setLayerMessage('请至少勾选一个要生成的分层。', true);
    return;
  }

  const pendingItems = selectedLayers.map((layer, index) => createPendingGenerationItems({
    prompt: buildLayerOptionPrompt(layer),
    aspectRatio: layerSettings[index].aspectRatio,
    resolution: layerSettings[index].resolution,
    count: 1,
    kind: 'layer',
    targetName: layer.name,
    targetSize: '分层',
  })[0]);

  layerGenerateSelectedEl.disabled = true;
  layerGenerateSelectedEl.querySelector('span').textContent = '提交中...';
  setLayerMessage('');

  try {
    const referencePayload = [{
      name: layerSourceFile.name || '分层参考图',
      dataUrl: await fileToDataUrl(layerSourceFile),
    }];

    layerGenerateSelectedEl.disabled = false;
    layerGenerateSelectedEl.querySelector('span').textContent = '生成分层';

    (async () => {
      let doneCount = 0;

      await Promise.all(selectedLayers.map(async (layer, index) => {
        layer.aspectRatio = layerSettings[index].aspectRatio;
        layer.resolution = layerSettings[index].resolution;
        const pendingItem = pendingItems[index];

        try {
          const data = await generateLayerOption(layer, referencePayload);

          if (data.pending && data.taskId) {
            updatePendingGenerationItem(pendingItem.localId, {
              taskId: data.taskId,
              status: 'polling',
              statusText: '等待生成结果',
            });
            await pollLayerTask(data.taskId, layer, pendingItem);
          } else if (data.pending && data.taskIds?.length) {
            updatePendingGenerationItem(pendingItem.localId, {
              taskId: data.taskIds[0],
              status: 'polling',
              statusText: '等待生成结果',
            });
            await pollLayerTask(data.taskIds[0], layer, pendingItem);
          } else {
            removePendingGenerationItems([pendingItem]);
            await loadHistory();
          }

          doneCount += 1;
        } catch (error) {
          failPendingGenerationItems([pendingItem], error.message);
          setLayerMessage(error.message, true);
        }
      }));

      if (doneCount === selectedLayers.length) {
        setLayerMessage('');
      }
    })();
  } catch (error) {
    failPendingGenerationItems(pendingItems, error.message);
    setLayerMessage(error.message || '分层生成失败。', true);
    layerGenerateSelectedEl.disabled = false;
    layerGenerateSelectedEl.querySelector('span').textContent = '生成分层';
  }
}

function clearImageResult() {
  selectedHistoryId = '';
  currentPreview = null;
  resultFrameEl.hidden = true;
  resultFrameEl.dataset.imageUrl = '';
  resultFrameEl.style.backgroundImage = '';
  emptyEl.hidden = false;
  previewPanelEl.classList.remove('has-result');
  sendToResizeEl.hidden = true;
  sendToLayerEl.hidden = true;
  sendToPhotoshopEl.hidden = true;
  downloadEl.hidden = true;
  fullscreenEl.hidden = true;
}

function normalizePreviewData(data, imageUrl) {
  const item = data.historyItem || data;
  const size = item.size || data.size || data.aspectRatio || aspectRatioEl.value || '-';

  return {
    id: item.id || data.id || '',
    imageUrl: data.imageUrl || item.imageUrl || imageUrl,
    displayUrl: imageUrl,
    prompt: item.prompt || data.prompt || promptEl.value.trim() || '未记录提示词',
    size,
    resolution: item.resolution || data.resolution || resolutionEl.value || '-',
    model: item.model || data.model || modelEl.value || '-',
    aspectRatio: item.aspectRatio || data.aspectRatio || inferAspectRatio(size),
    referenceImages: item.referenceImages || data.referenceImages || [],
    kind: item.kind || data.kind || '',
  };
}

function inferAspectRatio(size) {
  const map = {
    auto: 'auto',
    '1:1': 'square',
    '16:9': 'widescreen',
    '9:16': 'story',
    '4:3': 'landscape',
    '3:4': 'portrait',
    '3:2': 'classic',
    '2:3': 'verticalClassic',
    '5:4': 'fiveFour',
    '4:5': 'fourFive',
    '3:1': 'tripleWide',
    '1:3': 'tripleTall',
    '2:1': 'panorama',
    '1:2': 'tall',
    '21:9': 'cinema',
    '9:21': 'verticalCinema',
  };

  return map[size] || aspectRatioEl.value || 'auto';
}

function renderImageResult(data) {
  if (data.id) {
    selectedHistoryId = data.id;
  } else if (data.historyItem?.id) {
    selectedHistoryId = data.historyItem.id;
  }

  const rawImageUrl = data.imageUrl || data.historyItem?.imageUrl;
  if (!rawImageUrl) {
    return;
  }

  const imageUrl = `${rawImageUrl}${rawImageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
  currentPreview = normalizePreviewData(data, imageUrl);
  resultFrameEl.hidden = false;
  resultFrameEl.dataset.imageUrl = imageUrl;
  resultFrameEl.style.backgroundImage = `url("${imageUrl}")`;
  emptyEl.hidden = true;
  previewPanelEl.classList.add('has-result');
  sendToResizeEl.hidden = false;
  sendToLayerEl.hidden = false;
  sendToPhotoshopEl.hidden = false;
  downloadEl.href = rawImageUrl;
  downloadEl.download = '';
  downloadEl.hidden = false;
  fullscreenEl.hidden = false;

  if (shouldAutoTransparentize(data)) {
    getTransparentLayerAsset(data).then((asset) => {
      if (!currentPreview || currentPreview.id !== (data.id || data.historyItem?.id || '')) {
        return;
      }

      currentPreview.displayUrl = asset.objectUrl;
      currentPreview.transparentDataUrl = asset.dataUrl;
      currentPreview.transparentFileName = asset.fileName;
      resultFrameEl.dataset.imageUrl = asset.objectUrl;
      resultFrameEl.style.backgroundImage = `url("${asset.objectUrl}")`;
      downloadEl.href = asset.objectUrl;
      downloadEl.download = asset.fileName;
      if (!imageModalEl.hidden) {
        refreshOpenModal();
      }
    }).catch(() => {});
  }
}

function getCurrentHistoryIndex() {
  if (!historyItems.length || !selectedHistoryId) {
    return -1;
  }

  return historyItems.findIndex((item) => item.id === selectedHistoryId);
}

function updateModalNav() {
  const hasMultipleImages = modalMode === 'single'
    ? false
    : modalMode === 'cutout'
    ? cutoutState.previews.length > 1
    : historyItems.length > 1;
  modalPrevEl.hidden = !hasMultipleImages;
  modalNextEl.hidden = !hasMultipleImages;
}

function refreshOpenModal() {
  if (imageModalEl.hidden || !currentPreview) {
    return;
  }

  resetModalImageView();
  modalImageEl.src = currentPreview.displayUrl || currentPreview.imageUrl;
  modalDownloadEl.href = currentPreview.imageUrl || currentPreview.displayUrl;
  modalPromptEl.textContent = currentPreview.prompt || '未记录提示词';
  renderModalReferences(currentPreview.referenceImages || []);
  modalRatioEl.textContent = currentPreview.targetSize
    ? `画布 GPT ${getAspectRatioText(currentPreview.aspectRatio)} · 内容 ${currentPreview.targetRatio || currentPreview.targetSize}`
    : (currentPreview.size || '-');
  modalResolutionEl.textContent = currentPreview.resolution || '-';
  modalModelEl.textContent = currentPreview.model || modelEl.value || '-';
  updateModalNav();
}

function navigateModal(delta) {
  if (modalMode === 'single') {
    return;
  }

  if (modalMode === 'cutout') {
    if (cutoutState.previews.length <= 1) {
      return;
    }

    const nextIndex = (cutoutPreviewIndex + delta + cutoutState.previews.length) % cutoutState.previews.length;
    openCutoutPreviewModal(nextIndex);
    return;
  }

  if (historyItems.length <= 1) {
    return;
  }

  const currentIndex = getCurrentHistoryIndex();
  const nextIndex = currentIndex === -1
    ? 0
    : (currentIndex + delta + historyItems.length) % historyItems.length;

  renderImageResult(historyItems[nextIndex]);
  syncHistorySelection();
  refreshOpenModal();
}

function openSingleImageModal({ imageUrl, downloadName = '', title = '上传图片预览' }) {
  if (!imageUrl) {
    return;
  }

  modalMode = 'single';
  imageModalEl.classList.add('modal-simple');
  resetModalImageView();
  modalImageEl.src = imageUrl;
  modalDownloadEl.href = imageUrl;
  modalDownloadEl.download = downloadName;
  modalPromptEl.textContent = title;
  renderModalReferences([]);
  modalRatioEl.textContent = '-';
  modalResolutionEl.textContent = '-';
  modalModelEl.textContent = '上传图片预览';
  modalRegenerateEl.hidden = true;
  updateModalNav();
  showImageModal();
}

function makeImageOpenable(image, imageUrl, title = '上传图片预览') {
  if (!image || !imageUrl) {
    return;
  }

  const openPreview = (event) => {
    event.stopPropagation();
    openSingleImageModal({
      imageUrl,
      downloadName: image.alt || '',
      title,
    });
  };

  image.classList.add('openable-image');
  image.title = '双击全屏查看';
  image.addEventListener('dblclick', openPreview);
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPreview(event);
    }
  });
  if (!image.hasAttribute('tabindex')) {
    image.tabIndex = 0;
  }
}

function isTemporaryTaskQueryFailure(error, data = null) {
  const message = String(error?.message || data?.error || '');
  return /failed to fetch|networkerror|load failed|timeout|超时|temporarily|查询任务失败/i.test(message);
}

function showErrorDetail(message) {
  const detail = String(message || '').trim();
  if (!detail) {
    return;
  }
  window.alert(detail);
}

function attachPendingErrorDetail(card, item) {
  if (!card || item?.status !== 'failed') {
    return;
  }

  const detail = String(item.statusText || '生成失败').trim();
  card.title = '双击查看完整错误';
  card.addEventListener('dblclick', (event) => {
    event.preventDefault();
    event.stopPropagation();
    showErrorDetail(detail);
  });
}

function isPossiblyCompletedUpstreamGenerationError(error) {
  const message = String(error?.message || error || '');
  return /上游 API 响应超时|上游生图 API 超时|timeout|超时|524/i.test(message);
}

async function pollTask(taskId, meta, pendingItem = null) {
  const provider = String(pendingItem?.provider || meta?.provider || '').trim();
  const query = provider ? `?provider=${encodeURIComponent(provider)}` : '';

  for (let attempt = 1; attempt <= imageTaskPollAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    if (pendingItem) {
      updatePendingGenerationItem(pendingItem.localId, {
        status: 'polling',
        statusText: `生成中，第 ${attempt} 次查询`,
      });
    }

    let response;
    let data;

    try {
      response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}${query}`);
      data = await response.json();
    } catch (error) {
      if (pendingItem) {
        updatePendingGenerationItem(pendingItem.localId, {
          status: 'polling',
          statusText: '查询网络波动，后台继续生成',
        });
      }
      continue;
    }

    if (!response.ok) {
      if (isTemporaryTaskQueryFailure(null, data)) {
        if (pendingItem) {
          updatePendingGenerationItem(pendingItem.localId, {
            status: 'polling',
            statusText: '查询暂时失败，后台继续生成',
          });
        }
        continue;
      }

      throw new Error(data.error || '查询任务失败');
    }

    if (data.status === 'completed' && data.imageUrl) {
      if (pendingItem) {
        removePendingGenerationItems([pendingItem]);
      }
      renderImageResult(data);
      setMessage(`生成好了。比例：${meta.size}，分辨率：${meta.resolution}`);
      await loadHistory();
      return data;
    }

    if (data.status === 'failed') {
      if (pendingItem) {
        updatePendingGenerationItem(pendingItem.localId, {
          status: 'failed',
          statusText: data.error || '任务失败',
        });
      }
      throw new Error(data.error || '任务失败');
    }
  }

  if (pendingItem) {
    updatePendingGenerationItem(pendingItem.localId, {
      status: 'polling',
      statusText: '后台继续生成，稍后刷新历史',
    });
  }
  setMessage(`任务 ${taskId} 已提交，后台会继续生成。稍后刷新生成记录即可。`);
  return { taskId, status: 'processing' };
}

async function pollTasks(taskIds, meta, pendingItems = []) {
  await Promise.all(taskIds.map((taskId, index) => pollTask(taskId, meta, pendingItems[index])));
}

loadModelsEl.addEventListener('click', async () => {
  loadModelsEl.disabled = true;
  loadModelsEl.textContent = '读取中';
  modelHintEl.textContent = '正在读取模型列表...';

  try {
    const response = await fetch('/api/models');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '读取模型失败');
    }

    const imageModels = data.imageModels?.length ? data.imageModels : ['gpt-image-2'];
    updateModelOptions(imageModels, imageModels);
    updateChatModelOptions(data.chatModels?.length ? data.chatModels : [], data.activeChatModel || chatModelInputEl.value.trim());
    syncChatModelInputs(data.activeChatModel || chatModelInputEl.value.trim() || chatModelInputSettingsEl.value.trim() || defaultChatModel);
    modelHintEl.textContent = data.imageModels?.length
      ? `读取成功，找到 ${data.imageModels.length} 个图片相关模型。`
      : `读取成功，共 ${data.models?.length || 0} 个模型。`;
  } catch (error) {
    modelHintEl.textContent = error.message;
    setMessage(error.message, true);
  } finally {
    loadModelsEl.disabled = false;
    loadModelsEl.textContent = '读取模型';
  }
});

loadChatModelsEl.addEventListener('click', async () => {
  loadChatModelsEl.disabled = true;
  loadChatModelsEl.textContent = '读取中';
  setChatMessage('正在读取聊天模型列表...');

  try {
    const response = await fetch('/api/models');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '读取模型失败');
    }

    const chatModels = data.chatModels?.length ? data.chatModels : [];
    const preferredChatModel = data.activeChatModel || chatModelInputEl.value.trim() || chatModelInputSettingsEl.value.trim() || defaultChatModel;
    updateChatModelOptions(chatModels, preferredChatModel);
    syncChatModelInputs(preferredChatModel);
    setChatMessage(chatModels.length
      ? `读取成功，找到 ${chatModels.length} 个聊天模型：${chatModels.slice(0, 5).join('、')}。`
      : '读取成功，但没有筛到明显的聊天模型。你仍然可以手动输入模型名。');
  } catch (error) {
    setChatMessage(error.message, true);
  } finally {
    loadChatModelsEl.disabled = false;
    loadChatModelsEl.textContent = '读取模型';
  }
});

chatImageInputEl.addEventListener('change', async () => {
  const files = [...(chatImageInputEl.files || [])].filter((file) => file.type.startsWith('image/'));
  if (!files.length) {
    return;
  }

  try {
    const attachments = await Promise.all(files.map(async (file) => ({
      dataUrl: await compressImageFileToDataUrl(file, {
        maxDimension: 1280,
        mimeType: 'image/jpeg',
        quality: 0.86,
      }),
      name: file.name || 'upload.jpg',
    })));
    chatImageAttachments = [...chatImageAttachments, ...attachments];
    renderChatImagePreview();
    chatImageInputEl.value = '';
    setChatMessage(`\u5df2\u6dfb\u52a0 ${attachments.length} \u5f20\u56fe\u7247\uff0c\u53ef\u4ee5\u8f93\u5165\u95ee\u9898\u540e\u53d1\u9001\u3002`);
  } catch (error) {
    chatImageInputEl.value = '';
    setChatMessage(error.message || '\u56fe\u7247\u8bfb\u53d6\u5931\u8d25\u3002', true);
  }
});

chatFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  await submitChatMessage();
});

chatInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatFormEl.requestSubmit();
  }
});

chatInputEl.addEventListener('input', syncChatInputSize);
syncChatInputSize();

chatPresetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveChatPreset(button.dataset.chatPreset || 'general');
    setMobileChatToolsOpen(false);
    chatInputEl.focus();
  });

  button.addEventListener('contextmenu', (event) => {
    openChatPresetMenu(event, button.dataset.chatPreset || 'general');
  });
});

chatToolToggleEl?.addEventListener('click', () => {
  setMobileChatToolsOpen(!chatPageEl.classList.contains('chat-tools-page-open'));
});

clearChatTodayEl?.addEventListener('click', clearTodayChat);

saveChatCustomPresetEl?.addEventListener('click', () => {
  saveChatCustomPreset({ activate: false });
});

useChatCustomPresetEl?.addEventListener('click', () => {
  saveChatCustomPreset({ activate: true, closeTools: true });
});

chatPresetMenuEl?.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-chat-preset-action]');
  if (!actionButton || !chatPresetMenuTargetId) {
    return;
  }

  if (actionButton.dataset.chatPresetAction === 'edit') {
    openChatPresetEditor(chatPresetMenuTargetId);
  } else if (actionButton.dataset.chatPresetAction === 'delete') {
    deleteChatPreset(chatPresetMenuTargetId);
  }
});

chatPresetEditorFormEl?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
    event.preventDefault();
  }
});

chatPresetEditorFormEl?.addEventListener('submit', (event) => {
  event.preventDefault();
});

saveChatPresetEditorEl?.addEventListener('click', saveChatPresetEditor);

closeChatPresetEditorEl?.addEventListener('click', closeChatPresetEditor);
cancelChatPresetEditorEl?.addEventListener('click', closeChatPresetEditor);

chatPresetEditorFormEl?.addEventListener('click', (event) => {
  event.stopPropagation();
});

document.addEventListener('click', (event) => {
  if (!chatPresetMenuEl || chatPresetMenuEl.hidden || chatPresetMenuEl.contains(event.target)) {
    return;
  }
  closeChatPresetMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeChatPresetMenu();
    closeChatPresetEditor();
  }
});

window.addEventListener('resize', closeChatPresetMenu);

initializeChatPresets();

async function saveCurrentChatModelSetting() {
  const chatModel = chatModelInputEl.value.trim() || chatModelInputSettingsEl.value.trim() || defaultChatModel;

  if (!hasSavedImageApiKey) {
    return;
  }

  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: '',
        chatApiKey: chatApiKeyInputEl.value.trim(),
        apiEntryName: apiEntryNameInputEl.value.trim(),
        model: imageModelInputEl.value.trim() || modelEl.value.trim() || 'gpt-image-2',
        chatModel,
        baseUrl: baseUrlInputEl.value.trim(),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '聊天模型保存失败');
    }

    syncChatModelInputs(data.chatModel || chatModel);
    apiKeyStatusEl.textContent = `聊天模型已保存：${data.chatModel || chatModel}`;
    apiKeyStatusEl.className = 'api-key-status ok';
  } catch (error) {
    apiKeyStatusEl.textContent = error.message;
    apiKeyStatusEl.className = 'api-key-status error';
  }
}

chatModelInputEl.addEventListener('change', () => {
  syncChatModelInputs(chatModelInputEl.value.trim() || chatModelInputSettingsEl.value.trim() || defaultChatModel);
  saveCurrentChatModelSetting();
});

chatModelInputSettingsEl.addEventListener('change', () => {
  syncChatModelInputs(chatModelInputSettingsEl.value.trim() || chatModelInputEl.value.trim() || defaultChatModel);
  saveCurrentChatModelSetting();
});

sideNavButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.sideNav;

    if (target === 'toolbox') {
      showToolboxPage();
      return;
    }

    if (target === 'settings') {
      showSettingsPage();
      return;
    }

    if (target === 'chat') {
      showChatPage();
      return;
    }

    if (target === 'template') {
      showResizePage();
      return;
    }

    if (target === 'layers') {
      showLayerPage();
      return;
    }

    if (target === 'gallery') {
      showGalleryPage();
      return;
    }

    if (target === 'help') {
      showHelpPage();
      return;
    }

    showGeneratorPage();
    setActiveSideNav(target);

    if (target === 'history') {
      historySectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

resizeImageInputEl.addEventListener('change', () => {
  loadResizeImage(resizeImageInputEl.files?.[0]);
});

resizeUploadEl?.addEventListener('dragover', (event) => {
  event.preventDefault();
  resizeUploadEl.classList.add('dragging');
});

resizeUploadEl?.addEventListener('dragleave', () => {
  resizeUploadEl.classList.remove('dragging');
});

resizeUploadEl?.addEventListener('drop', (event) => {
  event.preventDefault();
  resizeUploadEl.classList.remove('dragging');
  loadResizeImage(event.dataTransfer?.files?.[0]);
});

layerImageInputEl.addEventListener('change', () => {
  loadLayerImage(layerImageInputEl.files?.[0]);
});

layerUploadEl?.addEventListener('dragover', (event) => {
  event.preventDefault();
  layerUploadEl.classList.add('dragging');
});

layerUploadEl?.addEventListener('dragleave', () => {
  layerUploadEl.classList.remove('dragging');
});

layerUploadEl?.addEventListener('drop', (event) => {
  event.preventDefault();
  layerUploadEl.classList.remove('dragging');

  const imageFile = [...(event.dataTransfer?.files || [])]
    .find((file) => file.type.startsWith('image/'));

  if (!imageFile) {
    setLayerMessage('请拖拽 JPG / PNG / WebP 图片文件。', true);
    return;
  }

  loadLayerImage(imageFile);
});

cutTemplateInputEl.addEventListener('change', async () => {
  try {
    await loadCutoutTemplate(cutTemplateInputEl.files?.[0]);
  } catch (error) {
    setCutMessage(error.message || 'SVG 模板读取失败。', true);
  } finally {
    cutTemplateInputEl.value = '';
  }
});

openCutoutToolEl.addEventListener('click', showCutoutTool);
openIconRedrawToolEl.addEventListener('click', showIconRedrawTool);
openImageEditToolEl.addEventListener('click', showImageEditTool);
openPromptGalleryToolEl.addEventListener('click', showPromptGalleryTool);
openImportantGalleryToolEl.addEventListener('click', showImportantGalleryTool);
backToToolboxHomeEl.addEventListener('click', () => {
  showToolboxPage();
});
backToToolboxHomeFromIconEl.addEventListener('click', () => {
  showToolboxPage();
});
backToToolboxHomeFromEditEl.addEventListener('click', () => {
  showToolboxPage();
});
backToToolboxHomeFromPromptEl.addEventListener('click', () => {
  showToolboxPage();
});
backToToolboxHomeFromImportantEl.addEventListener('click', () => {
  showToolboxPage();
});
togglePromptGalleryFormEl.addEventListener('click', () => {
  const willShow = promptSavePanelEl.hidden;
  clearPromptGalleryForm();
  promptSavePanelEl.hidden = !willShow;
  togglePromptGalleryFormEl.textContent = willShow ? '收起添加' : '添加 Prompt';
  if (willShow) {
    promptGalleryTitleEl.focus();
  }
});
cancelPromptGalleryFormEl.addEventListener('click', () => {
  clearPromptGalleryForm();
  promptSavePanelEl.hidden = true;
  setPromptGalleryMessage('');
});

promptGalleryImageEl.addEventListener('change', async () => {
  const file = promptGalleryImageEl.files?.[0];
  if (!file) {
    promptGalleryImageDataUrl = '';
    renderPromptGalleryImagePreview('');
    return;
  }

  try {
    promptGalleryImageDataUrl = await compressImageFileToDataUrl(file, {
      maxDimension: 900,
      mimeType: 'image/jpeg',
      quality: 0.82,
    });
    renderPromptGalleryImagePreview(promptGalleryImageDataUrl);
    setPromptGalleryMessage('');
  } catch (error) {
    promptGalleryImageDataUrl = '';
    renderPromptGalleryImagePreview('');
    setPromptGalleryMessage(error.message || '图片读取失败。', true);
  }
});

savePromptGalleryItemEl.addEventListener('click', savePromptGalleryItem);

imageEditInputEl.addEventListener('change', async () => {
  try {
    await loadImageEditSource(imageEditInputEl.files?.[0]);
  } catch (error) {
    setImageEditMessage(error.message || '图片读取失败。', true);
  } finally {
    imageEditInputEl.value = '';
  }
});

imageEditModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setImageEditMode(button.dataset.imageEditMode);
  });
});

function setImageEditBrushSize(value, shouldMessage = true) {
  const min = Number(imageEditBrushEl.min || 12);
  const max = Number(imageEditBrushEl.max || 160);
  const nextValue = Math.round(clamp(Number(value || imageEditBrushEl.value), min, max));
  imageEditBrushEl.value = String(nextValue);
  imageEditBrushValueEl.textContent = String(nextValue);

  if (shouldMessage && !imageEditToolEl.hidden) {
    setImageEditMessage(`画笔大小：${nextValue}`);
  }
}

imageEditBrushEl.addEventListener('input', () => {
  setImageEditBrushSize(imageEditBrushEl.value);
});

imageEditClearMaskEl.addEventListener('click', () => {
  imageEditState.maskCanvas.getContext('2d')?.clearRect(0, 0, imageEditState.maskCanvas.width, imageEditState.maskCanvas.height);
  clearImageEditResult();
  renderImageEditCanvas();
  setImageEditMessage('涂抹已清空。');
});

imageEditFitEl.addEventListener('click', () => {
  resetImageEditView();
  renderImageEditCanvas();
});

imageEditGenerateEl.addEventListener('click', async () => {
  await generateImageEdit();
});

imageEditCanvasEl.addEventListener('pointerdown', (event) => {
  if (!imageEditState.source) {
    setImageEditMessage('先上传要编辑的图片。', true);
    return;
  }

  if (imageEditState.mode === 'expand' && event.button === 0 && startImageEditOutpaintDrag(event)) {
    event.preventDefault();
    return;
  }

  if (event.button === 1 || event.button === 2 || imageEditState.view.spaceDown) {
    event.preventDefault();
    imageEditState.view.isPanning = true;
    imageEditState.view.lastX = event.clientX;
    imageEditState.view.lastY = event.clientY;
    imageEditCanvasEl.classList.add('image-edit-panning');
    imageEditCanvasEl.setPointerCapture(event.pointerId);
    return;
  }

  const point = getImageEditCanvasPoint(event);
  imageEditState.drawing = true;
  imageEditState.lastPoint = point;
  drawImageEditMaskStroke(point, point);
  imageEditCanvasEl.setPointerCapture(event.pointerId);
  clearImageEditResult();
  renderImageEditCanvas();
});

imageEditCanvasEl.addEventListener('pointermove', (event) => {
  if (updateImageEditOutpaintDrag(event)) {
    return;
  }

  if (imageEditState.view.isPanning) {
    const deltaX = event.clientX - imageEditState.view.lastX;
    const deltaY = event.clientY - imageEditState.view.lastY;
    imageEditState.view.x += deltaX;
    imageEditState.view.y += deltaY;
    imageEditState.view.lastX = event.clientX;
    imageEditState.view.lastY = event.clientY;
    renderImageEditCanvas();
    return;
  }

  if (!imageEditState.drawing || imageEditState.mode === 'expand') {
    return;
  }

  const point = getImageEditCanvasPoint(event);
  drawImageEditMaskStroke(imageEditState.lastPoint || point, point);
  imageEditState.lastPoint = point;
  renderImageEditCanvas();
});

imageEditCanvasEl.addEventListener('pointerup', () => {
  imageEditState.drawing = false;
  imageEditState.lastPoint = null;
  endImageEditOutpaintDrag();
  imageEditState.view.isPanning = false;
  imageEditCanvasEl.classList.remove('image-edit-panning');
});

imageEditCanvasEl.addEventListener('pointercancel', () => {
  imageEditState.drawing = false;
  imageEditState.lastPoint = null;
  endImageEditOutpaintDrag();
  imageEditState.view.isPanning = false;
  imageEditCanvasEl.classList.remove('image-edit-panning');
  renderImageEditCanvas();
});

imageEditCanvasEl.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

imageEditCanvasEl.addEventListener('wheel', (event) => {
  if (!imageEditState.source) {
    return;
  }

  event.preventDefault();
  const shellRect = imageEditCanvasShellEl.getBoundingClientRect();
  const before = getImageEditDocumentPoint(event);
  const viewportX = event.clientX - shellRect.left;
  const viewportY = event.clientY - shellRect.top;
  const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
  imageEditState.view.zoom = clamp((imageEditState.view.zoom || 1) * zoomFactor, 0.35, 6);
  resizeImageEditCanvas();
  renderImageEditCanvas();
  imageEditCanvasShellEl.scrollLeft = before.x * imageEditState.view.scale - viewportX;
  imageEditCanvasShellEl.scrollTop = before.y * imageEditState.view.scale - viewportY;
}, { passive: false });

iconRedrawInputEl.addEventListener('change', async () => {
  try {
    await loadIconRedrawSource(iconRedrawInputEl.files?.[0]);
  } catch (error) {
    setIconRedrawMessage(error.message || 'Icon 读取失败。', true);
  } finally {
    iconRedrawInputEl.value = '';
  }
});

iconRedrawUploadEl?.addEventListener('dragover', (event) => {
  event.preventDefault();
  iconRedrawUploadEl.classList.add('dragging');
});

iconRedrawUploadEl?.addEventListener('dragleave', () => {
  iconRedrawUploadEl.classList.remove('dragging');
});

iconRedrawUploadEl?.addEventListener('drop', async (event) => {
  event.preventDefault();
  iconRedrawUploadEl.classList.remove('dragging');

  const imageFile = [...(event.dataTransfer?.files || [])]
    .find((file) => file.type.startsWith('image/'));

  if (!imageFile) {
    setIconRedrawMessage('请拖拽 JPG / PNG / WebP 图片文件。', true);
    return;
  }

  try {
    await loadIconRedrawSource(imageFile, { source: 'drop' });
  } catch (error) {
    setIconRedrawMessage(error.message || 'Icon 读取失败。', true);
  }
});

iconRedrawGenerateEl.addEventListener('click', async () => {
  await generateIconRedraw();
});

iconRedrawClearEl.addEventListener('click', () => {
  iconRedrawState.selections = [];
  iconRedrawState.referenceDataUrl = '';
  clearIconRedrawResult();
  renderIconRedrawCanvas();
  setIconRedrawMessage('框选已清空。');
});

iconRedrawResetViewEl.addEventListener('click', () => {
  resetIconRedrawView();
  renderIconRedrawCanvas();
});

iconRedrawMergeEl.addEventListener('click', () => {
  try {
    const dataUrl = composeIconSelections();
    renderIconRedrawResult({
      imageUrl: dataUrl,
      title: '合并参考图',
      downloadName: `icon-sheet-${Date.now()}.png`,
      downloadText: '下载合并图',
    });
    setIconRedrawMessage('已把框选的区域合并成一张参考图。');
  } catch (error) {
    setIconRedrawMessage(error.message, true);
  }
});

iconRedrawCanvasEl.addEventListener('pointerdown', (event) => {
  if (!iconRedrawState.source) {
    setIconRedrawMessage('先上传一张需要局部重绘的图片。', true);
    return;
  }

  if (event.button === 1 || event.button === 2 || iconRedrawState.view.spaceDown) {
    event.preventDefault();
    iconRedrawState.view.isPanning = true;
    iconRedrawState.view.lastX = event.clientX;
    iconRedrawState.view.lastY = event.clientY;
    iconRedrawCanvasEl.classList.add('icon-redraw-panning');
    iconRedrawCanvasEl.setPointerCapture(event.pointerId);
    return;
  }

  iconRedrawCanvasEl.setPointerCapture(event.pointerId);
  const point = getIconRedrawCanvasPoint(event);
  iconRedrawState.drawing = {
    startX: point.x,
    startY: point.y,
    x: point.x,
    y: point.y,
  };
  renderIconRedrawCanvas();
});

iconRedrawCanvasEl.addEventListener('pointermove', (event) => {
  if (iconRedrawState.view.isPanning) {
    const deltaX = event.clientX - iconRedrawState.view.lastX;
    const deltaY = event.clientY - iconRedrawState.view.lastY;
    iconRedrawState.view.x += deltaX;
    iconRedrawState.view.y += deltaY;
    iconRedrawState.view.lastX = event.clientX;
    iconRedrawState.view.lastY = event.clientY;
    renderIconRedrawCanvas();
    return;
  }

  if (!iconRedrawState.drawing) {
    return;
  }

  const point = getIconRedrawCanvasPoint(event);
  iconRedrawState.drawing.x = point.x;
  iconRedrawState.drawing.y = point.y;
  renderIconRedrawCanvas();
});

iconRedrawCanvasEl.addEventListener('pointerup', (event) => {
  if (iconRedrawState.view.isPanning) {
    iconRedrawState.view.isPanning = false;
    iconRedrawCanvasEl.classList.remove('icon-redraw-panning');
    return;
  }

  if (!iconRedrawState.drawing) {
    return;
  }

  const point = getIconRedrawCanvasPoint(event);
  const box = normalizeIconSelection({
    startX: iconRedrawState.drawing.startX,
    startY: iconRedrawState.drawing.startY,
    x: point.x,
    y: point.y,
  });
  iconRedrawState.drawing = null;

  if (box.width >= 8 && box.height >= 8) {
    iconRedrawState.selections.push(box);
    iconRedrawState.referenceDataUrl = '';
    clearIconRedrawResult();
    setIconRedrawMessage(`已框选 ${iconRedrawState.selections.length} 个区域。`);
  }

  renderIconRedrawCanvas();
});

iconRedrawCanvasEl.addEventListener('pointercancel', () => {
  iconRedrawState.drawing = null;
  iconRedrawState.view.isPanning = false;
  iconRedrawCanvasEl.classList.remove('icon-redraw-panning');
  renderIconRedrawCanvas();
});

iconRedrawCanvasEl.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

iconRedrawCanvasEl.addEventListener('wheel', (event) => {
  if (!iconRedrawState.source) {
    return;
  }

  event.preventDefault();
  const before = getIconRedrawCanvasPoint(event);
  const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
  const view = iconRedrawState.view;
  const nextScale = clamp(view.scale * zoomFactor, 0.1, 12);
  const rect = iconRedrawCanvasEl.getBoundingClientRect();
  const canvasX = (event.clientX - rect.left) * (iconRedrawCanvasEl.width / rect.width);
  const canvasY = (event.clientY - rect.top) * (iconRedrawCanvasEl.height / rect.height);

  view.scale = nextScale;
  view.x = canvasX - before.x * nextScale;
  view.y = canvasY - before.y * nextScale;
  renderIconRedrawCanvas();
}, { passive: false });

window.addEventListener('keydown', (event) => {
  if (!imageEditToolEl.hidden && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '')) {
    if (event.key === '+' || event.key === '=' || event.code === 'NumpadAdd') {
      event.preventDefault();
      setImageEditBrushSize(Number(imageEditBrushEl.value) + 4);
      return;
    }

    if (event.key === '-' || event.key === '_' || event.code === 'NumpadSubtract') {
      event.preventDefault();
      setImageEditBrushSize(Number(imageEditBrushEl.value) - 4);
      return;
    }
  }

  if (event.code === 'Space' && !event.repeat) {
    iconRedrawState.view.spaceDown = true;
    imageEditState.view.spaceDown = true;
    if (!iconRedrawState.drawing) {
      iconRedrawCanvasEl.classList.add('icon-redraw-pan-ready');
    }
    if (!imageEditState.drawing) {
      imageEditCanvasEl.classList.add('image-edit-pan-ready');
    }
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    iconRedrawState.view.spaceDown = false;
    imageEditState.view.spaceDown = false;
    iconRedrawCanvasEl.classList.remove('icon-redraw-pan-ready');
    imageEditCanvasEl.classList.remove('image-edit-pan-ready');
  }
});

window.addEventListener('resize', () => {
  if (iconRedrawState.source && !iconRedrawToolEl.hidden) {
    resizeIconRedrawCanvas();
    resetIconRedrawView();
    renderIconRedrawCanvas();
  }
  if (imageEditState.source && !imageEditToolEl.hidden) {
    resizeImageEditCanvas();
    resetImageEditView();
    renderImageEditCanvas();
  }
});

setImageEditBrushSize(imageEditBrushEl.value, false);

cutPhotoInputEl.addEventListener('change', async () => {
  try {
    await loadCutoutPhotos(cutPhotoInputEl.files || []);
  } catch (error) {
    setCutMessage(error.message || '照片读取失败。', true);
  }
});

document.addEventListener('paste', async (event) => {
  const imageFiles = getClipboardImageFiles(event);

  if (!iconRedrawToolEl.hidden) {
    if (!imageFiles.length) {
      return;
    }

    event.preventDefault();
    try {
      await loadIconRedrawSource(imageFiles[0], { source: 'paste' });
    } catch (error) {
      setIconRedrawMessage(error.message || '粘贴图片失败。', true);
    }
    return;
  }

  if (cutoutToolEl.hidden) {
    try {
      if (await addResizeImageFromClipboard(event)) {
        return;
      }

      await addReferenceFilesFromClipboard(event);
    } catch (error) {
      setMessage(error.message || '粘贴参考图失败。', true);
    }
    return;
  }

  if (!imageFiles.length) {
    return;
  }

  event.preventDefault();
  try {
    await loadCutoutPhotos(imageFiles, { source: 'paste' });
  } catch (error) {
    setCutMessage(error.message || '粘贴图片失败。', true);
  }
});

cutCanvasEl.addEventListener('pointerdown', (event) => {
  if (event.button === 1) {
    return;
  }

  if (event.button !== 0) {
    return;
  }

  if (!cutoutState.template) {
    setCutMessage('先上传 SVG 模板。', true);
    return;
  }

  cutCanvasEl.setPointerCapture(event.pointerId);
  const start = getCutCanvasPoint(event);
  const photoHit = hitCutPhotoLayer(start);

  if (photoHit) {
    const currentPhoto = getCurrentCutoutPhoto();
    const original = { ...getCutPhotoTransform(currentPhoto, photoHit.index) };
    const geometry = getCutPhotoBoundaryGeometry(currentPhoto, cutoutState.masks[photoHit.index], photoHit.index);
    const startDistance = Math.max(1, Math.hypot(start.x - geometry.worldCenter.x, start.y - geometry.worldCenter.y));
    const startAngle = Math.atan2(start.y - geometry.worldCenter.y, start.x - geometry.worldCenter.x);

    cutoutState.selectedIndex = photoHit.index;
    cutoutState.activeLayer = 'photo';
    cutoutState.interaction = {
      ...photoHit,
      start,
      center: geometry.worldCenter,
      startDistance,
      startAngle,
      original,
    };
    updateCutCanvasCursor(start);
    renderCutCanvas();
    updateCutoutMeta();
    return;
  }

  const hit = findCutMaskAtPoint(start);

  if (hit) {
    cutoutState.selectedIndex = hit.index;
    const currentPhoto = getCurrentCutoutPhoto();
    const isPhotoLayerDrag = currentPhoto
      && hitCutMask(start, cutoutState.masks[hit.index])
      && (cutoutState.activeLayer === 'photo' || event.shiftKey);

    if (isPhotoLayerDrag) {
      cutoutState.activeLayer = 'photo';
      cutoutState.interaction = {
        index: hit.index,
        mode: 'photo-move',
        handle: '',
        start,
        original: { ...getCutPhotoTransform(currentPhoto, hit.index) },
      };
      updateCutCanvasCursor(start);
      renderCutCanvas();
      updateCutoutMeta();
      setCutMessage('正在调整照片图层，蒙版框保持不变。');
      return;
    }

    cutoutState.activeLayer = 'mask';
    cutoutState.interaction = {
      ...hit,
      start,
      original: cloneCutMask(cutoutState.masks[hit.index]),
    };
    updateCutCanvasCursor(start);
    renderCutCanvas();
    updateCutoutMeta();
    return;
  }

  if (cutoutState.template?.source === 'svg') {
    cutCanvasEl.releasePointerCapture(event.pointerId);
    cutoutState.selectedIndex = -1;
    cutoutState.activeLayer = 'mask';
    updateCutoutMeta();
    renderCutCanvas();
    setCutMessage('请点击右侧 SVG 图层生成照片区域。');
    return;
  }

  cutoutState.selectedIndex = -1;
  cutoutState.activeLayer = 'mask';
  cutoutState.drawing = {
    ...normalizeCutRect(start, start),
    radius: getCutRadiusValue(),
    rotation: 0,
    start,
  };
});

cutCanvasEl.addEventListener('pointermove', (event) => {
  const point = getCutCanvasPoint(event);

  if (cutoutState.interaction) {
    updateCutMaskFromPointer(point);
    clearCutoutPreviews();
    renderCutCanvas();
    updateCutoutMeta();
    return;
  }

  if (!cutoutState.drawing) {
    updateCutCanvasCursor(point);
    return;
  }

  const rect = normalizeCutRect(cutoutState.drawing.start, point);
  cutoutState.drawing = {
    ...rect,
    radius: getCutRadiusValue(),
    rotation: 0,
    start: cutoutState.drawing.start,
  };
  renderCutCanvas();
});

cutCanvasEl.addEventListener('pointerleave', () => {
  if (!cutoutState.interaction && !cutoutState.drawing) {
    cutCanvasEl.className = '';
  }
});

cutCanvasEl.addEventListener('wheel', (event) => {
  if (!cutoutState.template) {
    return;
  }

  const currentPhoto = getCurrentCutoutPhoto();
  const index = getEditableCutMaskIndex();
  if (!event.shiftKey || !currentPhoto || index < 0 || !cutoutState.masks[index]) {
    return;
  }

  const point = getCutCanvasPoint(event);
  if (!hitCutMask(point, cutoutState.masks[index])) {
    return;
  }

  event.preventDefault();
  const transform = getCutPhotoTransform(currentPhoto, index);
  const zoomFactor = event.deltaY < 0 ? 1.06 : 0.94;
  transform.scale = clamp(transform.scale * zoomFactor, 0.5, 3);
  clearCutoutPreviews();
  renderCutCanvas();
}, { passive: false });

cutCanvasShellEl?.addEventListener('wheel', (event) => {
  if (!cutoutState.template || event.shiftKey || !(event.altKey || event.ctrlKey || event.metaKey)) {
    return;
  }

  event.preventDefault();
  adjustCutCanvasZoom(event.deltaY < 0 ? 1.08 : 0.92, event);
}, { passive: false });

cutCanvasShellEl?.addEventListener('pointerdown', (event) => {
  startCutCanvasPan(event);
});

cutCanvasShellEl?.addEventListener('pointermove', (event) => {
  moveCutCanvasPan(event);
});

cutCanvasShellEl?.addEventListener('pointerup', stopCutCanvasPan);
cutCanvasShellEl?.addEventListener('pointercancel', stopCutCanvasPan);
cutCanvasShellEl?.addEventListener('mousedown', startCutCanvasPan);
window.addEventListener('mousemove', moveCutCanvasPan);
window.addEventListener('mouseup', stopCutCanvasPan);
cutCanvasShellEl?.addEventListener('auxclick', (event) => {
  if (event.button === 1) {
    event.preventDefault();
  }
});
cutCanvasShellEl?.addEventListener('contextmenu', (event) => {
  if (cutoutState.pan) {
    event.preventDefault();
  }
});

cutCanvasEl.addEventListener('pointerup', (event) => {
  if (cutoutState.interaction) {
    cutCanvasEl.releasePointerCapture(event.pointerId);
    cutoutState.interaction = null;
    updateCutCanvasCursor(getCutCanvasPoint(event));
    renderCutCanvas();
    updateCutoutMeta();
    return;
  }

  if (!cutoutState.drawing) {
    return;
  }

  cutCanvasEl.releasePointerCapture(event.pointerId);
  const { start, ...mask } = cutoutState.drawing;
  cutoutState.drawing = null;

  if (mask.width < 8 || mask.height < 8) {
    renderCutCanvas();
    return;
  }

  cutoutState.masks.push(mask);
  cutoutState.selectedIndex = cutoutState.masks.length - 1;
  cutoutState.activeLayer = 'mask';
  cutoutState.selectedTemplateLayerId = '';
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage(`已添加第 ${cutoutState.masks.length} 个剪贴蒙版。`);
});

cutCanvasEl.addEventListener('pointercancel', () => {
  cutoutState.drawing = null;
  cutoutState.interaction = null;
  renderCutCanvas();
});

cutClearMasksEl.addEventListener('click', () => {
  cutoutState.masks = [];
  cutoutState.selectedIndex = -1;
  cutoutState.activeLayer = 'mask';
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage('已清空蒙版。');
});

cutZoomOutEl?.addEventListener('click', () => adjustCutCanvasZoom(0.82));
cutZoomInEl?.addEventListener('click', () => adjustCutCanvasZoom(1.22));
cutZoomFitEl?.addEventListener('click', fitCutCanvasZoom);

cutRatioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    cutRatioButtons.forEach((item) => item.classList.toggle('active', item === button));
    const [width, height] = button.dataset.cutRatio.split(':');
    cutRatioWidthEl.value = width;
    cutRatioHeightEl.value = height;
    applyCutMaskRatio(button.dataset.cutRatio);
  });
});

cutApplyCustomRatioEl?.addEventListener('click', () => {
  cutRatioButtons.forEach((item) => item.classList.remove('active'));
  applyCutMaskRatio(`${cutRatioWidthEl.value}:${cutRatioHeightEl.value}`);
});

cutRadiusEl?.addEventListener('input', applyCutMaskRadius);
cutFitModeEl?.addEventListener('change', () => {
  clearCutoutPreviews();
  renderCutCanvas();
});
cutGeneratePreviewEl.addEventListener('click', generateCutoutPreviews);
cutExportAllEl.addEventListener('click', exportCutoutPreviews);

resizeCategoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeResizeCategory = button.dataset.category;
    resizeCategoryButtons.forEach((item) => item.classList.toggle('active', item === button));
    syncResizeCategoryView();
  });
});

syncResizeCategoryView();

resizePresetCards.forEach((card) => {
  const checkbox = card.querySelector('input[type="checkbox"]');
  const settingsButton = card.querySelector('.resize-prompt-button');
  const textarea = card.querySelector('textarea');

  checkbox.addEventListener('change', () => {
    card.classList.toggle('active', checkbox.checked);
  });

  card.addEventListener('click', (event) => {
    if (event.target.closest('button') || event.target.closest('textarea') || event.target === checkbox) {
      return;
    }

    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  });

  settingsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    textarea.hidden = !textarea.hidden;
    if (!textarea.hidden) {
      textarea.focus();
    }
  });
});

layerOptionCards.forEach((card) => {
  const checkbox = card.querySelector('input[type="checkbox"]');
  const settingsButton = card.querySelector('.resize-prompt-button');
  const textarea = card.querySelector('textarea');

  card.addEventListener('click', (event) => {
    if (event.target.closest('button') || event.target.closest('textarea') || event.target.closest('label')) {
      return;
    }
    checkbox.checked = !checkbox.checked;
  });

  settingsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    textarea.hidden = !textarea.hidden;
    if (!textarea.hidden) {
      textarea.focus();
    }
  });
});

resizeGenerateSelectedEl.addEventListener('click', generateSelectedResizePresets);
layerGenerateSelectedEl.addEventListener('click', generateSelectedLayerOptions);
layerAnalyzeImageEl.addEventListener('click', analyzeLayerImage);
layerGenerateFromSelectionEl.addEventListener('click', generateLayerFromSelection);

[modelEl, resolutionEl, aspectRatioEl, cutFitModeEl, iconRedrawModeEl, iconRedrawResolutionEl, iconRedrawRatioEl, chatModelInputEl]
  .filter(Boolean)
  .forEach(setupCustomSelect);
resolutionEl.addEventListener('change', syncAspectOptionsForResolution);
iconRedrawModeEl?.addEventListener('change', syncIconRedrawPromptPreset);
syncAspectOptionsForResolution();
syncIconRedrawPromptPreset();

document.addEventListener('click', () => closeCustomSelects());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCustomSelects();
  }
});

historyPrevEl.addEventListener('click', () => {
  historyGridEl.scrollBy({ left: -historyGridEl.clientWidth * 0.8, behavior: 'smooth' });
});

historyNextEl.addEventListener('click', () => {
  historyGridEl.scrollBy({ left: historyGridEl.clientWidth * 0.8, behavior: 'smooth' });
});

historyGridEl.addEventListener('scroll', updateHistoryNav);
historyGridEl.addEventListener('wheel', (event) => {
  const canScrollHorizontally = historyGridEl.scrollWidth > historyGridEl.clientWidth;

  if (!canScrollHorizontally || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
    return;
  }

  event.preventDefault();
  historyGridEl.scrollBy({ left: event.deltaY, behavior: 'auto' });
}, { passive: false });

window.addEventListener('resize', updateHistoryNav);

saveApiKeyEl.addEventListener('click', async () => {
  const apiKey = apiKeyInputEl.value.trim();

  if (!apiKey && !hasSavedImageApiKey) {
    setMessage('请输入 API key。', true);
    apiKeyInputEl.focus();
    return;
  }

  saveApiKeyEl.disabled = true;
  saveApiKeyEl.textContent = '保存中';

  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey,
        chatApiKey: chatApiKeyInputEl.value.trim(),
        apiEntryName: apiEntryNameInputEl.value.trim(),
        model: imageModelInputEl.value.trim() || modelEl.value.trim() || 'gpt-image-2',
        chatModel: chatModelInputSettingsEl.value.trim() || chatModelInputEl.value.trim() || defaultChatModel,
        baseUrl: baseUrlInputEl.value.trim(),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '保存失败');
    }

    apiKeyInputEl.value = '';
    chatApiKeyInputEl.value = '';
    hasSavedImageApiKey = Boolean(data.hasApiKey);
    modelEl.value = data.model || imageModelInputEl.value.trim() || 'gpt-image-2';
    refreshCustomSelect(modelEl);
    syncChatModelInputs(data.chatModel || chatModelInputSettingsEl.value.trim() || defaultChatModel);
    apiKeyStatusEl.textContent = data.hasApiKey ? '保存成功，可以生成图片了。' : '图片 API key 未配置。';
    apiKeyStatusEl.className = `api-key-status ${data.hasApiKey ? 'ok' : 'error'}`;
    setMessage('设置已保存。');
    saveApiKeyEl.textContent = '已保存';
    setTimeout(showGeneratorPage, 700);
  } catch (error) {
    apiKeyStatusEl.textContent = error.message;
    apiKeyStatusEl.className = 'api-key-status error';
    setMessage(error.message, true);
  } finally {
    saveApiKeyEl.disabled = false;
    if (apiKeyInputEl.value.trim()) {
      saveApiKeyEl.textContent = '保存';
    }
  }
});

apiKeyInputEl.addEventListener('input', () => {
  saveApiKeyEl.textContent = '保存';
  apiKeyStatusEl.textContent = '';
  apiKeyStatusEl.className = 'api-key-status';
});

psBridgeChannelInputEl?.addEventListener('change', () => {
  try {
    savePhotoshopBridgeChannel(psBridgeChannelInputEl.value);
  } catch (error) {
    if (psBridgeStatusEl) {
      psBridgeStatusEl.textContent = error.message;
    }
  }
});

psBridgeChannelInputEl?.addEventListener('blur', () => {
  try {
    savePhotoshopBridgeChannel(psBridgeChannelInputEl.value);
  } catch {
    restorePhotoshopBridgeChannel();
  }
});

psBridgeChannelInputEl?.addEventListener('input', () => {
  if (psBridgeStatusEl) {
    psBridgeStatusEl.textContent = '修改后会自动保存，请在 Photoshop 插件里填同一个码。';
  }
});

fillApimartPresetEl.addEventListener('click', () => {
  apiEntryNameInputEl.value = 'APIMart';
  baseUrlInputEl.value = 'https://api.apimart.ai/v1';
  imageModelInputEl.value = modelEl.value.trim() || 'gpt-image-2';
  saveApiKeyEl.textContent = '保存';
  apiKeyStatusEl.textContent = '已填入 APIMart 地址，请粘贴 API Key 并确认图片模型名。';
  apiKeyStatusEl.className = 'api-key-status';
});

fillSuperApiPresetEl.addEventListener('click', () => {
  apiEntryNameInputEl.value = 'SuperAI';
  baseUrlInputEl.value = 'https://superaiapi.com/v1';
  imageModelInputEl.value = modelEl.value.trim() || 'gpt-image-2';
  syncChatModelInputs(chatModelInputSettingsEl.value.trim() || chatModelInputEl.value.trim() || defaultChatModel);
  saveApiKeyEl.textContent = '保存';
  apiKeyStatusEl.textContent = '已填入 SuperAI 地址，请粘贴 SuperAI API Key，并确认图片模型和聊天模型名。';
  apiKeyStatusEl.className = 'api-key-status';
});

fillYdn99PresetEl.addEventListener('click', () => {
  const ydn99ImageModel = 'gpt-image-2';
  apiEntryNameInputEl.value = 'YDN99';
  baseUrlInputEl.value = 'https://www.ydn99.com/v1';
  modelEl.value = ydn99ImageModel;
  refreshCustomSelect(modelEl);
  imageModelInputEl.value = ydn99ImageModel;
  syncChatModelInputs(chatModelInputSettingsEl.value.trim() || chatModelInputEl.value.trim() || defaultChatModel);
  saveApiKeyEl.textContent = '保存';
  apiKeyStatusEl.textContent = '已填入 YDN99 地址和 gpt-image-2 图片模型，请粘贴密钥并保存。生图接口会请求 /v1/images/generations。';
  apiKeyStatusEl.className = 'api-key-status';
});

function appendPromptPreset(presetText) {
  const currentPrompt = promptEl.value.trim();
  const text = String(presetText || '').trim();

  if (!text) {
    return;
  }

  if (currentPrompt.includes(text)) {
    promptEl.focus();
    return;
  }

  promptEl.value = currentPrompt
    ? `${currentPrompt}${/[。！？.!?]$/.test(currentPrompt) ? '' : '。'}${text}`
    : text;
  promptEl.focus();
  promptEl.setSelectionRange(promptEl.value.length, promptEl.value.length);
}

function closePromptPresetMenu() {
  if (!promptPresetMenuEl) {
    return;
  }

  promptPresetMenuEl.hidden = true;
  optimizePromptEl?.setAttribute('aria-expanded', 'false');
}

function togglePromptPresetMenu() {
  if (!promptPresetMenuEl) {
    appendPromptPreset(promptOptimizationText);
    return;
  }

  const shouldOpen = promptPresetMenuEl.hidden;
  promptPresetMenuEl.hidden = !shouldOpen;
  optimizePromptEl.setAttribute('aria-expanded', String(shouldOpen));
}

optimizePromptEl.addEventListener('click', (event) => {
  event.stopPropagation();
  togglePromptPresetMenu();
});

toggleImportantGalleryFormEl.addEventListener('click', () => {
  const willShow = importantSavePanelEl.hidden;
  clearImportantGalleryForm();
  importantSavePanelEl.hidden = !willShow;
  toggleImportantGalleryFormEl.textContent = willShow ? '收起添加' : '添加素材';
  if (willShow) {
    importantGalleryTitleEl.focus();
  }
});

cancelImportantGalleryFormEl.addEventListener('click', () => {
  clearImportantGalleryForm();
  importantSavePanelEl.hidden = true;
  setImportantGalleryMessage('');
});

importantGalleryImageEl.addEventListener('change', async () => {
  const file = importantGalleryImageEl.files?.[0];
  if (!file) {
    importantGalleryImageDataUrl = '';
    renderImportantGalleryImagePreview('');
    return;
  }

  if (!file.type.startsWith('image/')) {
    setImportantGalleryMessage('请上传 JPG / PNG / WebP 图片。', true);
    return;
  }

  if (file.size > 12 * 1024 * 1024) {
    setImportantGalleryMessage('图片不能超过 12MB。', true);
    importantGalleryImageEl.value = '';
    return;
  }

  try {
    importantGalleryImageDataUrl = await fileToDataUrl(file);
    renderImportantGalleryImagePreview(importantGalleryImageDataUrl);
    if (!importantGalleryTitleEl.value.trim()) {
      importantGalleryTitleEl.value = file.name.replace(/\.[^.]+$/, '');
    }
    setImportantGalleryMessage('');
  } catch (error) {
    setImportantGalleryMessage(error.message || '图片读取失败。', true);
  }
});

saveImportantGalleryItemEl.addEventListener('click', saveImportantGalleryItem);

promptPresetMenuEl?.addEventListener('click', (event) => {
  const presetButton = event.target.closest('[data-prompt-preset]');
  if (!presetButton) {
    return;
  }

  appendPromptPreset(promptOptimizationPresets[presetButton.dataset.promptPreset]);
  closePromptPresetMenu();
});

document.addEventListener('click', (event) => {
  if (!promptPresetMenuEl || promptPresetMenuEl.hidden) {
    return;
  }

  if (!event.target.closest('.prompt-preset-wrap')) {
    closePromptPresetMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePromptPresetMenu();
  }
});

randomPromptEl?.addEventListener('click', async () => {
  const originalTitle = randomPromptEl.title;
  randomPromptEl.disabled = true;
  randomPromptEl.title = '正在生成 Prompt';
  setMessage('正在从 Prompt 合集随机选择...');

  try {
    const response = await fetch('/api/random-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: chatModelInputSettingsEl.value.trim() || chatModelInputEl.value.trim() || defaultChatModel,
        seed: promptEl.value.trim(),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '随机 Prompt 生成失败');
    }

    promptEl.value = data.prompt || '';
    promptEl.focus();
    promptEl.setSelectionRange(promptEl.value.length, promptEl.value.length);
    setMessage('');
  } catch (error) {
    setMessage(error.message || '随机 Prompt 生成失败', true);
  } finally {
    randomPromptEl.disabled = false;
    randomPromptEl.title = originalTitle;
  }
});

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error || new Error('图片读取失败。')));
    reader.readAsDataURL(file);
  });
}

function fileToText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result || '')));
    reader.addEventListener('error', () => reject(reader.error || new Error('文件读取失败。')));
    reader.readAsText(file);
  });
}

async function compressImageFileToDataUrl(file, { maxDimension = 1280, mimeType = 'image/jpeg', quality = 0.82 } = {}) {
  const originalDataUrl = await fileToDataUrl(file);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      const longestSide = Math.max(image.width, image.height);
      const scale = longestSide > maxDimension ? maxDimension / longestSide : 1;
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');

      if (!context) {
        resolve(originalDataUrl);
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL(mimeType, quality));
    });
    image.addEventListener('error', () => reject(new Error('Image compression failed.')));
    image.src = originalDataUrl;
  });
}

async function urlToDataUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`读取参考图失败：${response.status}`);
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error || new Error('参考图读取失败。')));
    reader.readAsDataURL(blob);
  });
}

function dataUrlToFile(dataUrl, fileName) {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/data:(.*?);base64/)?.[1] || 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], fileName, { type: mime });
}

function rgbaAt(imageData, x, y) {
  const { width, data } = imageData;
  const index = (y * width + x) * 4;
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3],
  };
}

function colorDistance(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function collectEdgeSamples(imageData) {
  const samples = [];
  const { width, height } = imageData;
  const stepX = Math.max(1, Math.floor(width / 36));
  const stepY = Math.max(1, Math.floor(height / 36));

  for (let x = 0; x < width; x += stepX) {
    samples.push(rgbaAt(imageData, x, 0));
    if (height > 1) {
      samples.push(rgbaAt(imageData, x, height - 1));
    }
  }

  for (let y = stepY; y < height - 1; y += stepY) {
    samples.push(rgbaAt(imageData, 0, y));
    if (width > 1) {
      samples.push(rgbaAt(imageData, width - 1, y));
    }
  }

  return samples.filter((sample) => sample.a > 0);
}

function estimateBackgroundColor(samples) {
  if (!samples.length) {
    return { r: 255, g: 255, b: 255 };
  }

  const sorted = [...samples].sort((left, right) => {
    const brightnessLeft = left.r + left.g + left.b;
    const brightnessRight = right.r + right.g + right.b;
    return brightnessRight - brightnessLeft;
  });
  const dominant = sorted.slice(0, Math.max(12, Math.floor(sorted.length * 0.6)));
  const total = dominant.reduce((accumulator, sample) => ({
    r: accumulator.r + sample.r,
    g: accumulator.g + sample.g,
    b: accumulator.b + sample.b,
  }), { r: 0, g: 0, b: 0 });

  return {
    r: Math.round(total.r / dominant.length),
    g: Math.round(total.g / dominant.length),
    b: Math.round(total.b / dominant.length),
  };
}

function shouldAutoTransparentize(data) {
  const item = data?.historyItem || data || {};
  return (item.kind || '') === 'layer' || (item.targetSize || '') === '分层';
}

async function createTransparentLayerDataUrl(url) {
  const image = new Image();
  image.crossOrigin = 'anonymous';

  await new Promise((resolve, reject) => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', () => reject(new Error('图层图片读取失败。')), { once: true });
    image.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context) {
    throw new Error('浏览器不支持透明化处理。');
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const background = estimateBackgroundColor(collectEdgeSamples(imageData));
  const brightness = background.r + background.g + background.b;

  if (brightness < 660) {
    return canvas.toDataURL('image/png');
  }

  const softThreshold = 28;
  const hardThreshold = 52;
  const minChannel = 215;
  let changed = 0;

  for (let index = 0; index < imageData.data.length; index += 4) {
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const alpha = imageData.data[index + 3];

    if (alpha === 0) {
      continue;
    }

    const distance = colorDistance({ r, g, b }, background);
    const nearBrightBackdrop = r >= minChannel && g >= minChannel && b >= minChannel;

    if (!nearBrightBackdrop || distance > hardThreshold) {
      continue;
    }

    changed += 1;

    if (distance <= softThreshold) {
      imageData.data[index + 3] = 0;
      continue;
    }

    const ratio = clamp((distance - softThreshold) / (hardThreshold - softThreshold), 0, 1);
    imageData.data[index + 3] = Math.round(alpha * ratio);
  }

  if (changed > 0) {
    context.putImageData(imageData, 0, 0);
  }

  return canvas.toDataURL('image/png');
}

async function getTransparentLayerAsset(data) {
  const item = data?.historyItem || data || {};
  const imageUrl = data?.imageUrl || item.imageUrl || '';
  const cacheKey = item.id || imageUrl;

  if (!cacheKey) {
    throw new Error('缺少图层图片地址。');
  }

  const cached = transparentLayerCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const dataUrl = await createTransparentLayerDataUrl(imageUrl);
  const baseName = (item.targetName || item.prompt || 'layer').slice(0, 24).replace(/[\\/:*?"<>|]+/g, '-') || 'layer';
  const fileName = `${baseName}.png`;
  const objectUrl = URL.createObjectURL(dataUrlToFile(dataUrl, fileName));
  const asset = { dataUrl, objectUrl, fileName };
  transparentLayerCache.set(cacheKey, asset);
  return asset;
}

function setCutMessage(text, isError = false) {
  cutMessageEl.textContent = text;
  cutMessageEl.className = `message ${isError ? 'error' : ''}`;
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.addEventListener('load', () => resolve({ image, url }));
    image.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('图片读取失败。'));
    });
    image.src = url;
  });
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve({ image, url }));
    image.addEventListener('error', () => reject(new Error('图片读取失败。')));
    image.src = url;
  });
}

function imageUrlToDataUrl(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`读取图层蒙版失败：${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error || new Error('蒙版读取失败。')));
      reader.readAsDataURL(blob);
    }));
}

function parseSvgLength(value) {
  const text = String(value || '').trim();
  if (!text || text.includes('%')) {
    return 0;
  }

  const match = text.match(/^(-?\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function getSvgCanvasSize(svgElement) {
  const viewBox = String(svgElement.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
  const viewBoxWidth = viewBox.length === 4 && Number.isFinite(viewBox[2]) ? viewBox[2] : 0;
  const viewBoxHeight = viewBox.length === 4 && Number.isFinite(viewBox[3]) ? viewBox[3] : 0;
  const width = parseSvgLength(svgElement.getAttribute('width')) || viewBoxWidth || 1200;
  const height = parseSvgLength(svgElement.getAttribute('height')) || viewBoxHeight || 800;
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

function svgTextToDataUrl(svgText) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
}

function getSvgLayerName(element, index) {
  return element.getAttribute('data-name')
    || element.getAttribute('aria-label')
    || element.getAttribute('inkscape:label')
    || element.getAttribute('id')
    || `${element.tagName.toLowerCase()} ${index + 1}`;
}

function isVisibleSvgLayerElement(element) {
  const tagName = element.tagName.toLowerCase();
  if (['defs', 'clippath', 'mask', 'pattern', 'lineargradient', 'radialgradient', 'style', 'script'].includes(tagName)) {
    return false;
  }

  const style = window.getComputedStyle(element);
  return style.display !== 'none'
    && style.visibility !== 'hidden'
    && Number(style.opacity || 1) > 0;
}

function buildSvgMaskDataUrl(svgElement, targetElement, width, height) {
  const clone = svgElement.cloneNode(true);
  const targetId = targetElement.getAttribute('data-svg-layer-id');
  const cloneTarget = clone.querySelector(`[data-svg-layer-id="${targetId}"]`);

  if (!cloneTarget) {
    return '';
  }

  clone.querySelectorAll('g,path,rect,circle,ellipse,polygon,polyline,line,image,text,use').forEach((element) => {
    if (element === cloneTarget || cloneTarget.contains(element) || element.contains(cloneTarget)) {
      return;
    }
    element.setAttribute('visibility', 'hidden');
  });

  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  return svgTextToDataUrl(new XMLSerializer().serializeToString(clone));
}

async function parseSvgTemplate(file) {
  const rawText = await fileToText(file);
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(rawText, 'image/svg+xml');

  if (parsedDocument.querySelector('parsererror') || parsedDocument.documentElement.tagName.toLowerCase() !== 'svg') {
    throw new Error('SVG 文件解析失败，请确认上传的是标准 SVG。');
  }

  parsedDocument.querySelectorAll('script, foreignObject').forEach((element) => element.remove());
  const svgElement = parsedDocument.documentElement;
  const { width, height } = getSvgCanvasSize(svgElement);
  svgElement.setAttribute('xmlns', svgElement.getAttribute('xmlns') || 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('width', String(width));
  svgElement.setAttribute('height', String(height));

  const hiddenHost = document.createElement('div');
  hiddenHost.style.position = 'fixed';
  hiddenHost.style.left = '-10000px';
  hiddenHost.style.top = '0';
  hiddenHost.style.width = `${width}px`;
  hiddenHost.style.height = `${height}px`;
  hiddenHost.style.opacity = '0';
  hiddenHost.style.pointerEvents = 'none';
  document.body.append(hiddenHost);

  const renderedSvg = document.importNode(svgElement, true);
  renderedSvg.style.width = `${width}px`;
  renderedSvg.style.height = `${height}px`;
  hiddenHost.append(renderedSvg);

  const rootRect = renderedSvg.getBoundingClientRect();
  const scaleX = rootRect.width ? width / rootRect.width : 1;
  const scaleY = rootRect.height ? height / rootRect.height : 1;
  const elements = [...renderedSvg.querySelectorAll('g,path,rect,circle,ellipse,polygon,polyline,line,image,text,use')];
  const layers = [];

  elements.forEach((element, index) => {
    element.setAttribute('data-svg-layer-id', `svg-layer-${index}`);
    if (!isVisibleSvgLayerElement(element)) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const layerWidth = rect.width * scaleX;
    const layerHeight = rect.height * scaleY;

    if (layerWidth < 8 || layerHeight < 8) {
      return;
    }

    layers.push({
      id: element.getAttribute('data-svg-layer-id'),
      name: getSvgLayerName(element, layers.length),
      x: Math.max(0, Math.round((rect.left - rootRect.left) * scaleX)),
      y: Math.max(0, Math.round((rect.top - rootRect.top) * scaleY)),
      width: Math.min(width, Math.round(layerWidth)),
      height: Math.min(height, Math.round(layerHeight)),
      radius: 0,
      rotation: 0,
      recommended: false,
      svgMaskDataUrl: buildSvgMaskDataUrl(renderedSvg, element, width, height),
    });
  });

  hiddenHost.remove();

  return {
    svgText: new XMLSerializer().serializeToString(svgElement),
    width,
    height,
    layers: layers.slice(0, 120),
  };
}

function setIconRedrawMessage(text, isError = false) {
  iconRedrawMessageEl.textContent = text;
  iconRedrawMessageEl.className = `message ${isError ? 'error' : ''}`;
}

function clearIconRedrawResult() {
  iconRedrawResultEl.querySelectorAll('.pending, .error').forEach((card) => card.remove());
  iconRedrawResultEl.hidden = iconRedrawResultEl.children.length === 0;
}

function setImageEditMessage(text, isError = false) {
  imageEditMessageEl.textContent = text;
  imageEditMessageEl.className = `message ${isError ? 'error' : ''}`;
}

function clearImageEditResult() {
  imageEditResultEl.hidden = true;
  imageEditResultEl.replaceChildren();
}

function getImageEditTargetSize() {
  if (imageEditState.mode === 'mask' && imageEditState.source?.image) {
    const width = roundToImageEditSize(imageEditState.source.image.width);
    const height = roundToImageEditSize(imageEditState.source.image.height);
    return `${width}x${height}`;
  }

  const { width, height } = getImageEditDocumentSize();
  return `${roundToImageEditSize(width)}x${roundToImageEditSize(height)}`;
}

function roundToImageEditSize(value) {
  return Math.max(16, Math.round(Number(value || 16) / 16) * 16);
}

function roundUpToImageEditSize(value) {
  return Math.max(16, Math.ceil(Number(value || 16) / 16) * 16);
}

function getSafeImageEditCanvasSize(width, height) {
  let safeWidth = roundUpToImageEditSize(width);
  let safeHeight = roundUpToImageEditSize(height);
  const maxAspectRatio = 3;
  const minPixels = 655360;
  const maxPixels = 8294400;
  const normalizeAspectRatio = () => {
    if (safeWidth / safeHeight > maxAspectRatio) {
      safeHeight = roundUpToImageEditSize(safeWidth / maxAspectRatio);
    } else if (safeHeight / safeWidth > maxAspectRatio) {
      safeWidth = roundUpToImageEditSize(safeHeight / maxAspectRatio);
    }
  };

  normalizeAspectRatio();

  if (safeWidth * safeHeight < minPixels) {
    const scale = Math.sqrt(minPixels / (safeWidth * safeHeight));
    safeWidth = roundUpToImageEditSize(safeWidth * scale);
    safeHeight = roundUpToImageEditSize(safeHeight * scale);
    normalizeAspectRatio();
  }

  if (safeWidth * safeHeight > maxPixels) {
    const scale = Math.sqrt(maxPixels / (safeWidth * safeHeight));
    safeWidth = Math.max(16, Math.floor((safeWidth * scale) / 16) * 16);
    safeHeight = Math.max(16, Math.floor((safeHeight * scale) / 16) * 16);

    for (let i = 0; i < 512 && safeWidth * safeHeight > maxPixels; i += 1) {
      if (safeWidth >= safeHeight && safeWidth > 16) {
        safeWidth -= 16;
      } else if (safeHeight > 16) {
        safeHeight -= 16;
      } else {
        break;
      }
    }
  }

  return { width: safeWidth, height: safeHeight };
}

function getImageEditOriginalSize() {
  if (!imageEditState.source?.image) {
    return '';
  }

  return `${imageEditState.source.image.width}x${imageEditState.source.image.height}`;
}

function parseCanvasSize(size) {
  const match = String(size || '').match(/^(\d+)x(\d+)$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 2048, height: 2048 };
}

function getImageEditOutpaintMargins() {
  const source = imageEditState.source?.image;

  if (!source) {
    return { left: 0, right: 0, top: 0, bottom: 0 };
  }

  return {
    left: Math.max(0, Math.round(imageEditState.outpaint.left)),
    right: Math.max(0, Math.round(imageEditState.outpaint.right)),
    top: Math.max(0, Math.round(imageEditState.outpaint.top)),
    bottom: Math.max(0, Math.round(imageEditState.outpaint.bottom)),
  };
}

function getImageEditDocumentSize() {
  const source = imageEditState.source?.image;

  if (!source) {
    return { width: 2048, height: 2048 };
  }

  if (imageEditState.mode !== 'expand') {
    return { width: source.width, height: source.height };
  }

  const margins = getImageEditOutpaintMargins();
  return {
    width: source.width + margins.left + margins.right,
    height: source.height + margins.top + margins.bottom,
  };
}

function resizeImageEditCanvas() {
  const shellRect = imageEditCanvasShellEl.getBoundingClientRect();
  const source = imageEditState.source;
  const maxWidth = Math.max(360, Math.floor(shellRect.width - 32));
  const maxHeight = Math.max(420, Math.min(720, Math.floor(window.innerHeight * 0.62)));

  if (!source) {
    imageEditCanvasEl.width = maxWidth;
    imageEditCanvasEl.height = maxHeight;
    imageEditCanvasEl.style.width = `${maxWidth}px`;
    imageEditCanvasEl.style.height = `${maxHeight}px`;
    return;
  }

  const documentSize = getImageEditDocumentSize();
  const fitScale = Math.min(maxWidth / documentSize.width, maxHeight / documentSize.height);
  const scale = fitScale * (imageEditState.view.zoom || 1);
  const width = Math.max(1, Math.round(documentSize.width * scale));
  const height = Math.max(1, Math.round(documentSize.height * scale));
  imageEditCanvasEl.width = width;
  imageEditCanvasEl.height = height;
  imageEditCanvasEl.style.width = `${width}px`;
  imageEditCanvasEl.style.height = `${height}px`;
  imageEditState.view.scale = scale;
  imageEditState.view.x = 0;
  imageEditState.view.y = 0;
}

function resetImageEditView() {
  const source = imageEditState.source;
  if (!source) {
    return;
  }

  imageEditState.view.zoom = 1;
  resizeImageEditCanvas();
}

function getImageEditDocumentPoint(event) {
  const rect = imageEditCanvasEl.getBoundingClientRect();
  const canvasX = (event.clientX - rect.left) * (imageEditCanvasEl.width / rect.width);
  const canvasY = (event.clientY - rect.top) * (imageEditCanvasEl.height / rect.height);
  const view = imageEditState.view;
  const documentSize = getImageEditDocumentSize();

  return {
    x: clamp((canvasX - view.x) / view.scale, 0, documentSize.width),
    y: clamp((canvasY - view.y) / view.scale, 0, documentSize.height),
  };
}

function getImageEditCanvasPoint(event) {
  const point = getImageEditDocumentPoint(event);
  const margins = imageEditState.mode === 'expand' ? getImageEditOutpaintMargins() : { left: 0, top: 0 };

  return {
    x: clamp(point.x - margins.left, 0, imageEditState.source?.image.width || 0),
    y: clamp(point.y - margins.top, 0, imageEditState.source?.image.height || 0),
  };
}

function drawImageEditMaskStroke(fromPoint, toPoint) {
  const context = imageEditState.maskCanvas.getContext('2d');
  if (!context || !imageEditState.source) {
    return;
  }

  context.save();
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = '#ffffff';
  context.lineWidth = Number(imageEditBrushEl.value || 52);
  context.beginPath();
  context.moveTo(fromPoint.x, fromPoint.y);
  context.lineTo(toPoint.x, toPoint.y);
  context.stroke();
  context.restore();
}

function drawImageEditMaskOverlay(context) {
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = imageEditState.maskCanvas.width;
  overlayCanvas.height = imageEditState.maskCanvas.height;
  const overlayContext = overlayCanvas.getContext('2d');

  if (!overlayContext) {
    return;
  }

  overlayContext.drawImage(imageEditState.maskCanvas, 0, 0);
  overlayContext.globalCompositeOperation = 'source-in';
  overlayContext.fillStyle = 'rgba(18, 182, 143, 0.58)';
  overlayContext.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  context.drawImage(overlayCanvas, 0, 0);
}

function drawImageEditCheckerboard(context, width, height, cellSize = 18) {
  context.save();
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      if (((x / cellSize) + (y / cellSize)) % 2 === 0) {
        context.fillStyle = '#dbe5ec';
        context.fillRect(x, y, cellSize, cellSize);
      }
    }
  }
  context.restore();
}

function getImageEditSourceRect() {
  const source = imageEditState.source?.image;
  const margins = getImageEditOutpaintMargins();

  if (!source) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: imageEditState.mode === 'expand' ? margins.left : 0,
    y: imageEditState.mode === 'expand' ? margins.top : 0,
    width: source.width,
    height: source.height,
  };
}

function drawImageEditOutpaintFrame(context) {
  const documentSize = getImageEditDocumentSize();
  const sourceRect = getImageEditSourceRect();
  const handleSize = Math.max(16 / (imageEditState.view.scale || 1), Math.min(documentSize.width, documentSize.height) * 0.018);
  const half = handleSize / 2;
  const points = [
    { x: 0, y: 0 },
    { x: documentSize.width / 2, y: 0 },
    { x: documentSize.width, y: 0 },
    { x: documentSize.width, y: documentSize.height / 2 },
    { x: documentSize.width, y: documentSize.height },
    { x: documentSize.width / 2, y: documentSize.height },
    { x: 0, y: documentSize.height },
    { x: 0, y: documentSize.height / 2 },
  ];

  context.save();
  context.strokeStyle = 'rgba(17, 24, 39, 0.72)';
  context.lineWidth = Math.max(1 / (imageEditState.view.scale || 1), 1);
  context.strokeRect(0, 0, documentSize.width, documentSize.height);
  context.strokeStyle = 'rgba(255, 255, 255, 0.82)';
  context.strokeRect(sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height);

  context.strokeStyle = 'rgba(17, 24, 39, 0.28)';
  context.beginPath();
  context.moveTo(documentSize.width / 3, 0);
  context.lineTo(documentSize.width / 3, documentSize.height);
  context.moveTo(documentSize.width * 2 / 3, 0);
  context.lineTo(documentSize.width * 2 / 3, documentSize.height);
  context.moveTo(0, documentSize.height / 3);
  context.lineTo(documentSize.width, documentSize.height / 3);
  context.moveTo(0, documentSize.height * 2 / 3);
  context.lineTo(documentSize.width, documentSize.height * 2 / 3);
  context.stroke();

  context.fillStyle = '#ffffff';
  context.strokeStyle = 'rgba(17, 24, 39, 0.55)';
  points.forEach((point) => {
    context.beginPath();
    drawRoundedRectPath(context, point.x - half, point.y - half, handleSize, handleSize, Math.max(2, handleSize * 0.18));
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawImageEditOutpaint(context) {
  const source = imageEditState.source?.image;
  if (!source) {
    return;
  }

  const documentSize = getImageEditDocumentSize();
  const sourceRect = getImageEditSourceRect();
  drawImageEditCheckerboard(context, documentSize.width, documentSize.height);
  context.drawImage(source, sourceRect.x, sourceRect.y);
  drawImageEditOutpaintFrame(context);
}

function renderImageEditCanvas() {
  const canvas = imageEditCanvasEl;
  const context = canvas.getContext('2d');
  const source = imageEditState.source;

  if (!context || !source) {
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.width = '0px';
    canvas.style.height = '0px';
    canvas.hidden = true;
    imageEditEmptyEl.hidden = false;
    imageEditInfoEl.textContent = '未上传图片';
    return;
  }

  canvas.hidden = false;

  if (canvas.width <= 1 || canvas.height <= 1) {
    resetImageEditView();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(imageEditState.view.x, imageEditState.view.y);
  context.scale(imageEditState.view.scale, imageEditState.view.scale);
  if (imageEditState.mode === 'expand') {
    drawImageEditOutpaint(context);
  } else {
    context.drawImage(source.image, 0, 0);
    drawImageEditMaskOverlay(context);
  }
  context.restore();
  imageEditEmptyEl.hidden = true;
  imageEditInfoEl.textContent = imageEditState.mode === 'expand'
    ? `${getImageEditTargetSize()} 扩图`
    : `${source.image.width} x ${source.image.height}`;
}

async function loadImageEditSource(file) {
  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    setImageEditMessage('请上传图片文件。', true);
    return;
  }

  if (imageEditState.source?.url) {
    URL.revokeObjectURL(imageEditState.source.url);
  }

  const [loaded, dataUrl] = await Promise.all([loadImageFromFile(file), fileToDataUrl(file)]);
  imageEditState.source = {
    file,
    image: loaded.image,
    url: loaded.url,
  };
  imageEditState.sourceDataUrl = dataUrl;
  imageEditState.sourceName = file.name || 'image-edit-source.png';
  imageEditState.maskCanvas.width = loaded.image.width;
  imageEditState.maskCanvas.height = loaded.image.height;
  imageEditState.maskCanvas.getContext('2d')?.clearRect(0, 0, loaded.image.width, loaded.image.height);
  imageEditState.outpaint.left = Math.round(loaded.image.width * 0.28);
  imageEditState.outpaint.right = Math.round(loaded.image.width * 0.28);
  imageEditState.outpaint.top = 0;
  imageEditState.outpaint.bottom = 0;
  imageEditState.outpaint.interaction = null;
  imageEditState.drawing = false;
  imageEditState.lastPoint = null;
  clearImageEditResult();
  resizeImageEditCanvas();
  renderImageEditCanvas();
  setImageEditMessage('图片已载入。局部修改模式下，直接涂抹要修改的位置。');
}

function composeImageMaskPayload() {
  const source = imageEditState.source;
  const { width, height } = parseCanvasSize(getImageEditTargetSize());
  const imageCanvas = document.createElement('canvas');
  const maskCanvas = document.createElement('canvas');
  imageCanvas.width = width;
  imageCanvas.height = height;
  maskCanvas.width = width;
  maskCanvas.height = height;
  const imageContext = imageCanvas.getContext('2d');
  const maskContext = maskCanvas.getContext('2d');

  if (!source || !imageContext || !maskContext) {
    throw new Error('先上传要编辑的图片。');
  }

  imageContext.clearRect(0, 0, width, height);
  imageContext.drawImage(source.image, 0, 0, source.image.width, source.image.height);

  maskContext.fillStyle = '#000000';
  maskContext.fillRect(0, 0, width, height);
  maskContext.globalCompositeOperation = 'destination-out';
  maskContext.drawImage(imageEditState.maskCanvas, 0, 0);
  maskContext.globalCompositeOperation = 'source-over';

  return {
    imageDataUrl: imageCanvas.toDataURL('image/png'),
    maskDataUrl: maskCanvas.toDataURL('image/png'),
  };
}

function hasImageEditMask() {
  const context = imageEditState.maskCanvas.getContext('2d', { willReadFrequently: true });
  if (!context || !imageEditState.maskCanvas.width || !imageEditState.maskCanvas.height) {
    return false;
  }

  const imageData = context.getImageData(0, 0, imageEditState.maskCanvas.width, imageEditState.maskCanvas.height);
  for (let index = 3; index < imageData.data.length; index += 4) {
    if (imageData.data[index] > 0) {
      return true;
    }
  }
  return false;
}

function composeImageOutpaintPayload() {
  const source = imageEditState.source;
  const documentSize = getImageEditDocumentSize();
  const margins = getImageEditOutpaintMargins();
  const width = roundToImageEditSize(documentSize.width);
  const height = roundToImageEditSize(documentSize.height);
  const canvas = document.createElement('canvas');
  const maskCanvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  maskCanvas.width = width;
  maskCanvas.height = height;
  const context = canvas.getContext('2d');
  const maskContext = maskCanvas.getContext('2d');

  if (!source || !context || !maskContext) {
    throw new Error('先上传要扩图的图片。');
  }

  const drawX = margins.left;
  const drawY = margins.top;
  const drawWidth = source.image.width;
  const drawHeight = source.image.height;

  context.clearRect(0, 0, width, height);
  context.drawImage(source.image, drawX, drawY, drawWidth, drawHeight);
  maskContext.fillStyle = '#000000';
  maskContext.fillRect(drawX, drawY, drawWidth, drawHeight);

  return {
    imageDataUrl: canvas.toDataURL('image/png'),
    maskDataUrl: maskCanvas.toDataURL('image/png'),
  };
}

function getImageEditOutpaintHandle(point) {
  if (!imageEditState.source || imageEditState.mode !== 'expand') {
    return '';
  }

  const documentSize = getImageEditDocumentSize();
  const threshold = Math.max(56 / (imageEditState.view.scale || 1), Math.min(documentSize.width, documentSize.height) * 0.08);
  const nearLeft = point.x <= threshold;
  const nearRight = documentSize.width - point.x <= threshold;
  const nearTop = point.y <= threshold;
  const nearBottom = documentSize.height - point.y <= threshold;

  if (nearLeft && nearTop) return 'top-left';
  if (nearRight && nearTop) return 'top-right';
  if (nearRight && nearBottom) return 'bottom-right';
  if (nearLeft && nearBottom) return 'bottom-left';
  if (nearLeft) return 'left';
  if (nearRight) return 'right';
  if (nearTop) return 'top';
  if (nearBottom) return 'bottom';
  return '';
}

function startImageEditOutpaintDrag(event) {
  const point = getImageEditDocumentPoint(event);
  const handle = getImageEditOutpaintHandle(point);

  if (!handle) {
    return false;
  }

  imageEditState.outpaint.interaction = {
    handle,
    startPoint: point,
    startClientX: event.clientX,
    startClientY: event.clientY,
    startScale: imageEditState.view.scale || 1,
    startMargins: getImageEditOutpaintMargins(),
  };
  imageEditCanvasEl.setPointerCapture(event.pointerId);
  imageEditCanvasEl.classList.add('image-edit-resizing');
  return true;
}

function updateImageEditOutpaintDrag(event) {
  const interaction = imageEditState.outpaint.interaction;
  const source = imageEditState.source?.image;

  if (!interaction || !source) {
    return false;
  }

  const deltaX = (event.clientX - interaction.startClientX) / interaction.startScale;
  const deltaY = (event.clientY - interaction.startClientY) / interaction.startScale;
  const maxHorizontal = source.width * 4;
  const maxVertical = source.height * 4;

  if (interaction.handle.includes('left')) {
    imageEditState.outpaint.left = clamp(interaction.startMargins.left - deltaX, 0, maxHorizontal);
  }
  if (interaction.handle.includes('right')) {
    imageEditState.outpaint.right = clamp(interaction.startMargins.right + deltaX, 0, maxHorizontal);
  }
  if (interaction.handle.includes('top')) {
    imageEditState.outpaint.top = clamp(interaction.startMargins.top - deltaY, 0, maxVertical);
  }
  if (interaction.handle.includes('bottom')) {
    imageEditState.outpaint.bottom = clamp(interaction.startMargins.bottom + deltaY, 0, maxVertical);
  }

  resizeImageEditCanvas();
  renderImageEditCanvas();
  clearImageEditResult();
  return true;
}

function endImageEditOutpaintDrag() {
  imageEditState.outpaint.interaction = null;
  imageEditCanvasEl.classList.remove('image-edit-resizing');
}

function setImageEditMode(mode) {
  imageEditState.mode = mode;
  imageEditModeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.imageEditMode === mode);
  });
  imageEditSizeControlsEl.hidden = true;
  imageEditCanvasEl.classList.toggle('image-edit-expand-mode', mode === 'expand');
  resetImageEditView();
  renderImageEditCanvas();
  setImageEditMessage(mode === 'expand'
    ? '扩图模式下拖动画布边缘或四角，透明区域就是要生成的外扩范围。'
    : '局部修改会按原图比例和尺寸提交。');
}

function renderImageEditResult(data) {
  const imageUrl = data.imageUrl || data.historyItem?.imageUrl;
  if (!imageUrl) {
    return;
  }

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = '图片编辑结果';

  const title = document.createElement('strong');
  title.textContent = data.targetName || '编辑结果';

  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `image-edit-${Date.now()}.png`;
  link.textContent = '下载图片';

  imageEditResultEl.replaceChildren(image, title, link);
  imageEditResultEl.hidden = false;
}

async function pollImageEditTask(taskId) {
  for (let attempt = 1; attempt <= imageTaskPollAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    setImageEditMessage(`图片编辑处理中... 第 ${attempt} 次查询。`);

    const response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '查询任务失败');
    }

    if (data.status === 'completed' && data.imageUrl) {
      renderImageEditResult(data);
      await loadHistory();
      return data;
    }

    if (data.status === 'failed') {
      throw new Error(data.error || '任务失败');
    }
  }

  throw new Error('图片编辑还没完成，可以稍后在图库里查看。');
}

async function generateImageEdit() {
  const customPrompt = imageEditPromptEl.value.trim();
  const prompt = customPrompt || (imageEditState.mode === 'expand'
    ? '自然扩展画面，延续原图的构图、光线、色彩、材质和风格，保持主体不变。'
    : '删除涂抹区域中的内容，并根据周围画面自然补全背景，保持原图的光线、色彩、材质和风格。');

  if (!imageEditState.source || !imageEditState.sourceDataUrl) {
    setImageEditMessage('先上传要编辑的图片。', true);
    return;
  }

  if (imageEditState.mode === 'mask' && !hasImageEditMask()) {
    setImageEditMessage('局部修改前先涂抹要修改的位置。', true);
    return;
  }

  const size = getImageEditTargetSize();
  const originalSize = getImageEditOriginalSize();
  const editPayload = imageEditState.mode === 'expand'
    ? composeImageOutpaintPayload()
    : composeImageMaskPayload();

  imageEditGenerateEl.disabled = true;
  imageEditGenerateEl.querySelector('span').textContent = '编辑中...';
  clearImageEditResult();
  setImageEditMessage('已提交图片编辑请求。');

  try {
    const response = await fetch('/api/image-edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        mode: imageEditState.mode,
        image: {
          name: imageEditState.sourceName,
          dataUrl: editPayload.imageDataUrl,
        },
        mask: editPayload.maskDataUrl,
        size,
        quality: imageEditQualityEl.value,
        targetName: imageEditState.mode === 'expand' ? '扩图' : '局部修改',
        targetSize: imageEditState.mode === 'mask' && originalSize ? originalSize : size,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '图片编辑失败');
    }

    if (data.pending && data.taskId) {
      await pollImageEditTask(data.taskId);
    } else if (data.pending && data.taskIds?.length) {
      await pollImageEditTask(data.taskIds[0]);
    } else {
      renderImageEditResult(data);
      await loadHistory();
    }
    setImageEditMessage('图片编辑完成。');
  } catch (error) {
    setImageEditMessage(error.message, true);
  } finally {
    imageEditGenerateEl.disabled = false;
    imageEditGenerateEl.querySelector('span').textContent = '开始编辑';
  }
}

function drawImageContain(context, image, x, y, width, height) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function getIconRedrawCanvasPoint(event) {
  const rect = iconRedrawCanvasEl.getBoundingClientRect();
  const canvasX = (event.clientX - rect.left) * (iconRedrawCanvasEl.width / rect.width);
  const canvasY = (event.clientY - rect.top) * (iconRedrawCanvasEl.height / rect.height);
  const view = iconRedrawState.view;

  return {
    x: clamp((canvasX - view.x) / view.scale, 0, iconRedrawState.source?.image.width || 0),
    y: clamp((canvasY - view.y) / view.scale, 0, iconRedrawState.source?.image.height || 0),
  };
}

function resizeIconRedrawCanvas() {
  const shellRect = iconRedrawPreviewShellEl.getBoundingClientRect();
  const width = Math.max(360, Math.floor(shellRect.width - 32));
  const height = Math.max(420, Math.min(720, Math.floor(window.innerHeight * 0.62)));
  iconRedrawCanvasEl.width = width;
  iconRedrawCanvasEl.height = height;
  iconRedrawCanvasEl.style.width = `${width}px`;
  iconRedrawCanvasEl.style.height = 'auto';
}

function resetIconRedrawView() {
  const source = iconRedrawState.source;
  if (!source) {
    return;
  }

  resizeIconRedrawCanvas();
  const scale = Math.min(
    iconRedrawCanvasEl.width / source.image.width,
    iconRedrawCanvasEl.height / source.image.height,
  );
  iconRedrawState.view.scale = scale;
  iconRedrawState.view.x = (iconRedrawCanvasEl.width - source.image.width * scale) / 2;
  iconRedrawState.view.y = (iconRedrawCanvasEl.height - source.image.height * scale) / 2;
}

function normalizeIconSelection(box) {
  const x = Math.min(box.startX, box.x);
  const y = Math.min(box.startY, box.y);
  const width = Math.abs(box.x - box.startX);
  const height = Math.abs(box.y - box.startY);
  return { x, y, width, height };
}

function drawIconSelection(context, box, index, isDrawing = false) {
  const viewScale = iconRedrawState.view.scale || 1;
  context.save();
  context.setLineDash([12, 8]);
  context.lineWidth = Math.max(2 / viewScale, iconRedrawCanvasEl.width * 0.002 / viewScale);
  context.strokeStyle = isDrawing ? '#12b68f' : '#111827';
  context.strokeRect(box.x, box.y, box.width, box.height);
  context.setLineDash([]);

  if (!isDrawing) {
    const badgeSize = Math.max(26 / viewScale, iconRedrawCanvasEl.width * 0.032 / viewScale);
    context.fillStyle = '#ff6408';
    context.beginPath();
    context.arc(box.x, box.y, badgeSize / 2, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#ffffff';
    context.font = `900 ${Math.max(14 / viewScale, badgeSize * 0.58)}px system-ui, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(String(index + 1), box.x, box.y + 1);
  }

  context.restore();
}

function renderIconRedrawCanvas() {
  const canvas = iconRedrawCanvasEl;
  const context = canvas.getContext('2d');
  const source = iconRedrawState.source;

  if (!context || !source) {
    canvas.width = 1;
    canvas.height = 1;
    canvas.hidden = true;
    iconRedrawEmptyEl.hidden = false;
    iconRedrawCountEl.textContent = '0 个区域';
    return;
  }

  canvas.hidden = false;

  if (canvas.width <= 1 || canvas.height <= 1) {
    resetIconRedrawView();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(iconRedrawState.view.x, iconRedrawState.view.y);
  context.scale(iconRedrawState.view.scale, iconRedrawState.view.scale);
  context.drawImage(source.image, 0, 0);

  iconRedrawState.selections.forEach((selection, index) => {
    drawIconSelection(context, selection, index);
  });

  if (iconRedrawState.drawing) {
    drawIconSelection(context, normalizeIconSelection(iconRedrawState.drawing), iconRedrawState.selections.length, true);
  }
  context.restore();

  iconRedrawEmptyEl.hidden = true;
  iconRedrawCountEl.textContent = `${iconRedrawState.selections.length} 个区域`;
}

function getSortedIconSelections() {
  return [...iconRedrawState.selections].sort((a, b) => {
    if (Math.abs(a.y - b.y) > 10) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });
}

function composeIconSelections() {
  const source = iconRedrawState.source;
  const selections = getSortedIconSelections();

  if (!source) {
    throw new Error('先上传一张需要局部重绘的图片。');
  }

  if (!selections.length) {
    throw new Error('先在图上框选需要重绘的区域。');
  }

  const canvasSize = 1024;
  const columns = Math.ceil(Math.sqrt(selections.length));
  const rows = Math.ceil(selections.length / columns);
  const gap = 42;
  const cellWidth = (canvasSize - gap * (columns + 1)) / columns;
  const cellHeight = (canvasSize - gap * (rows + 1)) / rows;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('浏览器画布不可用。');
  }

  canvas.width = canvasSize;
  canvas.height = canvasSize;
  context.fillStyle = '#f8fbfd';
  context.fillRect(0, 0, canvasSize, canvasSize);

  selections.forEach((selection, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = gap + column * (cellWidth + gap);
    const y = gap + row * (cellHeight + gap);
    const padding = 32;

    context.fillStyle = '#ffffff';
    context.strokeStyle = '#dfeaf2';
    context.lineWidth = 2;
    context.beginPath();
    drawRoundedRectPath(context, x, y, cellWidth, cellHeight, 28);
    context.fill();
    context.stroke();

    const scale = Math.min((cellWidth - padding * 2) / selection.width, (cellHeight - padding * 2) / selection.height);
    const drawWidth = selection.width * scale;
    const drawHeight = selection.height * scale;
    context.drawImage(
      source.image,
      selection.x,
      selection.y,
      selection.width,
      selection.height,
      x + (cellWidth - drawWidth) / 2,
      y + (cellHeight - drawHeight) / 2,
      drawWidth,
      drawHeight,
    );
  });

  const dataUrl = canvas.toDataURL('image/png');
  iconRedrawState.referenceDataUrl = dataUrl;
  return dataUrl;
}

function composeIconRedrawEditPayload() {
  const source = iconRedrawState.source;
  const selections = getSortedIconSelections();

  if (!source || !iconRedrawState.sourceDataUrl) {
    throw new Error('先上传一张需要局部重绘的图片。');
  }

  if (!selections.length) {
    throw new Error('先在图上框选需要重绘的区域。');
  }

  const sourceWidth = source.image.width;
  const sourceHeight = source.image.height;
  const safeCanvasSize = getSafeImageEditCanvasSize(sourceWidth, sourceHeight);
  const targetWidth = safeCanvasSize.width;
  const targetHeight = safeCanvasSize.height;
  const contentScale = Math.min(1, targetWidth / sourceWidth, targetHeight / sourceHeight);
  const contentWidth = Math.min(targetWidth, roundToImageEditSize(sourceWidth * contentScale));
  const contentHeight = Math.min(targetHeight, roundToImageEditSize(sourceHeight * contentScale));
  const offsetX = Math.floor((targetWidth - contentWidth) / 2);
  const offsetY = Math.floor((targetHeight - contentHeight) / 2);
  const scaleX = contentWidth / sourceWidth;
  const scaleY = contentHeight / sourceHeight;
  const imageCanvas = document.createElement('canvas');
  const maskCanvas = document.createElement('canvas');
  const imageContext = imageCanvas.getContext('2d');
  const maskContext = maskCanvas.getContext('2d');

  if (!imageContext || !maskContext) {
    throw new Error('浏览器画布不可用。');
  }

  imageCanvas.width = targetWidth;
  imageCanvas.height = targetHeight;
  maskCanvas.width = targetWidth;
  maskCanvas.height = targetHeight;

  imageContext.clearRect(0, 0, targetWidth, targetHeight);
  imageContext.drawImage(source.image, offsetX, offsetY, contentWidth, contentHeight);

  maskContext.fillStyle = '#000000';
  maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
  maskContext.globalCompositeOperation = 'destination-out';
  selections.forEach((selection) => {
    maskContext.fillRect(
      Math.max(0, Math.floor(offsetX + selection.x * scaleX)),
      Math.max(0, Math.floor(offsetY + selection.y * scaleY)),
      Math.max(1, Math.ceil(selection.width * scaleX)),
      Math.max(1, Math.ceil(selection.height * scaleY)),
    );
  });
  maskContext.globalCompositeOperation = 'source-over';

  return {
    imageDataUrl: imageCanvas.toDataURL('image/png'),
    maskDataUrl: maskCanvas.toDataURL('image/png'),
    size: `${targetWidth}x${targetHeight}`,
    originalSize: `${sourceWidth}x${sourceHeight}`,
  };
}

async function loadIconRedrawSource(file, options = {}) {
  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    setIconRedrawMessage('请上传图片文件。', true);
    return;
  }

  if (iconRedrawState.source?.url) {
    URL.revokeObjectURL(iconRedrawState.source.url);
  }

  const [loaded, dataUrl] = await Promise.all([loadImageFromFile(file), fileToDataUrl(file)]);
  iconRedrawState.source = {
    file,
    image: loaded.image,
    url: loaded.url,
  };
  iconRedrawState.sourceDataUrl = dataUrl;
  iconRedrawState.sourceName = file.name || 'icon-redraw-source.png';
  iconRedrawState.selections = [];
  iconRedrawState.drawing = null;
  iconRedrawState.referenceDataUrl = '';
  clearIconRedrawResult();
  resetIconRedrawView();
  renderIconRedrawCanvas();
  setIconRedrawMessage(options.source === 'paste'
    ? '已从剪贴板载入图片，现在可以拖拽画框选需要重绘的区域。'
    : options.source === 'drop'
      ? '已拖拽载入图片，现在可以拖拽画框选需要重绘的区域。'
    : '图片已载入，现在可以拖拽画框选需要重绘的区域。');
}

function renderIconRedrawResult(data) {
  const imageUrl = data.imageUrl || data.historyItem?.imageUrl;
  if (!imageUrl) {
    return;
  }

  const card = data.localResultId
    ? iconRedrawResultEl.querySelector(`[data-icon-redraw-result-id="${data.localResultId}"]`) || document.createElement('article')
    : document.createElement('article');
  card.className = 'icon-redraw-result-card';
  if (data.localResultId) {
    card.dataset.iconRedrawResultId = data.localResultId;
  }

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = '局部重绘结果';

  const title = document.createElement('strong');
  title.textContent = data.title || '重绘结果';

  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = data.downloadName || `icon-redraw-${Date.now()}.png`;
  link.textContent = data.downloadText || '下载图片';

  const sendPsButton = document.createElement('button');
  sendPsButton.className = 'icon-redraw-send-ps-button';
  sendPsButton.type = 'button';
  sendPsButton.textContent = '发到 PS';
  sendPsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    sendImageToPhotoshop(
      imageUrl,
      data.title || data.historyItem?.targetName || '局部重绘',
      sendPsButton,
    );
  });

  const actions = document.createElement('div');
  actions.className = 'icon-redraw-result-actions';
  actions.append(link, sendPsButton);

  if (data.historyItem?.id) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'history-delete icon-redraw-delete-button';
    deleteButton.type = 'button';
    deleteButton.title = '删除';
    deleteButton.setAttribute('aria-label', '删除局部重绘记录');
    deleteButton.innerHTML = '<svg aria-hidden="true"><use href="#icon-trash"></use></svg>';
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteHistoryItem(data.historyItem);
    });
    actions.append(deleteButton);
  }

  card.replaceChildren(image, title, actions);
  iconRedrawResultEl.hidden = false;

  if (!card.parentElement) {
    if (data.append) {
      iconRedrawResultEl.append(card);
    } else {
      iconRedrawResultEl.prepend(card);
    }
  }
}

function createIconRedrawProgressCard(text = '等待提交...') {
  const localResultId = `icon-redraw-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const card = document.createElement('article');
  card.className = 'icon-redraw-result-card pending';
  card.dataset.iconRedrawResultId = localResultId;
  card.innerHTML = `
    <div class="icon-redraw-progress-thumb">
      <span class="history-spinner" aria-hidden="true"></span>
    </div>
    <strong>重绘生成中</strong>
    <span class="icon-redraw-progress-text">${text}</span>
  `;
  iconRedrawResultEl.hidden = false;
  iconRedrawResultEl.prepend(card);
  return localResultId;
}

function updateIconRedrawProgressCard(localResultId, text, isError = false) {
  const card = iconRedrawResultEl.querySelector(`[data-icon-redraw-result-id="${localResultId}"]`);
  if (!card) {
    return;
  }

  card.classList.toggle('error', isError);
  const status = card.querySelector('.icon-redraw-progress-text');
  if (status) {
    status.textContent = text;
  }
}

async function pollIconRedrawTask(taskId, pendingItem = null, localResultId = '') {
  for (let attempt = 1; attempt <= imageTaskPollAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    setIconRedrawMessage(`局部重绘生成中... 第 ${attempt} 次查询。`);
    if (localResultId) {
      updateIconRedrawProgressCard(localResultId, `局部重绘生成中... 第 ${attempt} 次查询。`);
    }
    if (pendingItem) {
      updatePendingGenerationItem(pendingItem.localId, {
        status: 'polling',
        statusText: `重绘中，第 ${attempt} 次查询`,
      });
    }

    const response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '查询任务失败');
    }

    if (data.status === 'completed' && data.imageUrl) {
      if (pendingItem) {
        removePendingGenerationItems([pendingItem]);
      }
      renderIconRedrawResult({ ...data, localResultId });
      await loadHistory();
      return data;
    }

    if (data.status === 'failed') {
      if (pendingItem) {
        updatePendingGenerationItem(pendingItem.localId, {
          status: 'failed',
          statusText: data.error || '任务失败',
        });
      }
      if (localResultId) {
        updateIconRedrawProgressCard(localResultId, data.error || '任务失败', true);
      }
      throw new Error(data.error || '任务失败');
    }
  }

  if (pendingItem) {
    updatePendingGenerationItem(pendingItem.localId, {
      status: 'polling',
      statusText: '后台继续重绘，稍后刷新历史',
    });
  }
  setIconRedrawMessage('任务已提交，后台会继续重绘。稍后刷新生成记录即可。');
  if (localResultId) {
    updateIconRedrawProgressCard(localResultId, '后台继续重绘，稍后刷新历史');
  }
  return { taskId, status: 'processing' };
}

async function generateIconRedraw() {
  const prompt = iconRedrawPromptEl.value.trim();

  if (!prompt) {
    setIconRedrawMessage('先写一下重绘要求。', true);
    iconRedrawPromptEl.focus();
    return;
  }

  iconRedrawGenerateEl.disabled = true;
  iconRedrawGenerateEl.querySelector('span').textContent = '提交中...';
  const pendingItems = createPendingGenerationItems({
    prompt,
    aspectRatio: iconRedrawRatioEl.value,
    resolution: iconRedrawResolutionEl.value,
    count: 1,
    kind: 'icon-redraw',
    targetName: '局部重绘',
    targetSize: '局部重绘',
  });
  const localResultId = createIconRedrawProgressCard('正在提交 gpt-image-2 局部重绘任务。');
  setIconRedrawMessage('正在提交 gpt-image-2 局部重绘任务。');

  try {
    const mergedReferenceDataUrl = iconRedrawState.referenceDataUrl || composeIconSelections();
    const submitPrompt = [
      prompt,
      '只重绘随请求附带的“合并所选区域参考图”里的这些局部元素，输出独立的合并区域高清重绘图。不要生成整张海报，不要补充原海报上下文，不要改变这些元素之间的排布关系。',
    ].join('\n');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: submitPrompt,
        aspectRatio: iconRedrawRatioEl.value,
        resolution: iconRedrawResolutionEl.value,
        count: 1,
        officialFallback: false,
        imageUrls: [mergedReferenceDataUrl],
        referenceImages: [{
          name: '合并所选区域参考图',
          dataUrl: mergedReferenceDataUrl,
        }],
        targetName: '局部重绘',
        targetSize: '合并所选区域',
        kind: 'icon-redraw',
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '局部重绘失败');
    }

    iconRedrawGenerateEl.disabled = false;
    iconRedrawGenerateEl.querySelector('span').textContent = '局部重绘';
    updatePendingGenerationItem(pendingItems[0].localId, {
      status: 'submitted',
      statusText: '已提交，等待重绘结果',
    });
    updateIconRedrawProgressCard(localResultId, '已提交，等待重绘结果。');
    setIconRedrawMessage('已提交局部重绘任务，可以继续再次生成。');

    (async () => {
      try {
        if (data.pending && data.taskId) {
          updatePendingGenerationItem(pendingItems[0].localId, {
            taskId: data.taskId,
            status: 'polling',
            statusText: '等待重绘结果',
          });
          updateIconRedrawProgressCard(localResultId, '等待重绘结果。');
          await pollIconRedrawTask(data.taskId, pendingItems[0], localResultId);
        } else if (data.pending && data.taskIds?.length) {
          updatePendingGenerationItem(pendingItems[0].localId, {
            taskId: data.taskIds[0],
            status: 'polling',
            statusText: '等待重绘结果',
          });
          updateIconRedrawProgressCard(localResultId, '等待重绘结果。');
          await pollIconRedrawTask(data.taskIds[0], pendingItems[0], localResultId);
        } else {
          removePendingGenerationItems(pendingItems);
          renderIconRedrawResult({ ...data, localResultId });
          await loadHistory();
        }

        setIconRedrawMessage('局部重绘完成。');
      } catch (error) {
        failPendingGenerationItems(pendingItems, error.message);
        updateIconRedrawProgressCard(localResultId, error.message || '局部重绘失败', true);
        setIconRedrawMessage(error.message, true);
      }
    })();
  } catch (error) {
    failPendingGenerationItems(pendingItems, error.message);
    updateIconRedrawProgressCard(localResultId, error.message || '局部重绘失败', true);
    setIconRedrawMessage(error.message, true);
    iconRedrawGenerateEl.disabled = false;
    iconRedrawGenerateEl.querySelector('span').textContent = '局部重绘';
  }
}

function drawRoundedRectPath(context, x, y, width, height, radius) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));

  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
}

function getCutCanvasPoint(event) {
  const rect = cutCanvasEl.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (cutCanvasEl.width / rect.width),
    y: (event.clientY - rect.top) * (cutCanvasEl.height / rect.height),
  };
}

function getCutRadiusValue() {
  return Math.max(0, Number(cutRadiusEl?.value || 0));
}

function getCutFitMode() {
  return cutFitModeEl?.value || 'cover';
}

function updateCutCanvasZoom() {
  const zoom = cutoutState.zoom || 1;
  cutCanvasEl.style.width = `${Math.max(1, Math.round((cutCanvasEl.width || 1) * zoom))}px`;
  cutCanvasEl.style.height = `${Math.max(1, Math.round((cutCanvasEl.height || 1) * zoom))}px`;
  if (cutZoomValueEl) {
    cutZoomValueEl.textContent = `${Math.round(zoom * 100)}%`;
  }
}

function fitCutCanvasZoom() {
  if (!cutoutState.template || !cutCanvasEl.width || !cutCanvasEl.height) {
    cutoutState.zoom = 1;
    updateCutCanvasZoom();
    return;
  }

  const shell = cutCanvasEl.parentElement;
  const availableWidth = Math.max(120, (shell?.clientWidth || cutCanvasEl.width) - 32);
  const availableHeight = Math.max(120, (shell?.clientHeight || cutCanvasEl.height) - 32);
  cutoutState.zoom = clamp(Math.min(availableWidth / cutCanvasEl.width, availableHeight / cutCanvasEl.height, 1), 0.1, 4);
  updateCutCanvasZoom();
}

function adjustCutCanvasZoom(factor, anchorEvent = null) {
  if (!cutoutState.template) {
    return;
  }

  const shell = cutCanvasShellEl || cutCanvasEl.parentElement;
  const previousZoom = cutoutState.zoom || 1;
  const nextZoom = clamp(previousZoom * factor, 0.1, 6);

  if (Math.abs(nextZoom - previousZoom) < 0.001) {
    return;
  }

  let anchor = null;
  if (shell) {
    const shellRect = shell.getBoundingClientRect();
    const canvasRect = cutCanvasEl.getBoundingClientRect();
    const clientX = anchorEvent?.clientX ?? (shellRect.left + shellRect.width / 2);
    const clientY = anchorEvent?.clientY ?? (shellRect.top + shellRect.height / 2);
    anchor = {
      x: (clientX - canvasRect.left) / previousZoom,
      y: (clientY - canvasRect.top) / previousZoom,
      offsetX: clientX - shellRect.left,
      offsetY: clientY - shellRect.top,
    };
  }

  cutoutState.zoom = nextZoom;
  updateCutCanvasZoom();

  if (shell && anchor) {
    shell.scrollLeft = Math.max(0, anchor.x * nextZoom - anchor.offsetX);
    shell.scrollTop = Math.max(0, anchor.y * nextZoom - anchor.offsetY);
  }
}

function startCutCanvasPan(event) {
  if (!cutoutState.template || event.button !== 1 || !cutCanvasShellEl) {
    return;
  }

  event.preventDefault();
  cutoutState.pan = {
    pointerId: event.pointerId ?? null,
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: cutCanvasShellEl.scrollLeft,
    scrollTop: cutCanvasShellEl.scrollTop,
  };
  cutCanvasShellEl.classList.add('is-panning');

  if (event.pointerId !== undefined && cutCanvasShellEl.setPointerCapture) {
    cutCanvasShellEl.setPointerCapture(event.pointerId);
  }
}

function moveCutCanvasPan(event) {
  const pan = cutoutState.pan;
  if (!pan || !cutCanvasShellEl) {
    return;
  }

  if (pan.pointerId !== null && event.pointerId !== undefined && pan.pointerId !== event.pointerId) {
    return;
  }

  event.preventDefault();
  cutCanvasShellEl.scrollLeft = pan.scrollLeft - (event.clientX - pan.startX);
  cutCanvasShellEl.scrollTop = pan.scrollTop - (event.clientY - pan.startY);
}

function stopCutCanvasPan(event) {
  const pan = cutoutState.pan;
  if (!pan) {
    return;
  }

  if (event && pan.pointerId !== null && event.pointerId !== undefined && pan.pointerId !== event.pointerId) {
    return;
  }

  cutoutState.pan = null;
  cutCanvasShellEl?.classList.remove('is-panning');
  if (event?.pointerId !== undefined && cutCanvasShellEl?.hasPointerCapture?.(event.pointerId)) {
    cutCanvasShellEl.releasePointerCapture(event.pointerId);
  }
}

function normalizeCutRect(start, end) {
  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  return {
    x,
    y,
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  };
}

function getCutMaskCenter(mask) {
  return {
    x: mask.x + mask.width / 2,
    y: mask.y + mask.height / 2,
  };
}

function rotatePoint(point, center, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  };
}

function pointToMaskLocal(point, mask) {
  const center = getCutMaskCenter(mask);
  const local = rotatePoint(point, center, -(mask.rotation || 0));
  return {
    x: local.x - mask.x,
    y: local.y - mask.y,
  };
}

function getCutMaskHandles(mask) {
  const center = getCutMaskCenter(mask);
  const corners = [
    { name: 'nw', x: mask.x, y: mask.y },
    { name: 'ne', x: mask.x + mask.width, y: mask.y },
    { name: 'se', x: mask.x + mask.width, y: mask.y + mask.height },
    { name: 'sw', x: mask.x, y: mask.y + mask.height },
  ].map((handle) => ({
    ...handle,
    ...rotatePoint(handle, center, mask.rotation || 0),
  }));
  const rotate = rotatePoint({
    x: mask.x + mask.width / 2,
    y: mask.y - 42,
  }, center, mask.rotation || 0);

  return [...corners, { name: 'rotate', ...rotate }];
}

function hitCutMaskHandle(point, mask) {
  const handleSize = Math.max(16, cutCanvasEl.width / 62);
  return getCutMaskHandles(mask).find((handle) => {
    const distance = Math.hypot(point.x - handle.x, point.y - handle.y);
    return distance <= handleSize;
  })?.name || '';
}

function hitCutMaskCornerRotate(point, mask) {
  const local = pointToMaskLocal(point, mask);
  const zone = Math.max(28, Math.min(mask.width, mask.height) * 0.18);
  const corners = [
    { name: 'nw', x: 0, y: 0, outsideX: local.x < 0, outsideY: local.y < 0 },
    { name: 'ne', x: mask.width, y: 0, outsideX: local.x > mask.width, outsideY: local.y < 0 },
    { name: 'se', x: mask.width, y: mask.height, outsideX: local.x > mask.width, outsideY: local.y > mask.height },
    { name: 'sw', x: 0, y: mask.height, outsideX: local.x < 0, outsideY: local.y > mask.height },
  ];

  return corners.find((corner) => {
    const distance = Math.hypot(local.x - corner.x, local.y - corner.y);
    return distance <= zone && (corner.outsideX || corner.outsideY);
  })?.name || '';
}

function hitCutMask(point, mask) {
  const local = pointToMaskLocal(point, mask);
  return local.x >= 0 && local.x <= mask.width && local.y >= 0 && local.y <= mask.height;
}

function pointToPhotoLocal(point, photo, mask, maskIndex) {
  const geometry = getCutPhotoBoundaryGeometry(photo, mask, maskIndex);
  const maskCenter = getCutMaskCenter(mask);
  const transform = getCutPhotoTransform(photo, maskIndex);
  const maskLocal = rotatePoint(point, maskCenter, -(mask.rotation || 0));
  return rotatePoint(maskLocal, geometry.center, -(transform.rotation || 0));
}

function hitCutPhotoLayer(point) {
  const photo = getCurrentCutoutPhoto();
  const index = getEditableCutMaskIndex();
  const mask = cutoutState.masks[index];
  if (!photo || !mask || cutoutState.activeLayer !== 'photo') {
    return null;
  }

  const geometry = getCutPhotoBoundaryGeometry(photo, mask, index);
  const handleSize = Math.max(10, cutCanvasEl.width / 90);
  const handle = geometry.handles.find((item) => Math.hypot(point.x - item.x, point.y - item.y) <= handleSize);
  if (handle) {
    return { index, mode: 'photo-resize', handle: handle.name };
  }

  const local = pointToPhotoLocal(point, photo, mask, index);
  const { rect } = geometry;
  const inside = local.x >= rect.x && local.x <= rect.x + rect.width
    && local.y >= rect.y && local.y <= rect.y + rect.height;
  if (inside) {
    return { index, mode: 'photo-move', handle: '' };
  }

  const cornerZone = Math.max(28, Math.min(rect.width, rect.height) * 0.12);
  const corners = [
    { name: 'nw', x: rect.x, y: rect.y },
    { name: 'ne', x: rect.x + rect.width, y: rect.y },
    { name: 'se', x: rect.x + rect.width, y: rect.y + rect.height },
    { name: 'sw', x: rect.x, y: rect.y + rect.height },
  ];
  const corner = corners.find((item) => Math.hypot(local.x - item.x, local.y - item.y) <= cornerZone);
  if (corner) {
    return { index, mode: 'photo-rotate', handle: corner.name };
  }

  return null;
}

function findCutMaskAtPoint(point) {
  for (let index = cutoutState.masks.length - 1; index >= 0; index -= 1) {
    const mask = cutoutState.masks[index];
    const cornerRotate = hitCutMaskCornerRotate(point, mask);
    if (cornerRotate) {
      return { index, mode: 'rotate', handle: cornerRotate };
    }

    const handle = hitCutMaskHandle(point, mask);
    if (handle) {
      return { index, mode: handle === 'rotate' ? 'rotate' : 'resize', handle };
    }

    if (hitCutMask(point, mask)) {
      return { index, mode: 'move', handle: '' };
    }
  }

  return null;
}

function updateCutCanvasCursor(point) {
  if (cutoutState.interaction) {
    cutCanvasEl.className = `cut-cursor-${cutoutState.interaction.mode}`;
    return;
  }

  if (!cutoutState.template || cutoutState.drawing) {
    cutCanvasEl.className = '';
    return;
  }

  const photoHit = hitCutPhotoLayer(point);
  if (photoHit) {
    cutCanvasEl.className = `cut-cursor-${photoHit.mode}`;
    return;
  }

  const hit = findCutMaskAtPoint(point);
  cutCanvasEl.className = hit ? `cut-cursor-${hit.mode}` : '';
}

function cloneCutMask(mask) {
  return { ...mask };
}

function getSelectedTemplateLayer() {
  if (!cutoutState.selectedTemplateLayerId) {
    return null;
  }

  return cutoutState.templateLayers.find((layer) => layer.id === cutoutState.selectedTemplateLayerId) || null;
}

function scrollCutLayerIntoView(layer) {
  if (!layer || !cutCanvasShellEl) {
    return;
  }

  const zoom = cutoutState.zoom || 1;
  const layerCenterX = (Number(layer.x || 0) + Number(layer.width || 0) / 2) * zoom;
  const layerCenterY = (Number(layer.y || 0) + Number(layer.height || 0) / 2) * zoom;
  cutCanvasShellEl.scrollLeft = Math.max(0, layerCenterX - cutCanvasShellEl.clientWidth / 2);
  cutCanvasShellEl.scrollTop = Math.max(0, layerCenterY - cutCanvasShellEl.clientHeight / 2);
}

function selectTemplateLayer(layer) {
  if (!layer) {
    return;
  }

  cutoutState.selectedTemplateLayerId = layer.id;
  cutoutState.activeLayer = 'template';
  cutoutState.selectedIndex = -1;
  renderCutCanvas();
  updateCutoutMeta();
  scrollCutLayerIntoView(layer);
  setCutMessage(`已选中 SVG 图层「${layer.name || '未命名'}」。`);
}

async function createMaskFromTemplateLayer(layer) {
  const mask = {
    x: Number(layer.x || 0),
    y: Number(layer.y || 0),
    width: Number(layer.width || 0),
    height: Number(layer.height || 0),
    radius: Number(layer.radius || getCutRadiusValue()),
    rotation: Number(layer.rotation || 0),
  };

  if (mask.width < 8 || mask.height < 8) {
    setCutMessage('这个图层范围太小，不能生成蒙版。', true);
    return;
  }

  const maskImageUrl = layer.svgMaskDataUrl || layer.maskImageUrl;
  if (maskImageUrl) {
    const loaded = await loadImageFromUrl(maskImageUrl);
    mask.shapeImage = loaded.image;
    mask.shapeUrl = loaded.url;
    mask.shapeDataUrl = layer.svgMaskDataUrl || await imageUrlToDataUrl(layer.maskImageUrl);
    mask.shapeOffsetX = layer.svgMaskDataUrl ? 0 : Number(layer.maskImageOffsetX || layer.x || 0);
    mask.shapeOffsetY = layer.svgMaskDataUrl ? 0 : Number(layer.maskImageOffsetY || layer.y || 0);
    mask.shapeWidth = loaded.image.naturalWidth || loaded.image.width;
    mask.shapeHeight = loaded.image.naturalHeight || loaded.image.height;
  }

  cutoutState.masks.push(mask);
  cutoutState.selectedIndex = cutoutState.masks.length - 1;
  cutoutState.activeLayer = 'mask';
  cutoutState.selectedTemplateLayerId = '';
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage(`已从 SVG 图层「${layer.name || '未命名'}」生成形状蒙版。`);
}

function setSelectedCutMask(index) {
  cutoutState.selectedIndex = index;
  cutoutState.activeLayer = 'mask';
  cutoutState.selectedTemplateLayerId = '';
  renderCutCanvas();
  updateCutoutMeta();
}

function setSelectedCutPhoto(index) {
  if (!cutoutState.photos[index]) {
    return;
  }

  cutoutState.currentPhotoIndex = index;
  cutoutState.activeLayer = 'photo';
  cutoutState.selectedTemplateLayerId = '';
  if (cutoutState.selectedIndex < 0 && cutoutState.masks.length) {
    cutoutState.selectedIndex = cutoutState.masks.length - 1;
  }
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage(`已选中照片图层 ${index + 1}，现在可以移动或缩放这张照片。`);
}

function getEditableCutMaskIndex() {
  if (cutoutState.selectedIndex >= 0 && cutoutState.masks[cutoutState.selectedIndex]) {
    return cutoutState.selectedIndex;
  }

  return cutoutState.masks.length ? cutoutState.masks.length - 1 : -1;
}

function applyCutMaskRatio(ratioText) {
  const [widthText, heightText] = String(ratioText || '').split(':');
  const ratioWidth = Number(widthText);
  const ratioHeight = Number(heightText);

  if (!ratioWidth || !ratioHeight || ratioWidth <= 0 || ratioHeight <= 0) {
    setCutMessage('请输入正确的比例，比如 16:9。', true);
    return;
  }

  const index = getEditableCutMaskIndex();
  if (index < 0) {
    setCutMessage('先画一个蒙版，再设置比例。', true);
    return;
  }

  const mask = cutoutState.masks[index];
  const center = getCutMaskCenter(mask);
  const ratio = ratioWidth / ratioHeight;
  let nextWidth = mask.width;
  let nextHeight = nextWidth / ratio;

  if (nextHeight > cutCanvasEl.height * 0.96) {
    nextHeight = cutCanvasEl.height * 0.96;
    nextWidth = nextHeight * ratio;
  }

  if (nextWidth > cutCanvasEl.width * 0.96) {
    nextWidth = cutCanvasEl.width * 0.96;
    nextHeight = nextWidth / ratio;
  }

  mask.width = Math.max(12, nextWidth);
  mask.height = Math.max(12, nextHeight);
  mask.x = center.x - mask.width / 2;
  mask.y = center.y - mask.height / 2;
  cutoutState.selectedIndex = index;
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage(`已把蒙版调整为 ${ratioWidth}:${ratioHeight}。`);
}

function applyCutMaskRadius() {
  const radius = getCutRadiusValue();
  const index = getEditableCutMaskIndex();

  if (index < 0) {
    renderCutCanvas();
    return;
  }

  cutoutState.masks[index].radius = radius;
  cutoutState.selectedIndex = index;
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
}

function updateCutMaskFromPointer(point) {
  const interaction = cutoutState.interaction;
  if (!interaction) {
    return;
  }

  const mask = cutoutState.masks[interaction.index];
  const original = interaction.original;

  if (interaction.mode === 'photo-move') {
    const photo = getCurrentCutoutPhoto();
    if (!photo) {
      return;
    }

    const transform = getCutPhotoTransform(photo, interaction.index);
    const rotation = -(mask.rotation || 0);
    const dx = point.x - interaction.start.x;
    const dy = point.y - interaction.start.y;
    transform.offsetX = original.offsetX + dx * Math.cos(rotation) - dy * Math.sin(rotation);
    transform.offsetY = original.offsetY + dx * Math.sin(rotation) + dy * Math.cos(rotation);
    return;
  }

  if (interaction.mode === 'photo-resize') {
    const photo = getCurrentCutoutPhoto();
    if (!photo) {
      return;
    }

    const transform = getCutPhotoTransform(photo, interaction.index);
    const distance = Math.max(1, Math.hypot(point.x - interaction.center.x, point.y - interaction.center.y));
    transform.scale = clamp(original.scale * (distance / interaction.startDistance), 0.2, 6);
    return;
  }

  if (interaction.mode === 'photo-rotate') {
    const photo = getCurrentCutoutPhoto();
    if (!photo) {
      return;
    }

    const transform = getCutPhotoTransform(photo, interaction.index);
    const currentAngle = Math.atan2(point.y - interaction.center.y, point.x - interaction.center.x);
    transform.rotation = (original.rotation || 0) + currentAngle - interaction.startAngle;
    return;
  }

  if (interaction.mode === 'move') {
    mask.x = original.x + point.x - interaction.start.x;
    mask.y = original.y + point.y - interaction.start.y;
    return;
  }

  if (interaction.mode === 'rotate') {
    const center = getCutMaskCenter(original);
    const startAngle = Math.atan2(interaction.start.y - center.y, interaction.start.x - center.x);
    const currentAngle = Math.atan2(point.y - center.y, point.x - center.x);
    mask.rotation = original.rotation + currentAngle - startAngle;
    return;
  }

  const center = getCutMaskCenter(original);
  const local = rotatePoint(point, center, -(original.rotation || 0));
  const oppositeMap = {
    nw: { x: original.x + original.width, y: original.y + original.height },
    ne: { x: original.x, y: original.y + original.height },
    se: { x: original.x, y: original.y },
    sw: { x: original.x + original.width, y: original.y },
  };
  const opposite = oppositeMap[interaction.handle];
  const nextX = Math.min(local.x, opposite.x);
  const nextY = Math.min(local.y, opposite.y);
  const nextWidth = Math.max(12, Math.abs(local.x - opposite.x));
  const nextHeight = Math.max(12, Math.abs(local.y - opposite.y));

  mask.x = nextX;
  mask.y = nextY;
  mask.width = nextWidth;
  mask.height = nextHeight;
  mask.rotation = original.rotation || 0;
}

function updateCutoutMeta() {
  cutMaskCountEl.textContent = `${cutoutState.masks.length} 个蒙版`;
  cutPhotoCountEl.textContent = `${cutoutState.photos.length} 张照片`;

  cutMaskListEl.replaceChildren();
  if (!cutoutState.templateLayers.length && !cutoutState.masks.length && !cutoutState.photos.length) {
    const empty = document.createElement('p');
    empty.textContent = '这里会显示 SVG 图层、照片图层和蒙版图层。点击 SVG 图层可生成蒙版。';
    cutMaskListEl.append(empty);
    return;
  }

  if (cutoutState.templateLayers.length) {
    const templateTitle = document.createElement('div');
    templateTitle.className = 'cutout-layer-title';
    templateTitle.textContent = 'SVG 图层';
    cutMaskListEl.append(templateTitle);
  }

  cutoutState.templateLayers.forEach((layer) => {
    const item = document.createElement('div');
    item.className = 'cutout-mask-item cutout-template-layer-item';
    item.classList.toggle('active', cutoutState.activeLayer === 'template' && layer.id === cutoutState.selectedTemplateLayerId);

    const info = document.createElement('span');
    info.textContent = `${layer.recommended ? '推荐 · ' : ''}${layer.name || '未命名'} · ${Math.round(layer.width)}×${Math.round(layer.height)}`;
    info.addEventListener('click', () => selectTemplateLayer(layer));

    const create = document.createElement('button');
    create.type = 'button';
    create.textContent = '生成蒙版';
    create.addEventListener('click', async (event) => {
      event.stopPropagation();
      create.disabled = true;
      create.textContent = '生成中';
      try {
        await createMaskFromTemplateLayer(layer);
      } catch (error) {
        setCutMessage(error.message || '生成蒙版失败。', true);
      } finally {
        create.disabled = false;
        create.textContent = '生成蒙版';
      }
    });

    item.addEventListener('click', () => selectTemplateLayer(layer));
    item.append(info, create);
    cutMaskListEl.append(item);
  });

  if (cutoutState.photos.length) {
    const photoTitle = document.createElement('div');
    photoTitle.className = 'cutout-layer-title';
    photoTitle.textContent = '照片图层';
    cutMaskListEl.append(photoTitle);
  }

  cutoutState.photos.forEach((photo, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'cutout-mask-item cutout-layer-button';
    item.classList.toggle('active', cutoutState.activeLayer === 'photo' && index === cutoutState.currentPhotoIndex);

    const info = document.createElement('span');
    const transform = getCutPhotoTransform(photo, getEditableCutMaskIndex());
    info.textContent = `照片 ${index + 1} · ${photo.file.name} · ${Math.round(transform.scale * 100)}%`;

    const badge = document.createElement('strong');
    badge.textContent = index === cutoutState.currentPhotoIndex ? '当前' : '选择';

    item.addEventListener('click', () => setSelectedCutPhoto(index));
    item.append(info, badge);
    cutMaskListEl.append(item);
  });

  if (cutoutState.masks.length) {
    const maskTitle = document.createElement('div');
    maskTitle.className = 'cutout-layer-title';
    maskTitle.textContent = '蒙版图层';
    cutMaskListEl.append(maskTitle);
  }

  cutoutState.masks.forEach((mask, index) => {
    const item = document.createElement('div');
    item.className = 'cutout-mask-item';
    item.classList.toggle('active', cutoutState.activeLayer === 'mask' && index === cutoutState.selectedIndex);

    const info = document.createElement('span');
    info.textContent = `蒙版 ${index + 1} · ${Math.round(mask.width)}×${Math.round(mask.height)} · ${Math.round((mask.rotation || 0) * 180 / Math.PI)}°`;
    info.addEventListener('click', () => setSelectedCutMask(index));

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '删除';
    remove.addEventListener('click', () => {
      cutoutState.masks.splice(index, 1);
      cutoutState.selectedIndex = Math.min(cutoutState.selectedIndex, cutoutState.masks.length - 1);
      clearCutoutPreviews();
      renderCutCanvas();
      updateCutoutMeta();
    });

    item.append(info, remove);
    cutMaskListEl.append(item);
  });
}

function clearCutoutPreviews() {
  cutoutState.previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  cutoutState.previews = [];
  cutPreviewCountEl.textContent = '0 个版本';
  cutPreviewGridEl.replaceChildren();
  const empty = document.createElement('p');
  empty.className = 'history-empty';
  empty.textContent = '生成预览后会在这里看到每个版本。';
  cutPreviewGridEl.append(empty);
}

function getCurrentCutoutPhoto() {
  if (cutoutState.currentPhotoIndex >= 0 && cutoutState.photos[cutoutState.currentPhotoIndex]) {
    return cutoutState.photos[cutoutState.currentPhotoIndex];
  }

  return cutoutState.photos[cutoutState.photos.length - 1] || null;
}

function createCutPhotoTransform() {
  return { scale: 1, offsetX: 0, offsetY: 0, rotation: 0 };
}

function getCutPhotoTransform(photo, maskIndex) {
  if (!photo.transforms) {
    photo.transforms = [];
  }

  if (!photo.transforms[maskIndex]) {
    photo.transforms[maskIndex] = createCutPhotoTransform();
  }

  return photo.transforms[maskIndex];
}

function getCutPhotoDrawRect(photo, mask, fitMode, maskIndex = 0) {
  const photoRatio = photo.image.width / photo.image.height;
  const maskRatio = mask.width / mask.height;
  const useCover = fitMode === 'cover';
  const fillByWidth = useCover ? photoRatio < maskRatio : photoRatio > maskRatio;
  const drawWidth = fillByWidth ? mask.width : mask.height * photoRatio;
  const drawHeight = fillByWidth ? mask.width / photoRatio : mask.height;
  const transform = getCutPhotoTransform(photo, maskIndex);
  const width = drawWidth * transform.scale;
  const height = drawHeight * transform.scale;

  return {
    x: mask.x + (mask.width - width) / 2 + transform.offsetX,
    y: mask.y + (mask.height - height) / 2 + transform.offsetY,
    width,
    height,
  };
}

function getCutPhotoBoundaryGeometry(photo, mask, maskIndex) {
  const rect = getCutPhotoDrawRect(photo, mask, getCutFitMode(), maskIndex);
  const maskCenter = getCutMaskCenter(mask);
  const photoCenter = {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
  const transform = getCutPhotoTransform(photo, maskIndex);
  const rotateLocal = (point) => rotatePoint(point, photoCenter, transform.rotation || 0);
  const toWorld = (point) => rotatePoint(rotateLocal(point), maskCenter, mask.rotation || 0);
  const points = [
    { name: 'nw', x: rect.x, y: rect.y },
    { name: 'n', x: rect.x + rect.width / 2, y: rect.y },
    { name: 'ne', x: rect.x + rect.width, y: rect.y },
    { name: 'e', x: rect.x + rect.width, y: rect.y + rect.height / 2 },
    { name: 'se', x: rect.x + rect.width, y: rect.y + rect.height },
    { name: 's', x: rect.x + rect.width / 2, y: rect.y + rect.height },
    { name: 'sw', x: rect.x, y: rect.y + rect.height },
    { name: 'w', x: rect.x, y: rect.y + rect.height / 2 },
  ];

  return {
    rect,
    center: photoCenter,
    worldCenter: rotatePoint(photoCenter, maskCenter, mask.rotation || 0),
    handles: points.map((point) => ({
      ...point,
      ...toWorld(point),
    })),
  };
}

function drawCutPhotoBoundary(context, photo, mask, maskIndex) {
  const geometry = getCutPhotoBoundaryGeometry(photo, mask, maskIndex);
  const { rect } = geometry;
  const center = getCutMaskCenter(mask);
  const transform = getCutPhotoTransform(photo, maskIndex);
  const handleSize = Math.max(16, cutCanvasEl.width / 68);

  context.save();
  context.translate(center.x, center.y);
  context.rotate(mask.rotation || 0);
  context.translate(-center.x, -center.y);
  context.translate(geometry.center.x, geometry.center.y);
  context.rotate(transform.rotation || 0);
  context.translate(-geometry.center.x, -geometry.center.y);
  context.strokeStyle = '#2f7dff';
  context.lineWidth = Math.max(1.5, cutCanvasEl.width / 760);
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  context.beginPath();
  context.moveTo(rect.x, rect.y);
  context.lineTo(rect.x + rect.width, rect.y + rect.height);
  context.moveTo(rect.x + rect.width, rect.y);
  context.lineTo(rect.x, rect.y + rect.height);
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = '#ffffff';
  context.strokeStyle = '#2f7dff';
  context.lineWidth = Math.max(1.5, cutCanvasEl.width / 760);
  geometry.handles.forEach((handle) => {
    context.beginPath();
    context.rect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawSelectedTemplateLayerHighlight(context) {
  const layer = getSelectedTemplateLayer();
  if (!layer) {
    return;
  }

  const x = Number(layer.x || 0);
  const y = Number(layer.y || 0);
  const width = Number(layer.width || 0);
  const height = Number(layer.height || 0);

  if (width < 1 || height < 1) {
    return;
  }

  context.save();
  context.setLineDash([Math.max(8, cutCanvasEl.width / 130), Math.max(5, cutCanvasEl.width / 220)]);
  context.lineWidth = Math.max(2, cutCanvasEl.width / 520);
  context.strokeStyle = '#ff9f1c';
  context.strokeRect(x, y, width, height);
  context.setLineDash([]);
  context.lineWidth = Math.max(1.25, cutCanvasEl.width / 900);
  context.strokeStyle = 'rgba(255, 255, 255, 0.92)';
  context.strokeRect(x + 2, y + 2, Math.max(1, width - 4), Math.max(1, height - 4));
  context.restore();
}

function renderCutCanvas() {
  const context = cutCanvasEl.getContext('2d');
  const template = cutoutState.template;

  if (!template) {
    context.clearRect(0, 0, cutCanvasEl.width || 1, cutCanvasEl.height || 1);
    cutCanvasEmptyEl.hidden = false;
    return;
  }

  cutCanvasEmptyEl.hidden = true;
  context.clearRect(0, 0, cutCanvasEl.width, cutCanvasEl.height);
  context.drawImage(template.image, 0, 0, cutCanvasEl.width, cutCanvasEl.height);
  drawSelectedTemplateLayerHighlight(context);

  const currentPhoto = getCurrentCutoutPhoto();
  if (currentPhoto) {
    cutoutState.masks.forEach((mask, index) => {
      drawPhotoIntoMask(context, currentPhoto, mask, getCutFitMode(), index);
    });
  }

  const masks = cutoutState.drawing
    ? [...cutoutState.masks, cutoutState.drawing]
    : cutoutState.masks;

  masks.forEach((mask, index) => {
    if (cutoutState.activeLayer === 'photo' && index === cutoutState.selectedIndex && currentPhoto) {
      drawCutPhotoBoundary(context, currentPhoto, mask, index);
      return;
    }

    if (mask.shapeImage) {
      context.save();
      context.globalAlpha = 0.28;
      context.drawImage(
        mask.shapeImage,
        Number(mask.shapeOffsetX ?? mask.x),
        Number(mask.shapeOffsetY ?? mask.y),
        Number(mask.shapeWidth || mask.width),
        Number(mask.shapeHeight || mask.height),
      );
      context.globalAlpha = 1;
      context.strokeStyle = index === cutoutState.selectedIndex ? '#ef9f2d' : '#0b987e';
      context.lineWidth = Math.max(2, cutCanvasEl.width / 560);
      context.strokeRect(mask.x, mask.y, mask.width, mask.height);
      context.restore();
      return;
    }

    context.save();
    const center = getCutMaskCenter(mask);
    context.translate(center.x, center.y);
    context.rotate(mask.rotation || 0);
    context.translate(-center.x, -center.y);
    context.beginPath();
    drawRoundedRectPath(context, mask.x, mask.y, mask.width, mask.height, mask.radius);
    context.fillStyle = 'rgba(17, 185, 146, 0.16)';
    context.strokeStyle = index === cutoutState.selectedIndex ? '#ef9f2d' : '#0b987e';
    context.lineWidth = Math.max(2, cutCanvasEl.width / 560);
    context.fill();
    context.stroke();
    context.restore();

    if (cutoutState.activeLayer === 'mask' && index === cutoutState.selectedIndex) {
      const handleSize = Math.max(10, cutCanvasEl.width / 90);
      const handles = getCutMaskHandles(mask);
      const rotateHandle = handles.find((handle) => handle.name === 'rotate');
      const topCenter = rotatePoint({
        x: mask.x + mask.width / 2,
        y: mask.y,
      }, center, mask.rotation || 0);

      context.save();
      context.strokeStyle = '#ef9f2d';
      context.fillStyle = '#ffffff';
      context.lineWidth = Math.max(2, cutCanvasEl.width / 620);
      context.beginPath();
      context.moveTo(topCenter.x, topCenter.y);
      context.lineTo(rotateHandle.x, rotateHandle.y);
      context.stroke();
      handles.forEach((handle) => {
        context.beginPath();
        if (handle.name === 'rotate') {
          context.arc(handle.x, handle.y, handleSize * 0.62, 0, Math.PI * 2);
        } else {
          context.rect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
        }
        context.fill();
        context.stroke();
      });
      context.restore();
    }
  });
}

function drawPhotoIntoMask(context, photo, mask, fitMode, maskIndex = 0) {
  if (mask.shapeImage) {
    drawPhotoIntoShapeMask(context, photo, mask, fitMode, maskIndex);
    return;
  }

  context.save();
  const center = getCutMaskCenter(mask);
  context.translate(center.x, center.y);
  context.rotate(mask.rotation || 0);
  context.translate(-center.x, -center.y);
  context.beginPath();
  drawRoundedRectPath(context, mask.x, mask.y, mask.width, mask.height, mask.radius);
  context.clip();

  const rect = getCutPhotoDrawRect(photo, mask, fitMode, maskIndex);
  const transform = getCutPhotoTransform(photo, maskIndex);

  context.fillStyle = '#ffffff';
  context.fillRect(mask.x, mask.y, mask.width, mask.height);
  context.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
  context.rotate(transform.rotation || 0);
  context.translate(-(rect.x + rect.width / 2), -(rect.y + rect.height / 2));
  context.drawImage(photo.image, rect.x, rect.y, rect.width, rect.height);
  context.restore();
}

function drawPhotoIntoShapeMask(context, photo, mask, fitMode, maskIndex = 0) {
  const rect = getCutPhotoDrawRect(photo, mask, fitMode, maskIndex);
  const transform = getCutPhotoTransform(photo, maskIndex);
  const offscreen = document.createElement('canvas');
  offscreen.width = Math.max(1, Math.round(mask.shapeWidth || mask.width));
  offscreen.height = Math.max(1, Math.round(mask.shapeHeight || mask.height));
  const offscreenContext = offscreen.getContext('2d');

  offscreenContext.save();
  offscreenContext.translate(
    rect.x - Number(mask.shapeOffsetX ?? mask.x) + rect.width / 2,
    rect.y - Number(mask.shapeOffsetY ?? mask.y) + rect.height / 2,
  );
  offscreenContext.rotate(transform.rotation || 0);
  offscreenContext.translate(-rect.width / 2, -rect.height / 2);
  offscreenContext.drawImage(photo.image, 0, 0, rect.width, rect.height);
  offscreenContext.restore();
  offscreenContext.globalCompositeOperation = 'destination-in';
  offscreenContext.drawImage(mask.shapeImage, 0, 0, offscreen.width, offscreen.height);
  offscreenContext.globalCompositeOperation = 'source-over';

  context.drawImage(offscreen, Number(mask.shapeOffsetX ?? mask.x), Number(mask.shapeOffsetY ?? mask.y));
}

function buildCutoutCanvas(photo) {
  const template = cutoutState.template;
  const canvas = document.createElement('canvas');
  canvas.width = template.image.width;
  canvas.height = template.image.height;
  const context = canvas.getContext('2d');

  context.drawImage(template.image, 0, 0, canvas.width, canvas.height);
  cutoutState.masks.forEach((mask, index) => {
    drawPhotoIntoMask(context, photo, mask, getCutFitMode(), index);
  });

  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

function getCutoutFileName(index) {
  const rawName = cutExportNameEl.value.trim() || 'slice';
  const safeName = rawName.replace(/[\\/:*?"<>|]+/g, '-');
  return `${safeName}${String(index + 1).padStart(2, '0')}.png`;
}

async function generateCutoutPreviews() {
  if (!cutoutState.template) {
    setCutMessage('先上传 SVG 模板。', true);
    return false;
  }

  if (!cutoutState.masks.length) {
    setCutMessage('先点击右侧 SVG 图层生成至少 1 个照片区域。', true);
    return false;
  }

  if (!cutoutState.photos.length) {
    setCutMessage('先导入要替换进去的照片。', true);
    return false;
  }

  cutGeneratePreviewEl.disabled = true;
  cutGeneratePreviewEl.querySelector('span').textContent = '生成中...';
  clearCutoutPreviews();

  try {
    const previews = [];
    for (const [index, photo] of cutoutState.photos.entries()) {
      const canvas = buildCutoutCanvas(photo);
      const blob = await canvasToBlob(canvas);
      const url = URL.createObjectURL(blob);
      previews.push({
        url,
        name: getCutoutFileName(index),
      });
    }

    cutoutState.previews = previews;
    renderCutoutPreviews();
    setCutMessage(`已生成 ${previews.length} 个版本预览。`);
    return true;
  } catch (error) {
    setCutMessage(error.message || '生成版本预览失败。', true);
    return false;
  } finally {
    cutGeneratePreviewEl.disabled = false;
    cutGeneratePreviewEl.querySelector('span').textContent = '生成版本预览';
  }
}

function renderCutoutPreviews() {
  cutPreviewGridEl.replaceChildren();
  cutPreviewCountEl.textContent = `${cutoutState.previews.length} 个版本`;

  if (!cutoutState.previews.length) {
    const empty = document.createElement('p');
    empty.className = 'history-empty';
    empty.textContent = '生成预览后会在这里看到每个版本。';
    cutPreviewGridEl.append(empty);
    return;
  }

  cutoutState.previews.forEach((preview, index) => {
    const card = document.createElement('article');
    card.className = 'cutout-preview-card';

    const image = document.createElement('img');
    image.src = preview.url;
    image.alt = preview.name;
    image.addEventListener('click', () => openCutoutPreviewModal(index));

    const title = document.createElement('strong');
    title.textContent = preview.name;

    const link = document.createElement('a');
    link.href = preview.url;
    link.download = preview.name;
    link.textContent = '下载';

    card.append(image, title, link);
    cutPreviewGridEl.append(card);
  });
}

function openCutoutPreviewModal(index) {
  const preview = cutoutState.previews[index];
  if (!preview) {
    return;
  }

  modalMode = 'cutout';
  cutoutPreviewIndex = index;
  imageModalEl.classList.add('modal-simple');
  resetModalImageView();
  modalImageEl.src = preview.url;
  modalDownloadEl.href = preview.url;
  modalDownloadEl.download = preview.name;
  modalPromptEl.textContent = `版本 ${index + 1} / ${cutoutState.previews.length}`;
  renderModalReferences([]);
  modalRatioEl.textContent = cutoutState.template
    ? `${cutoutState.template.image.width}×${cutoutState.template.image.height}`
    : '-';
  modalResolutionEl.textContent = preview.name;
  modalModelEl.textContent = '切图版本预览';
  modalRegenerateEl.hidden = true;
  updateModalNav();
  showImageModal();
}

async function loadCutoutTemplate(file) {
  if (!file) {
    return;
  }

  if (/\.svg$/i.test(file.name) || file.type === 'image/svg+xml') {
    await loadCutoutSvgTemplate(file);
    return;
  }

  throw new Error('请上传 SVG 模板文件。');
}

async function loadCutoutSvgTemplate(file) {
  setCutMessage('正在解析 SVG...');
  const data = await parseSvgTemplate(file);
  const loaded = await loadImageFromUrl(svgTextToDataUrl(data.svgText));
  const baseName = file.name.replace(/\.[^.]+$/, '');

  if (cutoutState.template?.url?.startsWith('blob:')) {
    URL.revokeObjectURL(cutoutState.template.url);
  }

  cutoutState.template = {
    file,
    image: loaded.image,
    url: loaded.url,
    source: 'svg',
  };
  cutoutState.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
  cutoutState.photos = [];
  cutoutState.currentPhotoIndex = -1;
  cutoutState.masks = [];
  cutoutState.selectedTemplateLayerId = '';
  cutoutState.templateLayers = (data.layers || []).map((layer) => ({
    id: layer.id,
    name: layer.name || '未命名图层',
    x: Number(layer.x || 0),
    y: Number(layer.y || 0),
    width: Number(layer.width || 0),
    height: Number(layer.height || 0),
    radius: Number(layer.radius || getCutRadiusValue()),
    rotation: Number(layer.rotation || 0),
    recommended: Boolean(layer.recommended),
    svgMaskDataUrl: layer.svgMaskDataUrl || '',
  })).filter((layer) => layer.width >= 8 && layer.height >= 8);
  cutoutState.selectedIndex = -1;
  cutoutState.activeLayer = 'mask';
  cutCanvasEl.width = data.width;
  cutCanvasEl.height = data.height;
  fitCutCanvasZoom();
  cutExportNameEl.value = baseName || 'slice';
  cutTemplateInfoEl.textContent = `${file.name} · ${data.width}×${data.height}`;
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage(cutoutState.templateLayers.length
    ? `SVG 已导入，读取到 ${cutoutState.templateLayers.length} 个可用图层。点击右侧图层生成蒙版。`
    : 'SVG 已导入，但没有读取到可用图层。请确认元素可见且尺寸足够。');
}

async function loadCutoutPhotos(files, options = {}) {
  const imageFiles = [...files].filter((file) => file.type.startsWith('image/'));
  const actionText = options.source === 'paste' ? '粘贴' : '导入';

  for (const file of imageFiles) {
    const loaded = await loadImageFromFile(file);
    cutoutState.photos.push({
      file,
      image: loaded.image,
      url: loaded.url,
      transforms: [],
    });
  }

  if (imageFiles.length) {
    cutoutState.currentPhotoIndex = cutoutState.photos.length - 1;
    cutoutState.activeLayer = 'photo';
    if (cutoutState.selectedIndex < 0 && cutoutState.masks.length) {
      cutoutState.selectedIndex = cutoutState.masks.length - 1;
    }
  }

  cutPhotoInputEl.value = '';
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();

  if (!imageFiles.length) {
    setCutMessage('没有读取到图片文件。', true);
    return;
  }

  const totalText = `当前共 ${cutoutState.photos.length} 个可导出版本。`;
  const previewText = cutoutState.masks.length
    ? '已替换到左侧蒙版区域。'
    : '点击右侧 SVG 图层生成照片区域后会替换到模板里。';
  setCutMessage(`已${actionText} ${imageFiles.length} 张替换照片，${previewText}${totalText}`);
}

async function exportCutoutPreviews() {
  if (!cutoutState.previews.length) {
    const ok = await generateCutoutPreviews();
    if (!ok) {
      return;
    }
  }

  cutoutState.previews.forEach((preview, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = preview.url;
      link.download = preview.name;
      document.body.append(link);
      link.click();
      link.remove();
    }, index * 120);
  });
  setCutMessage(`开始导出 ${cutoutState.previews.length} 个版本。`);
}

async function sendCurrentImageToResize() {
  const imageUrl = currentPreview?.imageUrl || currentPreview?.displayUrl || resultFrameEl.dataset.imageUrl;

  if (!imageUrl) {
    setMessage('先选择一张图片再改尺寸。', true);
    return;
  }

  sendToResizeEl.disabled = true;
  sendToResizeEl.textContent = '导入中...';

  try {
    const dataUrl = await urlToDataUrl(imageUrl);
    const file = dataUrlToFile(dataUrl, `改尺寸参考图-${Date.now()}.png`);
    showResizePage();
    loadResizeImage(file);
    setResizeMessage('已自动导入当前图片，可以勾选尺寸生成。');
  } catch (error) {
    setMessage(error.message || '导入改尺寸失败。', true);
  } finally {
    sendToResizeEl.disabled = false;
    sendToResizeEl.textContent = '改尺寸';
  }
}

async function sendCurrentImageToLayer() {
  const imageUrl = currentPreview?.imageUrl || currentPreview?.displayUrl || resultFrameEl.dataset.imageUrl;

  if (!imageUrl) {
    setMessage('先选择一张图片再分层。', true);
    return;
  }

  sendToLayerEl.disabled = true;
  sendToLayerEl.textContent = '导入中...';

  try {
    const dataUrl = await urlToDataUrl(imageUrl);
    const file = dataUrlToFile(dataUrl, `分层参考图-${Date.now()}.png`);
    showLayerPage();
    loadLayerImage(file);
  } catch (error) {
    setMessage(error.message || '导入分层失败。', true);
  } finally {
    sendToLayerEl.disabled = false;
    sendToLayerEl.textContent = '分层';
  }
}

async function sendCurrentImageToPhotoshop() {
  const imageUrl = currentPreview?.imageUrl || currentPreview?.displayUrl || resultFrameEl.dataset.imageUrl;

  if (!imageUrl) {
    setMessage('先选择一张图片再发送到 PS。', true);
    return;
  }

  await sendImageToPhotoshop(
    imageUrl,
    currentPreview?.prompt || currentPreview?.targetName || '生成图片',
    sendToPhotoshopEl,
  );
}

function renderModalReferences(referenceItems = []) {
  modalReferenceListEl.replaceChildren();

  if (!referenceItems.length) {
    const empty = document.createElement('p');
    empty.textContent = '未记录参考图';
    modalReferenceListEl.append(empty);
    return;
  }

  referenceItems.forEach((item, index) => {
    const node = document.createElement('div');
    node.className = 'modal-reference-item';

    const image = document.createElement('img');
    image.src = item.imageUrl || item.url || '';
    image.alt = item.name || `参考图 ${index + 1}`;
    makeImageOpenable(image, image.src, item.name || `参考图 ${index + 1}`);

    const label = document.createElement('span');
    label.title = item.name || `参考图 ${index + 1}`;
    label.textContent = item.name || `参考图 ${index + 1}`;

    node.append(image, label);
    modalReferenceListEl.append(node);
  });
}

function renderReferencePreview() {
  referencePreviewEl.replaceChildren();
  referencePreviewEl.hidden = referenceImages.length === 0;

  if (referenceImages.length) {
    const count = document.createElement('span');
    count.className = 'reference-count';
    count.textContent = `已选择 ${referenceImages.length} 张参考图`;
    referencePreviewEl.append(count);
  }

  referenceImages.forEach((item) => {
    const thumb = document.createElement('div');
    thumb.className = 'reference-thumb';
    thumb.dataset.referenceId = item.id;
    thumb.draggable = true;
    thumb.title = '按住拖动可调整参考图顺序';

    const image = document.createElement('img');
    image.src = item.previewUrl;
    image.alt = item.name;
    makeImageOpenable(image, item.previewUrl, item.name || '参考图预览');

    thumb.addEventListener('dblclick', (event) => {
      if (event.target.closest('.reference-remove')) {
        return;
      }
      event.stopPropagation();
      openSingleImageModal({
        imageUrl: item.previewUrl,
        downloadName: item.name || '',
        title: item.name || '参考图预览',
      });
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'reference-remove';
    removeButton.setAttribute('aria-label', `删除 ${item.name}`);
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
      URL.revokeObjectURL(item.previewUrl);
      referenceImages = referenceImages.filter((imageItem) => imageItem.id !== item.id);
      renderReferencePreview();
    });

    thumb.addEventListener('dragstart', (event) => {
      referenceDragId = item.id;
      thumb.classList.add('is-dragging');
      referencePreviewEl.classList.add('is-sorting');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', item.id);
    });

    thumb.addEventListener('dragover', (event) => {
      if (!referenceDragId || referenceDragId === item.id) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      thumb.classList.add('is-drop-target');
    });

    thumb.addEventListener('dragleave', () => {
      thumb.classList.remove('is-drop-target');
    });

    thumb.addEventListener('drop', (event) => {
      event.preventDefault();
      const draggedId = referenceDragId || event.dataTransfer.getData('text/plain');
      thumb.classList.remove('is-drop-target');
      reorderReferenceImages(draggedId, item.id);
    });

    thumb.addEventListener('dragend', () => {
      referenceDragId = '';
      referencePreviewEl.classList.remove('is-sorting');
      referencePreviewEl.querySelectorAll('.reference-thumb').forEach((node) => {
        node.classList.remove('is-dragging', 'is-drop-target');
      });
    });

    thumb.append(image, removeButton);
    referencePreviewEl.append(thumb);
  });

  uploadNameEl.textContent = '';
}

function reorderReferenceImages(draggedId, targetId) {
  if (!draggedId || !targetId || draggedId === targetId) {
    return;
  }

  const fromIndex = referenceImages.findIndex((item) => item.id === draggedId);
  const toIndex = referenceImages.findIndex((item) => item.id === targetId);

  if (fromIndex < 0 || toIndex < 0) {
    return;
  }

  const nextImages = [...referenceImages];
  const [draggedItem] = nextImages.splice(fromIndex, 1);
  nextImages.splice(toIndex, 0, draggedItem);
  referenceImages = nextImages;
  renderReferencePreview();
}

function scrollReferenceControlsIntoView() {
  if (generatorPageEl.hidden) {
    return;
  }

  generatorPageEl.classList.add('reference-scroll-ready');

  const scrollToReferenceActions = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const inputPane = generatorPageEl.querySelector('.input-pane');
    const target = generatorPageEl.querySelector('.console') || inputPane || referencePreviewEl;

    if (inputPane && inputPane.scrollHeight > inputPane.clientHeight + 4) {
      inputPane.scrollTo({ top: inputPane.scrollHeight, behavior });
    }

    if (!target) {
      return;
    }

    const targetRect = target.getBoundingClientRect();
    const topGap = 8;
    const maxScrollTop = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ) - window.innerHeight;
    const nextScrollTop = Math.min(
      maxScrollTop,
      window.scrollY + targetRect.top - topGap,
    );

    window.scrollTo({ top: Math.max(0, nextScrollTop), behavior });
  };

  requestAnimationFrame(() => {
    scrollToReferenceActions();
    window.setTimeout(scrollToReferenceActions, 180);
  });
}

async function addReferenceFiles(files) {
  const imageFiles = [...files].filter((file) => file.type.startsWith('image/'));
  const validFiles = imageFiles.filter((file) => file.size <= 10 * 1024 * 1024);

  if (imageFiles.length !== validFiles.length) {
    setMessage('有图片超过 10MB，已跳过。', true);
  }

  const availableSlots = Math.max(0, 16 - referenceImages.length);
  const filesToAdd = validFiles.slice(0, availableSlots);

  if (validFiles.length > availableSlots) {
    setMessage('参考图最多保留 16 张，超过的已跳过。', true);
  }

  const loadedImages = filesToAdd.map((file) => ({
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    name: file.name,
    file,
    previewUrl: URL.createObjectURL(file),
  }));

  referenceImages = [...referenceImages, ...loadedImages];
  renderReferencePreview();
  referenceImageEl.value = '';

  if (loadedImages.length) {
    scrollReferenceControlsIntoView();
  }
}

async function restoreReferencesFromHistory(references = []) {
  const restored = [];

  for (const [index, item] of references.entries()) {
    const imageUrl = item.imageUrl || item.url || item.dataUrl || '';
    if (!imageUrl) {
      continue;
    }

    const dataUrl = imageUrl.startsWith('data:')
      ? imageUrl
      : await urlToDataUrl(imageUrl);
    const mimeType = dataUrl.match(/^data:([^;]+);base64,/)?.[1] || 'image/png';
    const extension = mimeType.includes('jpeg') ? 'jpg' : mimeType.includes('webp') ? 'webp' : 'png';
    const name = item.name || `参考图 ${index + 1}.${extension}`;
    const file = dataUrlToFile(dataUrl, name);

    restored.push({
      id: `${name}-${file.size}-${Date.now()}-${crypto.randomUUID()}`,
      name,
      file,
      previewUrl: URL.createObjectURL(file),
    });
  }

  return restored;
}

async function restorePreviewToCreateForm(preview) {
  if (!preview) {
    return;
  }

  const prompt = preview.prompt || '';
  promptEl.value = prompt;
  aspectRatioEl.value = preview.aspectRatio || aspectRatioEl.value;
  resolutionEl.value = preview.resolution || resolutionEl.value;
  aspectRatioEl.dispatchEvent(new Event('change', { bubbles: true }));
  resolutionEl.dispatchEvent(new Event('change', { bubbles: true }));

  referenceImages.forEach((item) => {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
  });

  referenceImages = await restoreReferencesFromHistory(preview.referenceImages || []);
  renderReferencePreview();
  showGeneratorPage();
  closeImageModal();
  setMessage('已把提示词和参考图填回创作页，点击“生成图片”后才会重新生成。');
  window.setTimeout(() => {
    promptEl.focus({ preventScroll: true });
  }, 120);
}

function getClipboardImageFiles(event, prefix = 'clipboard-image') {
  return [...(event.clipboardData?.items || [])]
    .filter((item) => item.type.startsWith('image/'))
    .map((item, index) => {
      const file = item.getAsFile();
      if (!file) {
        return null;
      }

      const mimeType = item.type || file.type || 'image/png';
      const extension = mimeType.includes('jpeg') ? 'jpg' : mimeType.includes('webp') ? 'webp' : 'png';
      return new File([file], `${prefix}-${Date.now()}-${index}.${extension}`, {
        type: mimeType,
        lastModified: Date.now(),
      });
    })
    .filter(Boolean);
}

async function addReferenceFilesFromClipboard(event) {
  if (generatorPageEl.hidden || settingsPageEl.hidden === false) {
    return false;
  }

  const imageFiles = getClipboardImageFiles(event, 'clipboard-reference');

  if (!imageFiles.length) {
    return false;
  }

  event.preventDefault();
  await addReferenceFiles(imageFiles);
  return true;
}

async function addResizeImageFromClipboard(event) {
  if (resizePageEl.hidden || settingsPageEl.hidden === false) {
    return false;
  }

  const imageFiles = getClipboardImageFiles(event, 'clipboard-resize');

  if (!imageFiles.length) {
    return false;
  }

  event.preventDefault();
  loadResizeImage(imageFiles[0]);
  setResizeMessage('已从剪贴板导入参考图。');
  return true;
}

document.addEventListener('keydown', (event) => {
  const isUndo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z';
  if (!isUndo || cutoutToolEl.hidden || !cutoutState.masks.length) {
    return;
  }

  const activeTag = document.activeElement?.tagName?.toLowerCase();
  if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
    return;
  }

  event.preventDefault();
  cutoutState.masks.pop();
  cutoutState.selectedIndex = Math.min(cutoutState.selectedIndex, cutoutState.masks.length - 1);
  clearCutoutPreviews();
  renderCutCanvas();
  updateCutoutMeta();
  setCutMessage('已撤销上一个蒙版。');
});

referenceImageEl.addEventListener('change', async () => {
  await addReferenceFiles(referenceImageEl.files || []);
});

uploadBoxEl.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadBoxEl.classList.add('dragging');
});

uploadBoxEl.addEventListener('dragleave', () => {
  uploadBoxEl.classList.remove('dragging');
});

uploadBoxEl.addEventListener('drop', async (event) => {
  event.preventDefault();
  uploadBoxEl.classList.remove('dragging');
  await addReferenceFiles(event.dataTransfer?.files || []);
});

function applyModalImageTransform() {
  modalImageEl.style.transform = `translate(${modalView.x}px, ${modalView.y}px) scale(${modalView.scale})`;
  modalCanvasEl.classList.toggle('is-panning', modalView.isPanning);
  modalCanvasEl.classList.toggle('is-zoomed', modalView.scale > 1.01);
}

function fitModalImageToCanvas() {
  if (imageModalEl.hidden || !modalImageEl.naturalWidth || !modalImageEl.naturalHeight) {
    return;
  }

  const canvasRect = modalCanvasEl.getBoundingClientRect();
  const maxWidth = Math.max(1, canvasRect.width);
  const maxHeight = Math.max(1, canvasRect.height);
  const scale = Math.min(
    maxWidth / modalImageEl.naturalWidth,
    maxHeight / modalImageEl.naturalHeight,
    1,
  );

  modalImageEl.style.width = `${Math.floor(modalImageEl.naturalWidth * scale)}px`;
  modalImageEl.style.height = `${Math.floor(modalImageEl.naturalHeight * scale)}px`;
}

function resetModalImageView() {
  modalView.scale = 1;
  modalView.x = 0;
  modalView.y = 0;
  modalView.isPanning = false;
  modalView.lastX = 0;
  modalView.lastY = 0;
  applyModalImageTransform();
}

function showImageModal() {
  document.documentElement.classList.add('modal-viewer-open');
  document.body.classList.add('modal-viewer-open');
  imageModalEl.hidden = false;
  requestAnimationFrame(fitModalImageToCanvas);
  resetModalImageView();
}

function getModalDisplayedImageRect() {
  return modalImageEl.getBoundingClientRect();
}

function isPointInsideModalImage(clientX, clientY) {
  const rect = getModalDisplayedImageRect();
  return clientX >= rect.left
    && clientX <= rect.right
    && clientY >= rect.top
    && clientY <= rect.bottom;
}

function openImageModal() {
  const imageUrl = currentPreview?.displayUrl || resultFrameEl.dataset.imageUrl;
  if (!imageUrl) {
    return;
  }

  modalMode = 'history';
  imageModalEl.classList.remove('modal-simple');
  resetModalImageView();
  modalImageEl.src = imageUrl;
  modalDownloadEl.href = currentPreview?.imageUrl || imageUrl;
  modalDownloadEl.download = '';
  modalPromptEl.textContent = currentPreview?.prompt || '未记录提示词';
  renderModalReferences(currentPreview?.referenceImages || []);
  modalRatioEl.textContent = currentPreview?.targetSize
    ? `画布 GPT ${getAspectRatioText(currentPreview.aspectRatio)} · 内容 ${currentPreview.targetRatio || currentPreview.targetSize}`
    : (currentPreview?.size || '-');
  modalResolutionEl.textContent = currentPreview?.resolution || '-';
  modalModelEl.textContent = currentPreview?.model || modelEl.value || '-';
  modalRegenerateEl.hidden = false;
  updateModalNav();
  showImageModal();
}

function closeImageModal() {
  imageModalEl.hidden = true;
  document.documentElement.classList.remove('modal-viewer-open');
  document.body.classList.remove('modal-viewer-open');
  imageModalEl.classList.remove('modal-simple');
  modalImageEl.src = '';
  modalMode = 'history';
  cutoutPreviewIndex = -1;
  modalRegenerateEl.hidden = false;
  resetModalImageView();
}

sendToResizeEl.addEventListener('click', sendCurrentImageToResize);
sendToLayerEl.addEventListener('click', sendCurrentImageToLayer);
sendToPhotoshopEl.addEventListener('click', sendCurrentImageToPhotoshop);
fullscreenEl.addEventListener('click', openImageModal);
closeModalEl.addEventListener('click', closeImageModal);
modalPrevEl.addEventListener('click', (event) => {
  event.stopPropagation();
  navigateModal(-1);
});
modalNextEl.addEventListener('click', (event) => {
  event.stopPropagation();
  navigateModal(1);
});

modalRegenerateEl.addEventListener('click', async () => {
  if (!currentPreview) {
    return;
  }

  const previousText = modalRegenerateEl.textContent;
  modalRegenerateEl.disabled = true;
  modalRegenerateEl.textContent = '填入中';

  try {
    await restorePreviewToCreateForm(currentPreview);
  } catch (error) {
    setMessage(error.message || '填回创作页失败。', true);
  } finally {
    modalRegenerateEl.disabled = false;
    modalRegenerateEl.textContent = previousText || '重新生成';
  }
});

modalCanvasEl.addEventListener('dblclick', (event) => {
  if (imageModalEl.hidden || event.target.closest('button, a')) {
    return;
  }

  if (!isPointInsideModalImage(event.clientX, event.clientY)) {
    event.preventDefault();
    closeImageModal();
  }
});

modalCanvasEl.addEventListener('wheel', (event) => {
  if (imageModalEl.hidden) {
    return;
  }

  event.preventDefault();
  const zoomFactor = event.deltaY < 0 ? 1.12 : 0.89;
  const nextScale = Math.min(6, Math.max(0.25, modalView.scale * zoomFactor));

  if (Math.abs(nextScale - modalView.scale) < 0.001) {
    return;
  }

  modalView.scale = nextScale;
  if (modalView.scale <= 1.01) {
    modalView.x = 0;
    modalView.y = 0;
  }
  applyModalImageTransform();
}, { passive: false });

modalCanvasEl.addEventListener('mousedown', (event) => {
  if (event.button !== 1 || imageModalEl.hidden) {
    return;
  }

  event.preventDefault();
  modalView.isPanning = true;
  modalView.lastX = event.clientX;
  modalView.lastY = event.clientY;
  applyModalImageTransform();
});

modalCanvasEl.addEventListener('auxclick', (event) => {
  if (event.button === 1) {
    event.preventDefault();
  }
});

document.addEventListener('mousemove', (event) => {
  if (!modalView.isPanning) {
    return;
  }

  modalView.x += event.clientX - modalView.lastX;
  modalView.y += event.clientY - modalView.lastY;
  modalView.lastX = event.clientX;
  modalView.lastY = event.clientY;
  applyModalImageTransform();
});

document.addEventListener('mouseup', (event) => {
  if (event.button === 1 && modalView.isPanning) {
    modalView.isPanning = false;
    applyModalImageTransform();
  }
});

modalImageEl.addEventListener('load', () => {
  fitModalImageToCanvas();
  resetModalImageView();
});

window.addEventListener('resize', () => {
  fitModalImageToCanvas();
  resetModalImageView();
});

imageModalEl.addEventListener('click', (event) => {
  if (event.target === imageModalEl) {
    closeImageModal();
  }
});

cancelDeleteEl.addEventListener('click', () => closeDeleteConfirm(false));
confirmDeleteEl.addEventListener('click', () => closeDeleteConfirm(true));
deleteConfirmEl.addEventListener('click', (event) => {
  if (event.target === deleteConfirmEl) {
    closeDeleteConfirm(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !deleteConfirmEl.hidden) {
    closeDeleteConfirm(false);
    return;
  }

  if (event.key === 'Escape' && !imageModalEl.hidden) {
    closeImageModal();
    return;
  }

  if (event.key === 'ArrowLeft' && !imageModalEl.hidden) {
    navigateModal(-1);
    return;
  }

  if (event.key === 'ArrowRight' && !imageModalEl.hidden) {
    navigateModal(1);
  }
});

async function submitGeneration({
  prompt,
  aspectRatio,
  resolution,
  count,
  officialFallback,
  references,
  button = buttonEl,
  loadingText = '生成中...',
  resetText = '生成图片',
}) {
  if (!prompt) {
    setMessage('先写一句提示词吧。', true);
    promptEl.focus();
    return;
  }

  button.disabled = true;
  const buttonLabel = button.querySelector('span') || button;
  buttonLabel.textContent = '提交中...';
  const pendingItems = createPendingGenerationItems({
    prompt,
    aspectRatio,
    resolution,
    count,
    retryPayload: {
      prompt,
      aspectRatio,
      resolution,
      count,
      officialFallback,
      references,
      resetText,
    },
  });
  setMessage('');

  let referencePayload = [];
  try {
    referencePayload = references.length
      ? await Promise.all(references.map(async (item, index) => {
        const dataUrl = item.file
          ? await fileToDataUrl(item.file)
          : await urlToDataUrl(item.imageUrl || item.url);
        return {
          name: item.name || `参考图 ${index + 1}`,
          dataUrl,
        };
      }))
      : [];
  } catch (error) {
    failPendingGenerationItems(pendingItems, error.message || '参考图读取失败');
    setMessage(error.message || '参考图读取失败。', true);
    button.disabled = false;
    buttonLabel.textContent = resetText;
    return;
  }

  button.disabled = false;
  buttonLabel.textContent = resetText;

  const imageUrls = referencePayload.map((item) => item.dataUrl);
  updatePendingGenerationJob(pendingItems[0].jobId, {
    status: 'submitted',
    statusText: '已提交，等待结果',
  });

  (async () => {
    try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        aspectRatio,
        resolution,
        count,
        officialFallback,
        imageUrls,
        referenceImages: referencePayload,
        kind: 'create',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '生成失败');
    }

    if (data.pending && data.taskIds?.length) {
      data.taskIds.forEach((taskId, index) => {
        if (pendingItems[index]) {
          updatePendingGenerationItem(pendingItems[index].localId, {
            taskId,
            provider: data.provider || '',
            status: 'polling',
            statusText: `等待第 ${index + 1} 张结果`,
          });
        }
      });
      await pollTasks(data.taskIds, data, pendingItems);
    } else if (data.pending && data.taskId) {
      updatePendingGenerationItem(pendingItems[0].localId, {
        taskId: data.taskId,
        provider: data.provider || '',
        status: 'polling',
        statusText: '等待生成结果',
      });
      await pollTask(data.taskId, data, pendingItems[0]);
    } else {
      removePendingGenerationItems(pendingItems);
      renderImageResult(data);
      setMessage(`生成好了。比例：${data.size}，分辨率：${data.resolution || resolutionEl.value}`);
      await loadHistory();
    }
  } catch (error) {
    if (isPossiblyCompletedUpstreamGenerationError(error)) {
      const message = '上游响应超时，但图片可能仍在生成或已经生成。请稍后刷新生成记录/图库；如果没有出现，再点重试。';
      failPendingGenerationItems(pendingItems, message);
      setMessage(message, true);
      return;
    }

    failPendingGenerationItems(pendingItems, error.message);
    setMessage(error.message, true);
  }
  })();
}

buttonEl.addEventListener('click', () => {
  submitGeneration({
    prompt: promptEl.value.trim(),
    aspectRatio: aspectRatioEl.value,
    resolution: resolutionEl.value,
    count: selectedCount,
    officialFallback: isOfficialFallbackEnabled(),
    references: [...referenceImages],
  });
});

authToggleEl.addEventListener('click', () => {
  setAuthMode(authMode === 'login' ? 'register' : 'login');
});

authFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = authUsernameEl.value.trim();
  const password = authPasswordEl.value;

  if (!username || !password) {
    authMessageEl.textContent = '请输入用户名和密码。';
    authMessageEl.className = 'api-key-status error';
    return;
  }

  authSubmitEl.disabled = true;
  authSubmitEl.textContent = authMode === 'register' ? '注册中...' : '登录中...';

  try {
    const response = await fetch(`/api/auth/${authMode === 'register' ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await readJsonResponse(response);

    if (!response.ok) {
      throw new Error(data.error || '账号操作失败。');
    }

    authPasswordEl.value = '';
    showAppForUser(data.user);
    await checkStatus();
    await loadHistory();
    restorePendingGenerationItems();
    resumePendingGenerationPolling();
    updateHistoryNav();
    if (!data.user?.hasApiKey && !isMobileViewport()) {
      showSettingsPage();
    }
  } catch (error) {
    authMessageEl.textContent = error.message;
    authMessageEl.className = 'api-key-status error';
  } finally {
    authSubmitEl.disabled = false;
    authSubmitEl.textContent = authMode === 'register' ? '注册并登录' : '登录';
  }
});

logoutButtonEl.addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  historyItems = [];
  chatMessages = [];
  renderHistory();
  showAuthGate();
});

window.addEventListener('hashchange', applyRouteFromHash);

(async function initApp() {
  preventPageZoom();
  initializeMobileViewportTracking();
  setAuthMode('login');
  if (!(await requireSignedIn())) {
    return;
  }

  restorePhotoshopBridgeChannel();
  normalizeInitialMobileRoute();
  await checkStatus();
  applyRouteFromHash();
  await loadHistory();
  restorePendingGenerationItems();
  resumePendingGenerationPolling();
  updateHistoryNav();
})();
