

    /* parioetlaforet@Gmail.com  M.morimoto   11_18_2026  */
// ======================================================================
// 【第1章：基盤環境・幾何座標・システム設定 (Environment & Layout)】
// 2D作業キャンバス寸法、グリッド吸着ピッチ、3Dビューア基本定数
// ======================================================================
const CHEM_ENV = {
  GRID_PITCH: 32,
  WORKSPACE_COLS: 50,
  WORKSPACE_ROWS: 50,
  DRAG_THRESHOLD: 10,
  MAX_ATOMS: 120,
  HIT_RADIUS_ATOM: 28,
  HIT_DIST_BOND: 16,
  BASE_DISTANCE_3D: 600,
  NEAR_PLANE_3D: 10,
 ORBIT_RADIUS_3D: 5.5,
  ROTATE_SENSITIVITY: 0.007,
  AUTO_ROTATE_SPEED: 0.008,
  DEFAULT_ROT_X: 0.35,
  DEFAULT_ROT_Y: 0.55
};



// ======================================================================
// 【第2章：元素マスタ・レジストリ ＆ 実在分子辞書 (Elements & Molecule DB)】
// 元素データシート(原子価[手の数]・CPK配色・原子半径)
// および実在分子データベース(パターンB: 実在分子のみ / 3D立体座標付き)
// ======================================================================
const ELEMENTS = {
  H: { symbol: "H", name: "水素", valence: 1, color: "#f8fafc", strokeColor: "#94a3b8", textColor: "#0f172a", radius2D: 16, radius3D: 0.28 },
  C: { symbol: "C", name: "炭素", valence: 4, color: "#334155", strokeColor: "#94a3b8", textColor: "#f8fafc", radius2D: 22, radius3D: 0.48 },
  N: { symbol: "N", name: "窒素", valence: 3, color: "#2563eb", strokeColor: "#93c5fd", textColor: "#f8fafc", radius2D: 21, radius3D: 0.44 },
  O: { symbol: "O", name: "酸素", valence: 2, color: "#dc2626", strokeColor: "#fca5a5", textColor: "#f8fafc", radius2D: 20, radius3D: 0.42 },
  F: { symbol: "F", name: "フッ素", valence: 1, color: "#22c55e", strokeColor: "#86efac", textColor: "#0f172a", radius2D: 18, radius3D: 0.36 },
  P: { symbol: "P", name: "リン", valence: 3, color: "#f97316", strokeColor: "#fdba74", textColor: "#f8fafc", radius2D: 24, radius3D: 0.54 },
  S: { symbol: "S", name: "硫黄", valence: 2, color: "#eab308", strokeColor: "#fef08a", textColor: "#0f172a", radius2D: 23, radius3D: 0.52 },
 Cl: { symbol: "Cl", name: "塩素", valence: 1, color: "#10b981", strokeColor: "#6ee7b7", textColor: "#0f172a", radius2D: 21, radius3D: 0.46 },
  Br: { symbol: "Br", name: "臭素", valence: 1, color: "#991b1b", strokeColor: "#fca5a5", textColor: "#f8fafc", radius2D: 23, radius3D: 0.52 },
  I: { symbol: "I", name: "ヨウ素", valence: 1, color: "#6b21a8", strokeColor: "#d8b4fe", textColor: "#f8fafc", radius2D: 25, radius3D: 0.56 },
  Si: { symbol: "Si", name: "ケイ素", valence: 4, color: "#d97706", strokeColor: "#fcd34d", textColor: "#f8fafc", radius2D: 24, radius3D: 0.54 },
  B: { symbol: "B", name: "ホウ素", valence: 3, color: "#f472b6", strokeColor: "#fbcfe8", textColor: "#0f172a", radius2D: 20, radius3D: 0.43 }
};


const MOLECULE_DB = [
  {
    id: "H2O",
    formula: "H2O",
    name: "水 (Water)",
    geometry: "折れ線形 (結合角 104.5度)",
    signature: "H(O-1)|H(O-1)|O(H-1,H-1)",
    desc: "生命維持の基盤となる万能溶媒だ。酸素の非共有電子対が結合を104.5度に折り曲げたおかげで強い極性が生まれ、氷が水に浮くという稀有な物理特性を獲得している。",
    model3D: {
      atoms: [
        { type: "O", x: 0.00, y: -0.20, z: 0.00 },
        { type: "H", x: 0.76, y: 0.39, z: 0.00 },
        { type: "H", x: -0.76, y: 0.39, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 }
      ]
    }
  },
  {
    id: "CH4",
    formula: "CH4",
    name: "メタン (Methane)",
    geometry: "正四面体構造 (結合角 109.5度)",
    signature: "C(H-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "都市ガスの主成分であり、最もシンプルな炭化水素だ。完全な正四面体の対称性ゆえ極性はゼロだが、実は二酸化炭素の約25倍もの温室効果を持つ一面がある。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.00, z: 0.00 },
        { type: "H", x: 0.63, y: 0.63, z: 0.63 },
        { type: "H", x: -0.63, y: -0.63, z: 0.63 },
        { type: "H", x: -0.63, y: 0.63, z: -0.63 },
        { type: "H", x: 0.63, y: -0.63, z: -0.63 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }
      ]
    }
  },
  {
    id: "NH3",
    formula: "NH3",
    name: "アンモニア (Ammonia)",
    geometry: "三角錐形 (結合角 107.0度)",
    signature: "H(N-1)|H(N-1)|H(N-1)|N(H-1,H-1,H-1)",
    desc: "化学肥料や医薬品の出発点となる極めて重要な窒素源だ。20世紀初頭にこの分子を空気と水素から大量合成する技術が確立され、人類の食糧生産は劇的に拡大した。",
    model3D: {
      atoms: [
        { type: "N", x: 0.00, y: -0.25, z: 0.00 },
        { type: "H", x: 0.94, y: 0.15, z: 0.00 },
        { type: "H", x: -0.47, y: 0.15, z: 0.81 },
        { type: "H", x: -0.47, y: 0.15, z: -0.81 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }
      ]
    }
  },
  {
    id: "CO2",
    formula: "CO2",
    name: "二酸化炭素 (Carbon Dioxide)",
    geometry: "直線形 (結合角 180.0度)",
    signature: "C(O-2,O-2)|O(C-2)|O(C-2)",
    desc: "植物の光合成に不可欠な炭素の循環媒体だ。個々のC=O結合は強い極性を持つが、180度の直線配置が双極子を完全に打ち消すため、分子全体では無極性となる。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.00, z: 0.00 },
        { type: "O", x: -1.16, y: 0.00, z: 0.00 },
        { type: "O", x: 1.16, y: 0.00, z: 0.00 }
      ],
     bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 }
      ]
    }
  },
  {
    id: "B3N3H6",
    formula: "B3N3H6",
    name: "ボラジン (Borazine)",
    geometry: "正六角形平面構造 (無機ベンゼン)",
    signature: "B(H-1,N-1,N-1)|B(H-1,N-1,N-1)|B(H-1,N-1,N-1)|H(B-1)|H(B-1)|H(B-1)|H(N-1)|H(N-1)|H(N-1)|N(B-1,B-1,H-1)|N(B-1,B-1,H-1)|N(B-1,B-1,H-1)",
    desc: "ホウ素(B)と窒素(N)が交互に六員環を作る「無機ベンゼン」だ。ベンゼンと全く同じ等電子構造と平面対称性を持ちながら、B-N間の極性ゆえに反応性は大きく異なる。",
    model3D: {
      atoms: [
        { type: "B", x: 1.43, y: -0.00, z: 0.00 },
        { type: "N", x: 0.72, y: 1.24, z: 0.00 },
        { type: "B", x: -0.71, y: 1.24, z: 0.00 },
        { type: "N", x: -1.43, y: 0.00, z: 0.00 },
        { type: "B", x: -0.72, y: -1.24, z: 0.00 },
        { type: "N", x: 0.72, y: -1.24, z: 0.00 },
        { type: "H", x: 2.52, y: -0.00, z: 0.00 },
        { type: "H", x: 1.26, y: 2.18, z: 0.00 },
        { type: "H", x: -1.26, y: 2.18, z: 0.00 },
        { type: "H", x: -2.52, y: 0.00, z: 0.00 },
        { type: "H", x: -1.26, y: -2.18, z: 0.00 },
        { type: "H", x: 1.26, y: -2.18, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 2, to: 8, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 3, to: 9, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 4, to: 10, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 5, to: 11, order: 1 }
      ]
    }
  },
  {
    id: "SiC4H12",
    formula: "C4H12Si",
    name: "テトラメチルシラン (TMS)",
    geometry: "正四面体構造 (ケイ素中心対称)",
    signature: "C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|Si(C-1,C-1,C-1,C-1)",
    desc: "核磁気共鳴(NMR)スペクトルで化学シフト0.00ppmの基準物質として使われる有機ケイ素化合物だ。ケイ素の低い電気陰性度により12個の水素が強く遮蔽されている。",
    model3D: {
      atoms: [
        { type: "Si", x: -0.00, y: 0.00, z: 0.00 },
        { type: "C", x: 1.08, y: 1.08, z: 1.08 },
        { type: "H", x: 1.71, y: 1.71, z: 0.45 },
        { type: "H", x: 1.71, y: 0.45, z: 1.71 },
        { type: "H", x: 0.45, y: 1.71, z: 1.71 },
        { type: "C", x: -1.08, y: -1.08, z: 1.08 },
        { type: "H", x: -1.71, y: -1.71, z: 0.45 },
        { type: "H", x: -0.45, y: -1.71, z: 1.71 },
        { type: "H", x: -1.71, y: -0.45, z: 1.71 },
        { type: "C", x: -1.08, y: 1.08, z: -1.08 },
        { type: "H", x: -1.71, y: 0.45, z: -1.71 },
        { type: "H", x: -0.45, y: 1.71, z: -1.71 },
        { type: "H", x: -1.71, y: 1.71, z: -0.45 },
        { type: "C", x: 1.08, y: -1.08, z: -1.08 },
        { type: "H", x: 0.45, y: -1.71, z: -1.71 },
        { type: "H", x: 1.71, y: -0.45, z: -1.71 },
        { type: "H", x: 1.71, y: -1.71, z: -0.45 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 5, to: 7, order: 1 },
        { from: 5, to: 8, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 9, to: 11, order: 1 },
        { from: 9, to: 12, order: 1 },
        { from: 0, to: 13, order: 1 },
        { from: 13, to: 14, order: 1 },
        { from: 13, to: 15, order: 1 },
        { from: 13, to: 16, order: 1 }
      ]
    }
  },
  {
    id: "C2HBrClF3",
    formula: "C2HBrClF3",
    name: "ハロタン (Halothane)",
    geometry: "エタン型四面体構造 (不斉炭素含有)",
    signature: "Br(C-1)|C(Br-1,C-1,Cl-1,H-1)|C(C-1,F-1,F-1,F-1)|Cl(C-1)|F(C-1)|F(C-1)|F(C-1)|H(C-1)",
    desc: "炭素・水素・フッ素・塩素・臭素の5元素が1分子に同居する吸入麻酔薬だ。強いC-F結合が分子全体の化学的安定性を高め、医療現場に革命をもたらした。",
    model3D: {
      atoms: [
        { type: "C", x: -0.77, y: 0.08, z: 0.00 },
        { type: "C", x: 0.75, y: 0.08, z: 0.00 },
        { type: "F", x: -1.26, y: 1.32, z: 0.00 },
        { type: "F", x: -1.26, y: -0.54, z: 1.07 },
        { type: "F", x: -1.26, y: -0.54, z: -1.07 },
        { type: "H", x: 1.14, y: 1.10, z: 0.00 },
        { type: "Cl", x: 1.34, y: -0.74, z: 1.42 },
        { type: "Br", x: 1.34, y: -0.74, z: -1.42 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "PC3H9",
    formula: "C3H9P",
    name: "トリメチルホスフィン (Trimethylphosphine)",
    geometry: "三角錐形 (リン中心 + メチル基x3)",
    signature: "C(H-1,H-1,H-1,P-1)|C(H-1,H-1,H-1,P-1)|C(H-1,H-1,H-1,P-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|P(C-1,C-1,C-1)",
    desc: "3価のリン原子に3つのメチル基が結合した有機リン配位子だ。リンの非共有電子対が金属触媒へ強く配位するため、現代のクロスカップリング反応を支える重要試薬となっている。",
    model3D: {
      atoms: [
        { type: "P", x: 0.00, y: 0.73, z: -0.00 },
        { type: "C", x: 1.65, y: -0.07, z: -0.00 },
        { type: "H", x: 1.36, y: 0.38, z: -0.80 },
        { type: "H", x: 2.50, y: -0.92, z: -0.00 },
        { type: "H", x: 1.36, y: 0.38, z: 0.80 },
        { type: "C", x: -0.82, y: -0.07, z: 1.43 },
        { type: "H", x: 0.01, y: 0.38, z: 1.58 },
        { type: "H", x: -1.25, y: -0.92, z: 2.17 },
        { type: "H", x: -1.37, y: 0.38, z: 0.78 },
        { type: "C", x: -0.83, y: -0.07, z: -1.43 },
        { type: "H", x: -1.37, y: 0.38, z: -0.78 },
        { type: "H", x: -1.25, y: -0.92, z: -2.17 },
        { type: "H", x: 0.01, y: 0.38, z: -1.58 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 5, to: 7, order: 1 },
        { from: 5, to: 8, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 9, to: 11, order: 1 },
        { from: 9, to: 12, order: 1 }
      ]
    }
  },
  {
    id: "C2H6S",
    formula: "C2H6S",
    name: "ジメチルスルフィド (Dimethyl Sulfide)",
    geometry: "折れ線形 (C-S-C結合角 99度)",
    signature: "C(H-1,H-1,H-1,S-1)|C(H-1,H-1,H-1,S-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|S(C-1,C-1)",
    desc: "海洋の植物プランクトンが生成し、「磯の香り」の正体として知られる含硫有機化合物だ。大気中へ放出されると雲の凝結核を作り、地球の気候調節にも関わっている。",
    model3D: {
      atoms: [
        { type: "S", x: 0.00, y: 1.04, z: 0.00 },
        { type: "C", x: -1.42, y: 0.04, z: 0.00 },
        { type: "C", x: 1.42, y: 0.04, z: 0.00 },
        { type: "H", x: -2.32, y: 0.64, z: 0.00 },
        { type: "H", x: -1.42, y: -0.59, z: 0.89 },
        { type: "H", x: -1.42, y: -0.59, z: -0.89 },
        { type: "H", x: 2.32, y: 0.64, z: 0.00 },
        { type: "H", x: 1.42, y: -0.59, z: 0.89 },
        { type: "H", x: 1.42, y: -0.59, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 2, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "CH4N2O",
    formula: "CH4N2O",
    name: "尿素 (Urea)",
    geometry: "平面三角形骨格 (アミド共鳴安定化)",
    signature: "C(N-1,N-1,O-2)|H(N-1)|H(N-1)|H(N-1)|H(N-1)|N(C-1,H-1,H-1)|N(C-1,H-1,H-1)|O(C-2)",
    desc: "1828年にヴェーラーが無機物から初めて人工合成し、「生命力説」を覆した歴史的分子だ。生体内では有害なアンモニアを無毒化して排出する代謝の要を担う。",
    model3D: {
      atoms: [
        { type: "C", x: -0.00, y: 0.50, z: 0.00 },
        { type: "O", x: -0.00, y: 1.75, z: 0.00 },
        { type: "N", x: -1.18, y: -0.20, z: 0.00 },
        { type: "N", x: 1.18, y: -0.20, z: 0.00 },
        { type: "H", x: -2.05, y: 0.30, z: 0.00 },
        { type: "H", x: -1.18, y: -1.21, z: 0.00 },
        { type: "H", x: 2.05, y: 0.30, z: 0.00 },
        { type: "H", x: 1.18, y: -1.21, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 },
        { from: 2, to: 5, order: 1 },
        { from: 3, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "C2H5NO2",
    formula: "C2H5NO2",
    name: "グリシン (Glycine)",
    geometry: "四面体α炭素 + 平面カルボキシ基",
    signature: "C(C-1,H-1,H-1,N-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "タンパク質を構成する20種類のアミノ酸の中で最も小さく、唯一不斉炭素を持たない分子だ。コラーゲンの約3分の1を占め、中枢神経では抑制性神経伝達物質としても働く。",
    model3D: {
      atoms: [
        { type: "N", x: -1.61, y: -0.18, z: 0.26 },
        { type: "C", x: -0.31, y: 0.49, z: 0.01 },
        { type: "C", x: 0.89, y: -0.41, z: 0.01 },
        { type: "O", x: 0.89, y: -1.63, z: 0.01 },
        { type: "O", x: 2.06, y: 0.29, z: 0.01 },
        { type: "H", x: -2.34, y: 0.49, z: 0.01 },
        { type: "H", x: -1.71, y: -0.98, z: -0.37 },
        { type: "H", x: -0.31, y: 1.15, z: 0.88 },
        { type: "H", x: -0.31, y: 1.15, z: -0.86 },
        { type: "H", x: 2.79, y: -0.35, z: 0.01 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 }
      ]
    }
  },
  {
    id: "C3H7NO2S",
    formula: "C3H7NO2S",
    name: "システイン (Cysteine)",
    geometry: "キラル四面体骨格 (チオール側鎖 -SH)",
    signature: "C(C-1,C-1,H-1,N-1)|C(C-1,H-1,H-1,S-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|H(S-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)|S(C-1,H-1)",
    desc: "側鎖に反応性の高いチオール基(-SH)を持つ含硫アミノ酸だ。システイン同士が酸化されて作るジスルフィド結合(S-S)は、タンパク質の立体構造を強固に固定する。",
    model3D: {
      atoms: [
        { type: "N", x: -1.52, y: -0.95, z: 0.12 },
        { type: "C", x: -0.22, y: -0.28, z: -0.33 },
        { type: "C", x: 0.98, y: -1.18, z: -0.48 },
        { type: "O", x: 0.98, y: -2.38, z: -0.68 },
        { type: "O", x: 2.15, y: -0.48, z: -0.28 },
        { type: "C", x: -0.22, y: 0.88, z: 0.65 },
        { type: "S", x: -0.22, y: 2.48, z: -0.21 },
        { type: "H", x: -2.25, y: -0.28, z: -0.11 },
        { type: "H", x: -1.62, y: -1.78, z: -0.45 },
        { type: "H", x: -0.22, y: 0.12, z: -1.35 },
        { type: "H", x: 2.88, y: -1.12, z: -0.38 },
        { type: "H", x: -1.09, y: 0.88, z: 1.32 },
        { type: "H", x: 0.65, y: 0.88, z: 1.32 },
        { type: "H", x: -0.22, y: 3.25, z: 0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 0, to: 7, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 4, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 },
        { from: 5, to: 12, order: 1 },
        { from: 6, to: 13, order: 1 }
      ]
    }
  },
  {
    id: "C8H8_CUBANE",
    formula: "C8H8",
    name: "キュバン (Cubane)",
    geometry: "正六面体 / 立方体構造 (結合角 90度)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "8個の炭素原子が完璧な立方体の頂点を形作るプラトン炭化水素だ。本来の正四面体角109.5度から90度へ極限まで曲げられた結合ひずみにより、極めて高いエネルギーを蓄えている。",
    model3D: {
      atoms: [
        { type: "C", x: -0.78, y: -0.78, z: -0.78 },
        { type: "C", x: 0.78, y: -0.78, z: -0.78 },
        { type: "C", x: 0.78, y: 0.78, z: -0.78 },
        { type: "C", x: -0.78, y: 0.78, z: -0.78 },
        { type: "C", x: -0.78, y: -0.78, z: 0.78 },
        { type: "C", x: 0.78, y: -0.78, z: 0.78 },
        { type: "C", x: 0.78, y: 0.78, z: 0.78 },
        { type: "C", x: -0.78, y: 0.78, z: 0.78 },
        { type: "H", x: -1.42, y: -1.42, z: -1.42 },
        { type: "H", x: 1.42, y: -1.42, z: -1.42 },
        { type: "H", x: 1.42, y: 1.42, z: -1.42 },
        { type: "H", x: -1.42, y: 1.42, z: -1.42 },
        { type: "H", x: -1.42, y: -1.42, z: 1.42 },
        { type: "H", x: 1.42, y: -1.42, z: 1.42 },
        { type: "H", x: 1.42, y: 1.42, z: 1.42 },
        { type: "H", x: -1.42, y: 1.42, z: 1.42 }
      ],
      bonds: [
        { from: 0, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 2, to: 10, order: 1 },
        { from: 3, to: 11, order: 1 },
        { from: 4, to: 12, order: 1 },
        { from: 5, to: 13, order: 1 },
        { from: 6, to: 14, order: 1 },
        { from: 7, to: 15, order: 1 },
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 0, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 7, to: 4, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "C4H4N2O2",
    formula: "C4H4N2O2",
    name: "ウラシル (Uracil)",
    geometry: "ピリミジン平面六員環 (RNA塩基)",
    signature: "C(C-1,C-2,H-1)|C(C-1,N-1,O-2)|C(C-2,H-1,N-1)|C(N-1,N-1,O-2)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|N(C-1,C-1,H-1)|N(C-1,C-1,H-1)|O(C-2)|O(C-2)",
    desc: "RNA(リボ核酸)を構成する4種の核酸塩基の一つで、アデニンと2本の水素結合で相補的に対合する。DNAでは化学的安定性を高めるためメチル化されたチミンに置き換わっている。",
    model3D: {
      atoms: [
        { type: "N", x: -1.19, y: -0.68, z: 0.00 },
        { type: "C", x: -0.01, y: -1.36, z: 0.00 },
        { type: "N", x: 1.17, y: -0.68, z: 0.00 },
        { type: "C", x: 1.17, y: 0.68, z: 0.00 },
        { type: "C", x: -0.01, y: 1.36, z: 0.00 },
        { type: "C", x: -1.19, y: 0.68, z: 0.00 },
        { type: "O", x: -0.01, y: -2.58, z: 0.00 },
        { type: "O", x: 2.23, y: 1.29, z: 0.00 },
        { type: "H", x: -2.06, y: -1.18, z: 0.00 },
        { type: "H", x: 2.04, y: -1.18, z: 0.00 },
        { type: "H", x: -0.01, y: 2.44, z: 0.00 },
        { type: "H", x: -2.13, y: 1.22, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 2 },
        { from: 3, to: 7, order: 2 },
        { from: 0, to: 8, order: 1 },
        { from: 2, to: 9, order: 1 },
        { from: 4, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 }
      ]
    }
  },
  {
    id: "C8H10N4O2",
    formula: "C8H10N4O2",
    name: "カフェイン (Caffeine)",
    geometry: "プリン二環性平面骨格 + メチル基x3",
    signature: "C(C-1,C-2,N-1)|C(C-1,N-1,O-2)|C(C-2,N-1,N-1)|C(H-1,H-1,H-1,N-1)|C(H-1,H-1,H-1,N-1)|C(H-1,H-1,H-1,N-1)|C(H-1,N-1,N-2)|C(N-1,N-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|N(C-1,C-1,C-1)|N(C-1,C-1,C-1)|N(C-1,C-1,C-1)|N(C-1,C-2)|O(C-2)|O(C-2)",
    desc: "コーヒーや茶葉に含まれる代表的なプリンアルカロイドだ。睡眠を促すアデノシンと酷似した立体骨格を持つため、脳内のアデノシン受容体に先回りして結合し覚醒作用をもたらす。",
    model3D: {
      atoms: [
        { type: "N", x: -1.29, y: 1.24, z: 0.00 },
        { type: "C", x: -0.09, y: 1.94, z: 0.00 },
        { type: "N", x: 1.11, y: 1.24, z: 0.00 },
        { type: "C", x: 1.11, y: -0.16, z: 0.00 },
        { type: "C", x: -0.09, y: -0.86, z: 0.00 },
        { type: "C", x: -1.29, y: -0.16, z: 0.00 },
        { type: "N", x: 0.33, y: -2.18, z: 0.00 },
        { type: "C", x: 1.66, y: -2.18, z: 0.00 },
        { type: "N", x: 2.13, y: -0.94, z: 0.00 },
        { type: "O", x: -0.09, y: 3.16, z: 0.00 },
        { type: "O", x: -2.35, y: -0.78, z: 0.00 },
        { type: "C", x: -2.54, y: 1.96, z: 0.00 },
        { type: "C", x: 2.36, y: 1.96, z: 0.00 },
        { type: "C", x: -0.54, y: -3.34, z: 0.00 },
        { type: "H", x: 2.29, y: -3.06, z: 0.00 },
        { type: "H", x: -3.41, y: 1.30, z: 0.00 },
        { type: "H", x: -2.54, y: 2.59, z: 0.89 },
        { type: "H", x: -2.54, y: 2.59, z: -0.89 },
        { type: "H", x: 3.23, y: 1.30, z: 0.00 },
        { type: "H", x: 2.36, y: 2.59, z: 0.89 },
        { type: "H", x: 2.36, y: 2.59, z: -0.89 },
        { type: "H", x: -1.57, y: -3.01, z: 0.00 },
        { type: "H", x: -0.34, y: -3.94, z: 0.89 },
        { type: "H", x: -0.34, y: -3.94, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 7, to: 8, order: 2 },
        { from: 8, to: 3, order: 1 },
        { from: 1, to: 9, order: 2 },
        { from: 5, to: 10, order: 2 },
        { from: 0, to: 11, order: 1 },
        { from: 2, to: 12, order: 1 },
        { from: 6, to: 13, order: 1 },
        { from: 7, to: 14, order: 1 },
        { from: 11, to: 15, order: 1 },
        { from: 11, to: 16, order: 1 },
        { from: 11, to: 17, order: 1 },
        { from: 12, to: 18, order: 1 },
        { from: 12, to: 19, order: 1 },
        { from: 12, to: 20, order: 1 },
        { from: 13, to: 21, order: 1 },
        { from: 13, to: 22, order: 1 },
        { from: 13, to: 23, order: 1 }
      ]
    }
  },
  {
    id: "CHI3",
    formula: "CHI3",
    name: "ヨードホルム (Iodoform)",
    geometry: "四面体構造 (C-I結合長 214pm)",
    signature: "C(H-1,I-1,I-1,I-1)|H(C-1)|I(C-1)|I(C-1)|I(C-1)",
    desc: "特異な薬品臭を持つ黄色結晶の有機ヨウ素化合物だ。エタノールやアセトンなどの特定構造を見分ける「ヨードホルム反応」の生成物として化学分析でも有名である。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.21, z: 0.00 },
        { type: "H", x: 0.00, y: 1.30, z: 0.00 },
        { type: "I", x: 2.02, y: -0.50, z: 0.00 },
        { type: "I", x: -1.01, y: -0.50, z: 1.75 },
        { type: "I", x: -1.01, y: -0.50, z: -1.75 }
      ],
    bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }
      ]
    }
  },
  {
    id: "C7H6O",
    formula: "C7H6O",
    name: "ベンズアルデヒド (Benzaldehyde)",
    geometry: "芳香族平面構造 (フェニル基 + アルデヒド基)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,H-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|O(C-2)",
    desc: "アーモンドや杏仁豆腐特有の甘い香りの主成分だ。ベンゼン環にアルデヒド基(-CHO)が直結した最もシンプルな芳香族アルデヒドであり、香料や医薬品の出発原料となる。",
    model3D: {
      atoms: [
        { type: "C", x: 0.87, y: -0.01, z: 0.00 },
        { type: "C", x: 0.17, y: 1.21, z: 0.00 },
        { type: "C", x: -1.23, y: 1.21, z: 0.00 },
        { type: "C", x: -1.93, y: -0.01, z: 0.00 },
        { type: "C", x: -1.23, y: -1.22, z: 0.00 },
        { type: "C", x: 0.17, y: -1.22, z: 0.00 },
        { type: "H", x: 0.71, y: 2.14, z: 0.00 },
        { type: "H", x: -1.77, y: 2.14, z: 0.00 },
        { type: "H", x: -3.01, y: -0.01, z: 0.00 },
        { type: "H", x: -1.77, y: -2.15, z: 0.00 },
        { type: "H", x: 0.71, y: -2.15, z: 0.00 },
        { type: "C", x: 2.35, y: -0.01, z: 0.00 },
        { type: "O", x: 3.02, y: 1.03, z: 0.00 },
        { type: "H", x: 2.89, y: -0.97, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 0, to: 11, order: 1 },
        { from: 11, to: 12, order: 2 },
        { from: 11, to: 13, order: 1 }
      ]
    }
  },
  {
    id: "C7H6O2",
    formula: "C7H6O2",
    name: "安息香酸 (Benzoic Acid)",
    geometry: "芳香族平面構造 (フェニル基 + カルボキシ基)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)|O(C-2)",
    desc: "ベリー類などの植物にも天然に含まれる最も基本的な芳香族カルボン酸だ。静菌作用を持つため食品保存料(安息香酸ナトリウム)としても広く利用されている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.61, y: 0.06, z: 0.00 },
        { type: "C", x: -0.09, y: 1.27, z: 0.00 },
        { type: "C", x: -1.49, y: 1.27, z: 0.00 },
        { type: "C", x: -2.19, y: 0.06, z: 0.00 },
        { type: "C", x: -1.49, y: -1.15, z: 0.00 },
        { type: "C", x: -0.09, y: -1.15, z: 0.00 },
        { type: "H", x: 0.45, y: 2.21, z: 0.00 },
        { type: "H", x: -2.03, y: 2.21, z: 0.00 },
        { type: "H", x: -3.27, y: 0.06, z: 0.00 },
        { type: "H", x: -2.03, y: -2.09, z: 0.00 },
        { type: "H", x: 0.45, y: -2.09, z: 0.00 },
        { type: "C", x: 2.09, y: 0.06, z: 0.00 },
        { type: "O", x: 2.73, y: 1.12, z: 0.00 },
        { type: "O", x: 2.73, y: -1.00, z: 0.00 },
        { type: "H", x: 3.69, y: -0.86, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 0, to: 11, order: 1 },
        { from: 11, to: 12, order: 2 },
        { from: 11, to: 13, order: 1 },
        { from: 13, to: 14, order: 1 }
      ]
    }
  },
  {
    id: "C6H6S",
    formula: "C6H6S",
    name: "チオフェノール (Thiophenol)",
    geometry: "芳香族平面 + 折れ線形チオール基(-SH)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,S-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(S-1)|S(C-1,H-1)",
    desc: "フェノールの酸素原子を硫黄(S)に置き換えた芳香族チオールだ。O-H結合より弱いS-H結合ゆえにフェノールよりも強い酸性を示し、金属表面への自己組織化単分子膜にも使われる。",
    model3D: {
      atoms: [
        { type: "C", x: 1.07, y: -0.10, z: 0.00 },
        { type: "C", x: 0.37, y: 1.12, z: 0.00 },
        { type: "C", x: -1.03, y: 1.12, z: 0.00 },
        { type: "C", x: -1.73, y: -0.10, z: 0.00 },
        { type: "C", x: -1.03, y: -1.31, z: 0.00 },
        { type: "C", x: 0.37, y: -1.31, z: 0.00 },
        { type: "H", x: 0.91, y: 2.05, z: 0.00 },
        { type: "H", x: -1.57, y: 2.05, z: 0.00 },
        { type: "H", x: -2.81, y: -0.10, z: 0.00 },
        { type: "H", x: -1.57, y: -2.24, z: 0.00 },
        { type: "H", x: 0.91, y: -2.24, z: 0.00 },
        { type: "S", x: 2.83, y: -0.10, z: 0.00 },
        { type: "H", x: 3.32, y: 1.14, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 0, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 }
      ]
    }
  },
  {
    id: "C7H6O3",
    formula: "C7H6O3",
    name: "サリチル酸 (Salicylic Acid)",
    geometry: "オルト二置換ベンゼン環 (分子内水素結合)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "ヤナギの樹皮から見出された鎮痛・角質軟化成分だ。隣り合う-OH基と-COOH基が分子内で水素結合を形成して平面性を保ち、アスピリン合成の直接の原料となる。",
    model3D: {
      atoms: [
        { type: "C", x: 0.50, y: -0.09, z: 0.00 },
        { type: "C", x: -0.20, y: 1.12, z: 0.00 },
        { type: "C", x: -1.60, y: 1.12, z: 0.00 },
        { type: "C", x: -2.30, y: -0.09, z: 0.00 },
        { type: "C", x: -1.60, y: -1.30, z: 0.00 },
        { type: "C", x: -0.20, y: -1.30, z: 0.00 },
        { type: "H", x: -2.14, y: 2.06, z: 0.00 },
        { type: "H", x: -3.38, y: -0.09, z: 0.00 },
        { type: "H", x: -2.14, y: -2.24, z: 0.00 },
        { type: "H", x: 0.34, y: -2.24, z: 0.00 },
        { type: "C", x: 1.98, y: -0.09, z: 0.00 },
        { type: "O", x: 2.62, y: 0.97, z: 0.00 },
        { type: "O", x: 2.62, y: -1.15, z: 0.00 },
        { type: "H", x: 3.58, y: -1.01, z: 0.00 },
        { type: "O", x: 0.48, y: 2.30, z: 0.00 },
        { type: "H", x: 1.42, y: 2.06, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 },
        { from: 5, to: 9, order: 1 },
        { from: 0, to: 10, order: 1 },
        { from: 10, to: 11, order: 2 },
        { from: 10, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 1, to: 14, order: 1 },
        { from: 14, to: 15, order: 1 }
      ]
    }
  },
  {
    id: "C9H8O4",
    formula: "C9H8O4",
    name: "アスピリン (Aspirin)",
    geometry: "オルト置換芳香環 (カルボキシ基 + アセトキシ基)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,O-1,O-2)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)|O(C-2)|O(C-2)",
    desc: "サリチル酸のフェノール性水酸基をアセチル化して胃への刺激を和らげた世界初の合成医薬品だ。シクロオキシゲナーゼ酵素を阻害して痛みや炎症を鎮める。",
    model3D: {
      atoms: [
        { type: "C", x: 0.49, y: -1.36, z: 0.00 },
        { type: "C", x: -0.21, y: -0.15, z: 0.00 },
        { type: "C", x: -1.61, y: -0.15, z: 0.00 },
        { type: "C", x: -2.31, y: -1.36, z: 0.00 },
        { type: "C", x: -1.61, y: -2.57, z: 0.00 },
        { type: "C", x: -0.21, y: -2.57, z: 0.00 },
        { type: "H", x: -2.15, y: 0.79, z: 0.00 },
        { type: "H", x: -3.39, y: -1.36, z: 0.00 },
        { type: "H", x: -2.15, y: -3.51, z: 0.00 },
        { type: "H", x: 0.33, y: -3.51, z: 0.00 },
        { type: "C", x: 1.97, y: -1.36, z: 0.00 },
        { type: "O", x: 2.61, y: -2.42, z: 0.00 },
        { type: "O", x: 2.61, y: -0.30, z: 0.00 },
        { type: "H", x: 3.57, y: -0.44, z: 0.00 },
        { type: "O", x: 0.47, y: 1.03, z: 0.00 },
        { type: "C", x: -0.19, y: 2.22, z: 0.00 },
        { type: "O", x: -1.41, y: 2.29, z: 0.00 },
        { type: "C", x: 0.65, y: 3.46, z: 0.00 },
        { type: "H", x: 1.71, y: 3.19, z: 0.00 },
        { type: "H", x: 0.44, y: 4.06, z: 0.89 },
        { type: "H", x: 0.44, y: 4.06, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 },
        { from: 5, to: 9, order: 1 },
        { from: 0, to: 10, order: 1 },
        { from: 10, to: 11, order: 2 },
        { from: 10, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 1, to: 14, order: 1 },
        { from: 14, to: 15, order: 1 },
        { from: 15, to: 16, order: 2 },
        { from: 15, to: 17, order: 1 },
        { from: 17, to: 18, order: 1 },
        { from: 17, to: 19, order: 1 },
        { from: 17, to: 20, order: 1 }
      ]
    }
  },
  {
    id: "C8H8O3",
    formula: "C8H8O3",
    name: "バニリン (Vanillin)",
    geometry: "三置換ベンゼン環 (-CHO / -OCH3 / -OH)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|C(C-1,H-1,O-2)|C(H-1,H-1,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)|O(C-2)",
    desc: "バニラビーンズの芳醇な甘い香りを決定づける天然芳香族アルデヒドだ。ベンゼン環上にアルデヒド基・メトキシ基・ヒドロキシ基が絶妙な位置関係で配置されている。",
    model3D: {
      atoms: [
        { type: "C", x: 1.32, y: -0.78, z: 0.00 },
        { type: "C", x: 0.62, y: 0.43, z: 0.00 },
        { type: "C", x: -0.78, y: 0.43, z: 0.00 },
        { type: "C", x: -1.48, y: -0.78, z: 0.00 },
        { type: "C", x: -0.78, y: -2.00, z: 0.00 },
        { type: "C", x: 0.62, y: -2.00, z: 0.00 },
        { type: "H", x: 1.16, y: 1.36, z: 0.00 },
        { type: "H", x: -1.32, y: -2.93, z: 0.00 },
        { type: "H", x: 1.16, y: -2.93, z: 0.00 },
        { type: "C", x: 2.80, y: -0.78, z: 0.00 },
        { type: "O", x: 3.47, y: 0.26, z: 0.00 },
        { type: "H", x: 3.34, y: -1.74, z: 0.00 },
        { type: "O", x: -2.84, y: -0.78, z: 0.00 },
        { type: "H", x: -3.30, y: -1.63, z: 0.00 },
        { type: "O", x: -1.46, y: 1.61, z: 0.00 },
        { type: "C", x: -0.76, y: 2.84, z: 0.00 },
        { type: "H", x: -1.50, y: 3.64, z: 0.00 },
        { type: "H", x: -0.13, y: 2.90, z: 0.89 },
        { type: "H", x: -0.13, y: 2.90, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 4, to: 7, order: 1 },
        { from: 5, to: 8, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 9, to: 10, order: 2 },
        { from: 9, to: 11, order: 1 },
        { from: 3, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 2, to: 14, order: 1 },
        { from: 14, to: 15, order: 1 },
        { from: 15, to: 16, order: 1 },
        { from: 15, to: 17, order: 1 },
        { from: 15, to: 18, order: 1 }
      ]
    }
  },
  {
    id: "C8H9NO2",
    formula: "C8H9NO2",
    name: "アセトアミノフェン (Acetaminophen)",
    geometry: "パラ二置換ベンゼン環 (-OH / -NHCOCH3)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,N-1)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,N-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(O-1)|N(C-1,C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "世界で最も広く使われる解熱鎮痛薬の一つ(別名パラセタモール)だ。ベンゼン環の両端にヒドロキシ基とアセトアミド基が直線状に並ぶシンプルな分子構造を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: -0.00, y: 0.28, z: 0.00 },
        { type: "C", x: -0.70, y: 1.50, z: 0.00 },
        { type: "C", x: -2.10, y: 1.50, z: 0.00 },
        { type: "C", x: -2.80, y: 0.28, z: 0.00 },
        { type: "C", x: -2.10, y: -0.93, z: 0.00 },
        { type: "C", x: -0.70, y: -0.93, z: 0.00 },
        { type: "H", x: -0.16, y: 2.43, z: 0.00 },
        { type: "H", x: -2.64, y: 2.43, z: 0.00 },
        { type: "H", x: -2.64, y: -1.86, z: 0.00 },
        { type: "H", x: -0.16, y: -1.86, z: 0.00 },
        { type: "O", x: -4.16, y: 0.28, z: 0.00 },
        { type: "H", x: -4.62, y: 1.13, z: 0.00 },
        { type: "N", x: 1.40, y: 0.28, z: 0.00 },
        { type: "H", x: 1.90, y: 1.16, z: 0.00 },
        { type: "C", x: 2.15, y: -0.88, z: 0.00 },
        { type: "O", x: 1.62, y: -2.00, z: 0.00 },
        { type: "C", x: 3.65, y: -0.74, z: 0.00 },
        { type: "H", x: 4.12, y: -1.73, z: 0.00 },
        { type: "H", x: 3.98, y: -0.18, z: 0.89 },
        { type: "H", x: 3.98, y: -0.18, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 },
        { from: 5, to: 9, order: 1 },
        { from: 3, to: 10, order: 1 },
        { from: 10, to: 11, order: 1 },
        { from: 0, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 12, to: 14, order: 1 },
        { from: 14, to: 15, order: 2 },
        { from: 14, to: 16, order: 1 },
        { from: 16, to: 17, order: 1 },
        { from: 16, to: 18, order: 1 },
        { from: 16, to: 19, order: 1 }
      ]
    }
  },
  {
    id: "C8H11NO2",
    formula: "C8H11NO2",
    name: "ドーパミン (Dopamine)",
    geometry: "カテコール環 + エチルアミン側鎖",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,H-1,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-1,H-1)",
    desc: "脳内で意欲・快感・運動調節を担うカテコールアミン系神経伝達物質だ。2つのヒドロキシ基を持つベンゼン環にエチルアミン鎖が伸びた構造を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: 0.16, y: 0.37, z: 0.00 },
        { type: "C", x: -0.54, y: 1.58, z: 0.00 },
        { type: "C", x: -1.94, y: 1.58, z: 0.00 },
        { type: "C", x: -2.64, y: 0.37, z: 0.00 },
        { type: "C", x: -1.94, y: -0.84, z: 0.00 },
        { type: "C", x: -0.54, y: -0.84, z: 0.00 },
        { type: "H", x: -0.00, y: 2.52, z: 0.00 },
        { type: "H", x: -2.48, y: 2.52, z: 0.00 },
        { type: "H", x: -0.00, y: -1.78, z: 0.00 },
        { type: "O", x: -4.00, y: 0.37, z: 0.00 },
        { type: "H", x: -4.46, y: 1.22, z: 0.00 },
        { type: "O", x: -2.62, y: -2.02, z: 0.00 },
        { type: "H", x: -3.56, y: -1.78, z: 0.00 },
        { type: "C", x: 1.66, y: 0.37, z: 0.00 },
        { type: "H", x: 2.04, y: 0.99, z: 0.82 },
        { type: "H", x: 2.04, y: 0.99, z: -0.82 },
        { type: "C", x: 2.41, y: -0.95, z: 0.00 },
        { type: "H", x: 2.04, y: -1.57, z: 0.82 },
        { type: "H", x: 2.04, y: -1.57, z: -0.82 },
        { type: "N", x: 3.86, y: -0.88, z: 0.00 },
        { type: "H", x: 4.24, y: -0.31, z: 0.76 },
        { type: "H", x: 4.24, y: -0.31, z: -0.76 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 5, to: 8, order: 1 },
        { from: 3, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 4, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 },
        { from: 0, to: 13, order: 1 },
        { from: 13, to: 14, order: 1 },
        { from: 13, to: 15, order: 1 },
        { from: 13, to: 16, order: 1 },
        { from: 16, to: 17, order: 1 },
        { from: 16, to: 18, order: 1 },
        { from: 16, to: 19, order: 1 },
        { from: 19, to: 20, order: 1 },
        { from: 19, to: 21, order: 1 }
      ]
    }
  },
  {
    id: "C9H8O",
    formula: "C9H8O",
    name: "シンナムアルデヒド (Cinnamaldehyde)",
    geometry: "共役トランス平面構造 (フェニル基 + アクロレイン鎖)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,H-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|O(C-2)",
    desc: "シナモン(桂皮)特有のスパイシーで甘い香りの主成分だ。ベンゼン環から二重結合とアルデヒド基まで共役系が一直線に伸びた平面構造をとる。",
    model3D: {
      atoms: [
        { type: "C", x: -0.08, y: 0.33, z: 0.00 },
        { type: "C", x: -0.78, y: 1.54, z: 0.00 },
        { type: "C", x: -2.18, y: 1.54, z: 0.00 },
        { type: "C", x: -2.88, y: 0.33, z: 0.00 },
        { type: "C", x: -2.18, y: -0.89, z: 0.00 },
        { type: "C", x: -0.78, y: -0.89, z: 0.00 },
        { type: "H", x: -0.24, y: 2.47, z: 0.00 },
        { type: "H", x: -2.72, y: 2.47, z: 0.00 },
        { type: "H", x: -3.96, y: 0.33, z: 0.00 },
        { type: "H", x: -2.72, y: -1.82, z: 0.00 },
        { type: "H", x: -0.24, y: -1.82, z: 0.00 },
        { type: "C", x: 1.38, y: 0.33, z: 0.00 },
        { type: "H", x: 1.92, y: 1.27, z: 0.00 },
        { type: "C", x: 2.08, y: -0.83, z: 0.00 },
        { type: "H", x: 1.54, y: -1.77, z: 0.00 },
        { type: "C", x: 3.54, y: -0.83, z: 0.00 },
        { type: "O", x: 4.20, y: -1.85, z: 0.00 },
        { type: "H", x: 4.08, y: 0.13, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 0, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 },
        { from: 11, to: 13, order: 2 },
        { from: 13, to: 14, order: 1 },
        { from: 13, to: 15, order: 1 },
        { from: 15, to: 16, order: 2 },
        { from: 15, to: 17, order: 1 }
      ]
    }
  },
  {
    id: "C10H8",
    formula: "C10H8",
    name: "ナフタレン (Naphthalene)",
    geometry: "縮合二環式芳香族平面構造 (10π電子系)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "2つのベンゼン環が一辺を共有して縮合した最も基本的な多環芳香族炭化水素だ。10個のπ電子が二環全体に非局在化しており、昇華性を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: -2.45, y: 0.60, z: 0.00 },
        { type: "C", x: -1.75, y: 1.81, z: 0.00 },
        { type: "C", x: -0.35, y: 1.81, z: 0.00 },
        { type: "C", x: 0.35, y: 0.60, z: 0.00 },
        { type: "C", x: -0.35, y: -0.60, z: 0.00 },
        { type: "C", x: -1.75, y: -0.60, z: 0.00 },
        { type: "C", x: 1.75, y: 0.60, z: 0.00 },
        { type: "C", x: 2.45, y: -0.60, z: 0.00 },
        { type: "C", x: 1.75, y: -1.81, z: 0.00 },
        { type: "C", x: 0.35, y: -1.81, z: 0.00 },
        { type: "H", x: -3.53, y: 0.60, z: 0.00 },
        { type: "H", x: -2.29, y: 2.75, z: 0.00 },
        { type: "H", x: 0.19, y: 2.75, z: 0.00 },
        { type: "H", x: -2.29, y: -1.54, z: 0.00 },
        { type: "H", x: 2.29, y: 1.54, z: 0.00 },
        { type: "H", x: 3.53, y: -0.60, z: 0.00 },
        { type: "H", x: 2.29, y: -2.75, z: 0.00 },
        { type: "H", x: -0.19, y: -2.75, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 3, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 8, order: 1 },
        { from: 8, to: 9, order: 2 },
        { from: 9, to: 4, order: 1 },
        { from: 0, to: 10, order: 1 },
        { from: 1, to: 11, order: 1 },
        { from: 2, to: 12, order: 1 },
        { from: 5, to: 13, order: 1 },
        { from: 6, to: 14, order: 1 },
        { from: 7, to: 15, order: 1 },
        { from: 8, to: 16, order: 1 },
        { from: 9, to: 17, order: 1 }
      ]
    }
  },
  {
    id: "C10H20O",
    formula: "C10H20O",
    name: "メントール (Menthol)",
    geometry: "いす型シクロヘキサン環 (環状モノテルペンアルコール)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)",
    desc: "ハッカ(ミント)の清涼感を生み出す環状アルコールだ。いす型六員環のエクアトリアル位にヒドロキシ基・イソプロピル基・メチル基の3つがすべて張り出した安定立体構造をとる。",
    model3D: {
      atoms: [
        { type: "C", x: 0.96, y: 0.39, z: -0.71 },
        { type: "C", x: 0.23, y: -0.05, z: 0.55 },
        { type: "C", x: -1.21, y: 0.39, z: 0.55 },
        { type: "C", x: -1.94, y: -0.05, z: -0.71 },
        { type: "C", x: -1.21, y: 0.39, z: -1.97 },
        { type: "C", x: 0.23, y: -0.05, z: -1.97 },
        { type: "O", x: 2.29, y: -0.08, z: -0.71 },
        { type: "H", x: 2.86, y: 0.69, z: -0.71 },
        { type: "H", x: 0.96, y: 1.47, z: -0.71 },
        { type: "C", x: 0.93, y: 0.42, z: 1.84 },
        { type: "H", x: 0.23, y: -1.13, z: 0.55 },
        { type: "H", x: 0.93, y: 1.50, z: 1.84 },
        { type: "C", x: 2.36, y: -0.08, z: 1.84 },
        { type: "C", x: 0.23, y: -0.08, z: 3.11 },
        { type: "H", x: 3.31, y: 0.27, z: 1.84 },
        { type: "H", x: 2.71, y: -1.03, z: 2.36 },
        { type: "H", x: 2.71, y: -1.03, z: 1.32 },
        { type: "H", x: 0.23, y: 0.27, z: 4.06 },
        { type: "H", x: -0.42, y: -0.93, z: 3.46 },
        { type: "H", x: 0.88, y: -0.93, z: 3.46 },
        { type: "H", x: -1.21, y: 1.47, z: 0.55 },
        { type: "H", x: -1.76, y: -0.06, z: 1.37 },
        { type: "H", x: -2.89, y: 0.40, z: -0.71 },
        { type: "H", x: -1.94, y: -1.13, z: -0.71 },
        { type: "H", x: 0.78, y: 0.40, z: -2.79 },
        { type: "H", x: 0.23, y: -1.13, z: -1.97 },
        { type: "C", x: -1.91, y: -0.08, z: -3.26 },
        { type: "H", x: -1.21, y: 1.47, z: -1.97 },
        { type: "H", x: -2.86, y: 0.27, z: -3.26 },
        { type: "H", x: -2.26, y: -1.03, z: -2.74 },
        { type: "H", x: -2.26, y: -1.03, z: -3.78 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 9, to: 11, order: 1 },
        { from: 9, to: 12, order: 1 },
        { from: 9, to: 13, order: 1 },
        { from: 12, to: 14, order: 1 },
        { from: 12, to: 15, order: 1 },
        { from: 12, to: 16, order: 1 },
        { from: 13, to: 17, order: 1 },
        { from: 13, to: 18, order: 1 },
        { from: 13, to: 19, order: 1 },
        { from: 2, to: 20, order: 1 },
        { from: 2, to: 21, order: 1 },
        { from: 3, to: 22, order: 1 },
        { from: 3, to: 23, order: 1 },
        { from: 5, to: 24, order: 1 },
        { from: 5, to: 25, order: 1 },
        { from: 4, to: 26, order: 1 },
        { from: 4, to: 27, order: 1 },
        { from: 26, to: 28, order: 1 },
        { from: 26, to: 29, order: 1 },
        { from: 26, to: 30, order: 1 }
      ]
    }
  },
  {
    id: "C10H16",
    formula: "C10H16",
    name: "リモネン (Limonene)",
    geometry: "シクロヘキセン環 (環状モノテルペン炭化水素)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-2,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-2,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "レモンやオレンジなど柑橘類の果皮に豊富に含まれる爽やかな香気成分だ。2つの二重結合と不斉炭素を持つ天然テルペンで、植物の防御物質としても働く。",
    model3D: {
      atoms: [
        { type: "C", x: 2.19, y: 0.16, z: -0.06 },
        { type: "C", x: 1.48, y: 1.39, z: -0.06 },
        { type: "C", x: 0.04, y: 1.39, z: 0.18 },
        { type: "C", x: -0.68, y: 0.16, z: -0.30 },
        { type: "C", x: 0.04, y: -1.07, z: 0.18 },
        { type: "C", x: 1.48, y: -1.07, z: -0.24 },
        { type: "C", x: 3.67, y: 0.16, z: -0.06 },
        { type: "H", x: 4.19, y: 1.08, z: -0.06 },
        { type: "H", x: 4.19, y: -0.30, z: 0.74 },
        { type: "H", x: 4.19, y: -0.30, z: -0.86 },
        { type: "H", x: 2.02, y: 2.33, z: -0.06 },
        { type: "H", x: -0.41, y: 2.04, z: 0.93 },
        { type: "H", x: -0.41, y: 2.04, z: -0.57 },
        { type: "H", x: -1.13, y: 0.16, z: -1.28 },
        { type: "C", x: -2.11, y: 0.16, z: 0.19 },
        { type: "C", x: -2.78, y: 1.30, z: 0.19 },
        { type: "C", x: -2.81, y: -1.17, z: 0.19 },
        { type: "H", x: -3.86, y: 1.30, z: 0.19 },
        { type: "H", x: -2.24, y: 2.25, z: 0.19 },
        { type: "H", x: -3.86, y: -1.42, z: 0.19 },
        { type: "H", x: -3.06, y: -1.82, z: 1.04 },
        { type: "H", x: -3.06, y: -1.82, z: -0.66 },
        { type: "H", x: -0.41, y: -1.72, z: 0.93 },
        { type: "H", x: -0.41, y: -1.72, z: -0.57 },
        { type: "H", x: 1.93, y: -1.72, z: 0.51 },
        { type: "H", x: 1.93, y: -1.72, z: -0.99 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 6, to: 8, order: 1 },
        { from: 6, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 2, to: 11, order: 1 },
        { from: 2, to: 12, order: 1 },
        { from: 3, to: 13, order: 1 },
        { from: 3, to: 14, order: 1 },
        { from: 14, to: 15, order: 2 },
        { from: 14, to: 16, order: 1 },
        { from: 15, to: 17, order: 1 },
        { from: 15, to: 18, order: 1 },
        { from: 16, to: 19, order: 1 },
        { from: 16, to: 20, order: 1 },
        { from: 16, to: 21, order: 1 },
        { from: 4, to: 22, order: 1 },
        { from: 4, to: 23, order: 1 },
       { from: 5, to: 24, order: 1 },
        { from: 5, to: 25, order: 1 }
      ]
    }
  },
  {
    id: "C3H7NO2",
    formula: "C3H7NO2",
    name: "アラニン (Alanine)",
    geometry: "キラル四面体骨格 (メチル側鎖アミノ酸)",
    signature: "C(C-1,C-1,H-1,N-1)|C(C-1,H-1,H-1,H-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "グリシンの次にシンプルなタンパク質構成アミノ酸だ。側鎖にメチル基(-CH3)を持つ疎水性アミノ酸であり、筋肉のエネルギー代謝(グルコース・アラニン回路)でも重要な役割を果たす。",
    model3D: {
      atoms: [
        { type: "C", x: -0.23, y: -0.01, z: -0.25 },
        { type: "N", x: -1.58, y: -0.56, z: 0.10 },
        { type: "C", x: 0.92, y: -0.93, z: -0.40 },
        { type: "O", x: 0.92, y: -2.13, z: -0.60 },
        { type: "O", x: 2.09, y: -0.23, z: -0.20 },
        { type: "C", x: -0.18, y: 1.17, z: 0.70 },
        { type: "H", x: -0.23, y: 0.41, z: -1.27 },
        { type: "H", x: -2.31, y: 0.11, z: -0.13 },
        { type: "H", x: -1.68, y: -1.39, z: -0.47 },
        { type: "H", x: 2.82, y: -0.87, z: -0.30 },
        { type: "H", x: -1.08, y: 1.81, z: 0.60 },
        { type: "H", x: 0.69, y: 1.79, z: 0.47 },
        { type: "H", x: -0.11, y: 0.81, z: 1.73 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 },
        { from: 5, to: 12, order: 1 }
      ]
    }
  },
  {
    id: "C3H7NO3",
    formula: "C3H7NO3",
    name: "セリン (Serine)",
    geometry: "キラル四面体骨格 (ヒドロキシメチル側鎖)",
    signature: "C(C-1,C-1,H-1,N-1)|C(C-1,H-1,H-1,O-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "側鎖にヒドロキシ基(-OH)を持つ極性アミノ酸だ。多くの消化酵素やシグナル伝達タンパク質の活性中心に位置し、リン酸化によって酵素のオン・オフを切り替えるスイッチとなる。",
    model3D: {
      atoms: [
        { type: "C", x: -0.22, y: -0.25, z: -0.29 },
        { type: "N", x: -1.57, y: -0.80, z: 0.06 },
        { type: "C", x: 0.93, y: -1.18, z: -0.44 },
        { type: "O", x: 0.93, y: -2.38, z: -0.64 },
        { type: "O", x: 2.10, y: -0.47, z: -0.24 },
        { type: "C", x: -0.17, y: 0.93, z: 0.66 },
        { type: "O", x: -0.17, y: 2.17, z: -0.07 },
        { type: "H", x: -0.22, y: 0.17, z: -1.31 },
        { type: "H", x: -2.30, y: -0.13, z: -0.17 },
        { type: "H", x: -1.67, y: -1.63, z: -0.51 },
        { type: "H", x: 2.83, y: -1.11, z: -0.34 },
        { type: "H", x: -1.04, y: 0.93, z: 1.33 },
        { type: "H", x: 0.70, y: 0.93, z: 1.33 },
        { type: "H", x: -0.17, y: 2.87, z: 0.60 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 0, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 4, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 },
        { from: 5, to: 12, order: 1 },
        { from: 6, to: 13, order: 1 }
      ]
    }
  },
  {
    id: "C3H6O3",
    formula: "C3H6O3",
    name: "乳酸 (Lactic Acid)",
    geometry: "キラルα-ヒドロキシ酸構造",
    signature: "C(C-1,C-1,H-1,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "生体内の解糖系や乳酸菌の発酵によって生じる代表的なヒドロキシ酸だ。一つの炭素にヒドロキシ基・カルボキシ基・メチル基・水素の4種すべてが結合した不斉中心を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: -0.39, y: -0.13, z: -0.29 },
        { type: "O", x: -1.67, y: -0.65, z: 0.06 },
        { type: "C", x: 0.76, y: -1.05, z: -0.44 },
        { type: "O", x: 0.76, y: -2.25, z: -0.64 },
        { type: "O", x: 1.93, y: -0.35, z: -0.24 },
        { type: "C", x: -0.34, y: 1.05, z: 0.66 },
        { type: "H", x: -0.39, y: 0.29, z: -1.31 },
        { type: "H", x: -2.34, y: 0.02, z: -0.17 },
        { type: "H", x: 2.66, y: -0.99, z: -0.34 },
        { type: "H", x: -1.24, y: 1.69, z: 0.56 },
        { type: "H", x: 0.53, y: 1.67, z: 0.43 },
        { type: "H", x: -0.27, y: 0.69, z: 1.69 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 },
        { from: 5, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 }
      ]
    }
  },
  {
    id: "C6H8O7",
    formula: "C6H8O7",
    name: "クエン酸 (Citric Acid)",
    geometry: "対称トリカルボン酸分岐骨格",
    signature: "C(C-1,C-1,C-1,O-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,O-1,O-2)|C(C-1,O-1,O-2)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|H(O-1)|H(O-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)|O(C-2)|O(C-2)",
    desc: "レモンや梅干しに含まれる酸味の主成分であり、全好気性生物のエネルギー産生回路「クエン酸回路(TCAサイクル)」の出発物質だ。3つのカルボキシ基が放射状に広がる。",
    model3D: {
      atoms: [
        { type: "C", x: -0.05, y: 0.14, z: 0.05 },
        { type: "O", x: -0.05, y: 1.49, z: 0.50 },
        { type: "C", x: -0.05, y: -0.51, z: -1.33 },
        { type: "O", x: -1.10, y: -0.51, z: -1.97 },
        { type: "O", x: 1.07, y: -1.04, z: -1.80 },
        { type: "C", x: -1.33, y: -0.31, z: 0.80 },
        { type: "C", x: -2.60, y: 0.39, z: 0.30 },
        { type: "O", x: -2.67, y: 1.59, z: 0.03 },
        { type: "O", x: -3.70, y: -0.38, z: 0.20 },
        { type: "C", x: 1.23, y: -0.31, z: 0.80 },
        { type: "C", x: 2.50, y: 0.39, z: 0.30 },
        { type: "O", x: 2.57, y: 1.59, z: 0.03 },
        { type: "O", x: 3.60, y: -0.38, z: 0.20 },
        { type: "H", x: -0.05, y: 2.09, z: -0.27 },
        { type: "H", x: 1.00, y: -1.44, z: -2.69 },
        { type: "H", x: -1.40, y: -1.38, z: 0.67 },
        { type: "H", x: -1.23, y: -0.11, z: 1.87 },
        { type: "H", x: -4.47, y: 0.12, z: -0.13 },
        { type: "H", x: 1.30, y: -1.38, z: 0.67 },
        { type: "H", x: 1.13, y: -0.11, z: 1.87 },
        { type: "H", x: 4.37, y: 0.12, z: -0.13 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 13, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 4, to: 14, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 15, order: 1 },
        { from: 5, to: 16, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 6, to: 8, order: 1 },
        { from: 8, to: 17, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 9, to: 18, order: 1 },
        { from: 9, to: 19, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 10, to: 11, order: 2 },
        { from: 10, to: 12, order: 1 },
        { from: 12, to: 20, order: 1 }
      ]
    }
  },
  {
    id: "C5H5N5",
    formula: "C5H5N5",
    name: "アデニン (Adenine)",
    geometry: "プリン二環性芳香族平面構造 (DNA/RNA塩基)",
    signature: "C(C-1,C-2,N-1)|C(C-1,N-1,N-2)|C(C-2,N-1,N-1)|C(H-1,N-1,N-2)|C(H-1,N-1,N-2)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(N-1)|N(C-1,C-1,H-1)|N(C-1,C-2)|N(C-1,C-2)|N(C-1,C-2)|N(C-1,H-1,H-1)",
    desc: "DNAとRNAの遺伝暗号を構成するプリン塩基であり、生体のエネルギー通貨ATPの骨格でもある。酸素原子を一切含まず、シアン化水素5分子が重合した組成式(HCN)5を持つ。",
    model3D: {
      atoms: [
        { type: "N", x: -1.33, y: 1.62, z: 0.00 },
        { type: "C", x: -0.13, y: 2.32, z: 0.00 },
        { type: "N", x: 1.07, y: 1.62, z: 0.00 },
        { type: "C", x: 1.07, y: 0.22, z: 0.00 },
        { type: "C", x: -0.13, y: -0.48, z: 0.00 },
        { type: "C", x: -1.33, y: 0.22, z: 0.00 },
        { type: "N", x: 0.29, y: -1.80, z: 0.00 },
        { type: "C", x: 1.62, y: -1.80, z: 0.00 },
        { type: "N", x: 2.09, y: -0.56, z: 0.00 },
        { type: "N", x: -2.51, y: -0.46, z: 0.00 },
        { type: "H", x: -0.13, y: 3.40, z: 0.00 },
        { type: "H", x: 2.25, y: -2.68, z: 0.00 },
        { type: "H", x: 3.05, y: -0.23, z: 0.00 },
        { type: "H", x: -3.35, y: 0.10, z: 0.00 },
        { type: "H", x: -2.55, y: -1.46, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 8, order: 1 },
        { from: 8, to: 3, order: 1 },
        { from: 5, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 7, to: 11, order: 1 },
        { from: 8, to: 12, order: 1 },
        { from: 9, to: 13, order: 1 },
        { from: 9, to: 14, order: 1 }
      ]
    }
  },
  {
    id: "C5H6N2O2",
    formula: "C5H6N2O2",
    name: "チミン (Thymine)",
    geometry: "ピリミジン平面六員環 (DNA固有塩基)",
    signature: "C(C-1,C-1,C-2)|C(C-1,H-1,H-1,H-1)|C(C-1,N-1,O-2)|C(C-2,H-1,N-1)|C(N-1,N-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|N(C-1,C-1,H-1)|N(C-1,C-1,H-1)|O(C-2)|O(C-2)",
    desc: "DNA二重らせんの中でアデニンと特異的に対合するピリミジン塩基だ。ウラシルの5位にメチル基が付いた構造を持ち、遺伝情報の長期保存に適した化学的安定性を備える。",
    model3D: {
      atoms: [
        { type: "N", x: -1.19, y: -1.36, z: 0.01 },
        { type: "C", x: -0.01, y: -2.04, z: 0.01 },
        { type: "N", x: 1.17, y: -1.36, z: 0.01 },
        { type: "C", x: 1.17, y: 0.00, z: 0.01 },
        { type: "C", x: -0.01, y: 0.68, z: 0.01 },
        { type: "C", x: -1.19, y: 0.00, z: 0.01 },
        { type: "O", x: -0.01, y: -3.26, z: 0.01 },
        { type: "O", x: 2.23, y: 0.61, z: 0.01 },
        { type: "C", x: -0.01, y: 2.18, z: 0.01 },
        { type: "H", x: -2.06, y: -1.86, z: 0.01 },
        { type: "H", x: 2.04, y: -1.86, z: 0.01 },
        { type: "H", x: -2.13, y: 0.54, z: 0.01 },
        { type: "H", x: -0.01, y: 2.70, z: 0.97 },
        { type: "H", x: 0.87, y: 2.50, z: -0.51 },
        { type: "H", x: -0.89, y: 2.50, z: -0.51 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 2 },
        { from: 3, to: 7, order: 2 },
        { from: 4, to: 8, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 2, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 },
        { from: 8, to: 12, order: 1 },
        { from: 8, to: 13, order: 1 },
        { from: 8, to: 14, order: 1 }
      ]
    }
  },
  {
    id: "C4H5N3O",
    formula: "C4H5N3O",
    name: "シトシン (Cytosine)",
    geometry: "ピリミジン平面六員環 (DNA/RNA塩基)",
    signature: "C(C-1,C-2,H-1)|C(C-1,N-1,N-2)|C(C-2,H-1,N-1)|C(N-1,N-1,O-2)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(N-1)|N(C-1,C-1,H-1)|N(C-1,C-2)|N(C-1,H-1,H-1)|O(C-2)",
    desc: "DNAおよびRNAに共通して含まれるピリミジン塩基で、グアニンと3本の強い水素結合で対合する。真核生物ではC5位のメチル化が遺伝子発現のエピジェネティック制御を担う。",
    model3D: {
      atoms: [
        { type: "N", x: -1.47, y: -1.02, z: 0.00 },
        { type: "C", x: -0.29, y: -1.70, z: 0.00 },
        { type: "N", x: 0.89, y: -1.02, z: 0.00 },
        { type: "C", x: 0.89, y: 0.34, z: 0.00 },
        { type: "C", x: -0.29, y: 1.02, z: 0.00 },
        { type: "C", x: -1.47, y: 0.34, z: 0.00 },
        { type: "O", x: -0.29, y: -2.92, z: 0.00 },
        { type: "N", x: 2.07, y: 1.02, z: 0.00 },
        { type: "H", x: -2.34, y: -1.52, z: 0.00 },
        { type: "H", x: -0.29, y: 2.10, z: 0.00 },
        { type: "H", x: -2.41, y: 0.88, z: 0.00 },
        { type: "H", x: 2.93, y: 0.48, z: 0.00 },
        { type: "H", x: 2.09, y: 2.02, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 2 },
        { from: 3, to: 7, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 7, to: 11, order: 1 },
        { from: 7, to: 12, order: 1 }
      ]
    }
  },
  {
    id: "C5H5N5O",
    formula: "C5H5N5O",
    name: "グアニン (Guanine)",
    geometry: "プリン二環性芳香族平面構造 (DNA/RNA塩基)",
    signature: "C(C-1,C-2,N-1)|C(C-1,N-1,O-2)|C(C-2,N-1,N-1)|C(H-1,N-1,N-2)|C(N-1,N-1,N-2)|H(C-1)|H(N-1)|H(N-1)|H(N-1)|H(N-1)|N(C-1,C-1,H-1)|N(C-1,C-1,H-1)|N(C-1,C-2)|N(C-1,C-2)|N(C-1,H-1,H-1)|O(C-2)",
    desc: "遺伝暗号のGを担うプリン塩基で、シトシンと3本の水素結合を形成してDNA二重らせんを強固に安定化する。魚のウロコやタチウオの銀白色の光沢結晶の正体でもある。",
    model3D: {
      atoms: [
        { type: "N", x: -1.55, y: 0.85, z: 0.00 },
        { type: "C", x: -0.35, y: 1.55, z: 0.00 },
        { type: "N", x: 0.85, y: 0.85, z: 0.00 },
        { type: "C", x: 0.85, y: -0.55, z: 0.00 },
        { type: "C", x: -0.35, y: -1.25, z: 0.00 },
        { type: "C", x: -1.55, y: -0.55, z: 0.00 },
        { type: "N", x: 0.07, y: -2.57, z: 0.00 },
        { type: "C", x: 1.40, y: -2.57, z: 0.00 },
        { type: "N", x: 1.87, y: -1.33, z: 0.00 },
        { type: "O", x: -2.61, y: -1.17, z: 0.00 },
        { type: "N", x: -0.35, y: 2.91, z: 0.00 },
        { type: "H", x: -2.41, y: 1.35, z: 0.00 },
        { type: "H", x: 2.03, y: -3.45, z: 0.00 },
        { type: "H", x: 2.83, y: -1.00, z: 0.00 },
        { type: "H", x: -1.21, y: 3.43, z: 0.00 },
        { type: "H", x: 0.51, y: 3.43, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 8, order: 1 },
        { from: 8, to: 3, order: 1 },
        { from: 5, to: 9, order: 2 },
        { from: 1, to: 10, order: 1 },
        { from: 0, to: 11, order: 1 },
        { from: 7, to: 12, order: 1 },
        { from: 8, to: 13, order: 1 },
        { from: 10, to: 14, order: 1 },
        { from: 10, to: 15, order: 1 }
      ]
    }
  },
  {
    id: "C5H10O5",
    formula: "C5H10O5",
    name: "リボース (Ribose)",
    geometry: "フラノース五員環構造 (五炭糖)",
    signature: "C(C-1,C-1,H-1,O-1)|C(C-1,C-1,H-1,O-1)|C(C-1,C-1,H-1,O-1)|C(C-1,H-1,H-1,O-1)|C(C-1,H-1,O-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|H(O-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)",
    desc: "RNA(リボ核酸)やATP・NADHなど生命の根幹分子の背骨を形作る五炭糖だ。酸素1個と炭素4個が作る五員環の周囲に4つのヒドロキシ基が立体的に配置されている。",
    model3D: {
      atoms: [
        { type: "O", x: 0.49, y: 1.53, z: 0.20 },
        { type: "C", x: 1.65, y: 0.71, z: 0.00 },
        { type: "C", x: 1.21, y: -0.69, z: 0.22 },
        { type: "C", x: -0.23, y: -0.69, z: -0.06 },
        { type: "C", x: -0.67, y: 0.71, z: 0.16 },
        { type: "C", x: -1.99, y: 1.17, z: -0.40 },
        { type: "O", x: 2.81, y: 1.10, z: 0.70 },
        { type: "H", x: 3.54, y: 0.50, z: 0.50 },
        { type: "H", x: 1.87, y: 0.80, z: -1.06 },
        { type: "O", x: 1.97, y: -1.63, z: -0.50 },
        { type: "H", x: 1.61, y: -2.50, z: -0.27 },
        { type: "H", x: 1.34, y: -0.90, z: 1.28 },
        { type: "O", x: -0.99, y: -1.63, z: 0.66 },
        { type: "H", x: -0.63, y: -2.50, z: 0.43 },
        { type: "H", x: -0.36, y: -0.90, z: -1.12 },
        { type: "H", x: -0.73, y: 0.83, z: 1.24 },
        { type: "O", x: -2.96, y: 0.17, z: -0.17 },
        { type: "H", x: -3.79, y: 0.50, z: -0.50 },
        { type: "H", x: -1.89, y: 1.33, z: -1.47 },
        { type: "H", x: -2.29, y: 2.10, z: 0.10 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 0, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 2, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 2, to: 11, order: 1 },
        { from: 3, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 3, to: 14, order: 1 },
        { from: 4, to: 15, order: 1 },
        { from: 5, to: 16, order: 1 },
        { from: 16, to: 17, order: 1 },
        { from: 5, to: 18, order: 1 },
        { from: 5, to: 19, order: 1 }
      ]
    }
  },
  {
    id: "C6H12O6",
    formula: "C6H12O6",
    name: "グルコース (Glucose)",
    geometry: "ピラノースいす型六員環構造 (六炭糖)",
    signature: "C(C-1,C-1,H-1,O-1)|C(C-1,C-1,H-1,O-1)|C(C-1,C-1,H-1,O-1)|C(C-1,C-1,H-1,O-1)|C(C-1,H-1,H-1,O-1)|C(C-1,H-1,O-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|H(O-1)|H(O-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)",
    desc: "光合成によって作られ、地球上のほぼすべての生物がエネルギー源として利用するブドウ糖だ。すべての置換基がいす型六員環のエクアトリアル位に並ぶ極めて安定な立体構造をとる。",
    model3D: {
      atoms: [
        { type: "C", x: 1.86, y: 0.23, z: 0.14 },
        { type: "C", x: 1.15, y: -0.21, z: 1.38 },
        { type: "C", x: -0.27, y: 0.23, z: 1.38 },
        { type: "C", x: -0.98, y: -0.21, z: 0.14 },
        { type: "C", x: -0.27, y: 0.23, z: -1.10 },
        { type: "O", x: 1.12, y: -0.19, z: -1.06 },
        { type: "O", x: 3.19, y: -0.24, z: 0.14 },
        { type: "H", x: 3.76, y: 0.53, z: 0.14 },
        { type: "H", x: 1.86, y: 1.31, z: 0.14 },
        { type: "O", x: 1.82, y: 0.26, z: 2.56 },
        { type: "H", x: 2.76, y: 0.06, z: 2.49 },
        { type: "H", x: 1.15, y: -1.29, z: 1.38 },
        { type: "O", x: -0.94, y: -0.24, z: 2.56 },
        { type: "H", x: -1.88, y: -0.04, z: 2.49 },
        { type: "H", x: -0.27, y: 1.31, z: 1.38 },
        { type: "O", x: -2.31, y: 0.26, z: 0.14 },
        { type: "H", x: -2.88, y: -0.51, z: 0.14 },
        { type: "H", x: -0.98, y: -1.29, z: 0.14 },
        { type: "C", x: -0.98, y: -0.24, z: -2.38 },
        { type: "H", x: -0.27, y: 1.31, z: -1.10 },
        { type: "O", x: -2.34, y: 0.16, z: -2.38 },
        { type: "H", x: -2.81, y: -0.24, z: -3.14 },
        { type: "H", x: -0.91, y: -1.32, z: -2.44 },
        { type: "H", x: -0.48, y: 0.19, z: -3.24 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 1, to: 11, order: 1 },
        { from: 2, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 2, to: 14, order: 1 },
        { from: 3, to: 15, order: 1 },
        { from: 15, to: 16, order: 1 },
        { from: 3, to: 17, order: 1 },
        { from: 4, to: 18, order: 1 },
        { from: 4, to: 19, order: 1 },
        { from: 18, to: 20, order: 1 },
        { from: 20, to: 21, order: 1 },
        { from: 18, to: 22, order: 1 },
        { from: 18, to: 23, order: 1 }
      ]
    }
  },
  {
    id: "C10H16_ADAMANTANE",
    formula: "C10H16",
    name: "アダマンタン (Adamantane)",
    geometry: "ダイヤモンド格子かご型構造 (Td対称)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "ダイヤモンドの結晶格子から最小単位を切り出して水素で終端した「かご型炭化水素」だ。4つのいす型シクロヘキサン環が立体的に組み合わさった極めて美しい対称構造を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: 0.88, y: 0.88, z: 0.88 },
        { type: "C", x: -0.88, y: -0.88, z: 0.88 },
        { type: "C", x: -0.88, y: 0.88, z: -0.88 },
        { type: "C", x: 0.88, y: -0.88, z: -0.88 },
        { type: "C", x: 0.00, y: 0.00, z: 1.76 },
        { type: "C", x: 0.00, y: 1.76, z: 0.00 },
        { type: "C", x: 1.76, y: 0.00, z: 0.00 },
        { type: "C", x: -1.76, y: 0.00, z: 0.00 },
        { type: "C", x: 0.00, y: -1.76, z: 0.00 },
        { type: "C", x: 0.00, y: 0.00, z: -1.76 },
        { type: "H", x: 1.51, y: 1.51, z: 1.51 },
        { type: "H", x: -1.51, y: -1.51, z: 1.51 },
        { type: "H", x: -1.51, y: 1.51, z: -1.51 },
        { type: "H", x: 1.51, y: -1.51, z: -1.51 },
        { type: "H", x: 0.63, y: -0.63, z: 2.39 },
        { type: "H", x: -0.63, y: 0.63, z: 2.39 },
        { type: "H", x: 0.63, y: 2.39, z: -0.63 },
        { type: "H", x: -0.63, y: 2.39, z: 0.63 },
        { type: "H", x: 2.39, y: 0.63, z: -0.63 },
        { type: "H", x: 2.39, y: -0.63, z: 0.63 },
        { type: "H", x: -2.39, y: 0.63, z: -0.63 },
        { type: "H", x: -2.39, y: -0.63, z: 0.63 },
        { type: "H", x: 0.63, y: -2.39, z: -0.63 },
        { type: "H", x: -0.63, y: -2.39, z: 0.63 },
        { type: "H", x: 0.63, y: 0.63, z: -2.39 },
        { type: "H", x: -0.63, y: -0.63, z: -2.39 }
      ],
      bonds: [
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 2, to: 5, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 3, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 2, to: 9, order: 1 },
        { from: 3, to: 9, order: 1 },
        { from: 0, to: 10, order: 1 },
        { from: 1, to: 11, order: 1 },
        { from: 2, to: 12, order: 1 },
        { from: 3, to: 13, order: 1 },
        { from: 4, to: 14, order: 1 },
        { from: 4, to: 15, order: 1 },
        { from: 5, to: 16, order: 1 },
        { from: 5, to: 17, order: 1 },
        { from: 6, to: 18, order: 1 },
        { from: 6, to: 19, order: 1 },
        { from: 7, to: 20, order: 1 },
        { from: 7, to: 21, order: 1 },
        { from: 8, to: 22, order: 1 },
        { from: 8, to: 23, order: 1 },
        { from: 9, to: 24, order: 1 },
        { from: 9, to: 25, order: 1 }
      ]
    }
  },
  {
    id: "C14H10",
    formula: "C14H10",
    name: "アントラセン (Anthracene)",
    geometry: "直線三環式芳香族平面構造 (14π電子系)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "3つのベンゼン環が直線状に縮合した多環芳香族炭化水素だ。14個のπ電子が分子全体にわたって非局在化しており、紫外線を当てると青紫色の美しい蛍光を発する。",
    model3D: {
      atoms: [
        { type: "C", x: -2.42, y: 1.40, z: 0.00 },
        { type: "C", x: -3.63, y: 0.70, z: 0.00 },
        { type: "C", x: -3.63, y: -0.70, z: 0.00 },
        { type: "C", x: -2.42, y: -1.40, z: 0.00 },
        { type: "C", x: -1.21, y: 0.70, z: 0.00 },
        { type: "C", x: -1.21, y: -0.70, z: 0.00 },
        { type: "C", x: -0.00, y: 1.40, z: 0.00 },
        { type: "C", x: -0.00, y: -1.40, z: 0.00 },
        { type: "C", x: 1.21, y: 0.70, z: 0.00 },
        { type: "C", x: 1.21, y: -0.70, z: 0.00 },
        { type: "C", x: 2.42, y: 1.40, z: 0.00 },
        { type: "C", x: 3.63, y: 0.70, z: 0.00 },
        { type: "C", x: 3.63, y: -0.70, z: 0.00 },
        { type: "C", x: 2.42, y: -1.40, z: 0.00 },
        { type: "H", x: -2.42, y: 2.48, z: 0.00 },
        { type: "H", x: -4.57, y: 1.24, z: 0.00 },
        { type: "H", x: -4.57, y: -1.24, z: 0.00 },
        { type: "H", x: -2.42, y: -2.48, z: 0.00 },
        { type: "H", x: -0.00, y: 2.48, z: 0.00 },
        { type: "H", x: -0.00, y: -2.48, z: 0.00 },
        { type: "H", x: 2.42, y: 2.48, z: 0.00 },
        { type: "H", x: 4.57, y: 1.24, z: 0.00 },
        { type: "H", x: 4.57, y: -1.24, z: 0.00 },
        { type: "H", x: 2.42, y: -2.48, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 5, order: 1 },
        { from: 5, to: 4, order: 2 },
        { from: 4, to: 0, order: 1 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 8, order: 2 },
        { from: 8, to: 9, order: 1 },
        { from: 9, to: 7, order: 2 },
        { from: 7, to: 5, order: 1 },
        { from: 8, to: 10, order: 1 },
        { from: 10, to: 11, order: 2 },
        { from: 11, to: 12, order: 1 },
        { from: 12, to: 13, order: 2 },
        { from: 13, to: 9, order: 1 },
        { from: 0, to: 14, order: 1 },
        { from: 1, to: 15, order: 1 },
        { from: 2, to: 16, order: 1 },
        { from: 3, to: 17, order: 1 },
        { from: 6, to: 18, order: 1 },
        { from: 7, to: 19, order: 1 },
        { from: 10, to: 20, order: 1 },
        { from: 11, to: 21, order: 1 },
       { from: 12, to: 22, order: 1 },
        { from: 13, to: 23, order: 1 }
      ]
    }
  },
  {
    id: "C5H11NO2",
    formula: "C5H11NO2",
    name: "バリン (Valine)",
    geometry: "キラル四面体骨格 (イソプロピル側鎖必須アミノ酸)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,H-1,N-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "筋肉の修復やエネルギー代謝を支える分岐鎖アミノ酸(BCAA)の一つだ。側鎖に二股に分かれたイソプロピル基を持つ疎水性アミノ酸で、タンパク質の立体構造の内部を安定化する。",
    model3D: {
      atoms: [
        { type: "C", x: -0.19, y: -0.59, z: -0.42 },
        { type: "N", x: -1.54, y: -1.14, z: -0.07 },
        { type: "C", x: 0.96, y: -1.51, z: -0.57 },
        { type: "O", x: 0.96, y: -2.71, z: -0.77 },
        { type: "O", x: 2.13, y: -0.81, z: -0.37 },
        { type: "C", x: -0.14, y: 0.59, z: 0.53 },
        { type: "C", x: -1.34, y: 1.53, z: 0.43 },
        { type: "C", x: 1.13, y: 1.39, z: 0.33 },
        { type: "H", x: -0.19, y: -0.17, z: -1.44 },
        { type: "H", x: -2.27, y: -0.47, z: -0.30 },
        { type: "H", x: -1.64, y: -1.97, z: -0.64 },
        { type: "H", x: 2.86, y: -1.45, z: -0.47 },
        { type: "H", x: -0.11, y: 0.23, z: 1.56 },
        { type: "H", x: -2.29, y: 1.98, z: 0.43 },
        { type: "H", x: -1.69, y: 0.88, z: 1.21 },
        { type: "H", x: -1.69, y: 0.88, z: -0.35 },
        { type: "H", x: 2.08, y: 1.84, z: 0.33 },
        { type: "H", x: 1.48, y: 0.74, z: 1.11 },
        { type: "H", x: 1.48, y: 0.74, z: -0.45 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 5, to: 7, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 4, to: 11, order: 1 },
        { from: 5, to: 12, order: 1 },
        { from: 6, to: 13, order: 1 },
        { from: 6, to: 14, order: 1 },
        { from: 6, to: 15, order: 1 },
        { from: 7, to: 16, order: 1 },
        { from: 7, to: 17, order: 1 },
        { from: 7, to: 18, order: 1 }
      ]
    }
  },
  {
    id: "C6H13NO2",
    formula: "C6H13NO2",
    name: "ロイシン (Leucine)",
    geometry: "キラル四面体骨格 (イソブチル側鎖必須アミノ酸)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,N-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "タンパク質合成のスイッチ(mTOR経路)を直接活性化する重要な必須アミノ酸だ。側鎖に大きなイソブチル基を持ち、ロイシンジッパーと呼ばれるDNA結合タンパク質の立体構造を形成する。",
    model3D: {
      atoms: [
        { type: "C", x: -0.17, y: -1.25, z: -0.24 },
        { type: "N", x: -1.52, y: -1.80, z: 0.11 },
        { type: "C", x: 0.98, y: -2.17, z: -0.39 },
        { type: "O", x: 0.98, y: -3.37, z: -0.59 },
        { type: "O", x: 2.15, y: -1.47, z: -0.19 },
        { type: "C", x: -0.12, y: -0.07, z: 0.71 },
        { type: "C", x: -0.12, y: 1.23, z: -0.09 },
        { type: "C", x: -1.32, y: 2.10, z: 0.21 },
        { type: "C", x: 1.15, y: 2.00, z: 0.11 },
        { type: "H", x: -0.17, y: -0.83, z: -1.26 },
        { type: "H", x: -2.25, y: -1.13, z: -0.12 },
        { type: "H", x: -1.62, y: -2.63, z: -0.46 },
        { type: "H", x: 2.88, y: -2.11, z: -0.29 },
        { type: "H", x: -0.99, y: -0.07, z: 1.38 },
        { type: "H", x: 0.75, y: -0.07, z: 1.38 },
        { type: "H", x: -0.12, y: 0.97, z: -1.15 },
        { type: "H", x: -2.27, y: 2.55, z: 0.21 },
        { type: "H", x: -1.67, y: 1.45, z: 0.99 },
        { type: "H", x: -1.67, y: 1.45, z: -0.57 },
        { type: "H", x: 2.10, y: 2.45, z: 0.11 },
        { type: "H", x: 1.50, y: 1.35, z: 0.89 },
        { type: "H", x: 1.50, y: 1.35, z: -0.67 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 6, to: 8, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 1, to: 11, order: 1 },
        { from: 4, to: 12, order: 1 },
        { from: 5, to: 13, order: 1 },
        { from: 5, to: 14, order: 1 },
        { from: 6, to: 15, order: 1 },
        { from: 7, to: 16, order: 1 },
        { from: 7, to: 17, order: 1 },
        { from: 7, to: 18, order: 1 },
        { from: 8, to: 19, order: 1 },
        { from: 8, to: 20, order: 1 },
        { from: 8, to: 21, order: 1 }
      ]
    }
  },
  {
    id: "C5H9NO2",
    formula: "C5H9NO2",
    name: "プロリン (Proline)",
    geometry: "ピロリジン五員環骨格 (環状アミノ酸)",
    signature: "C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,N-1)|C(C-1,H-1,H-1,N-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(O-1)|N(C-1,C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "側鎖が自身の窒素原子と繋がって五員環を作る唯一無二の環状アミノ酸だ。結合角が固定されているためタンパク質鎖に急な折れ曲がりを作り、コラーゲンの三重らせん構造を支える。",
    model3D: {
      atoms: [
        { type: "N", x: -0.80, y: 0.94, z: -0.03 },
        { type: "C", x: 0.53, y: 0.41, z: -0.33 },
        { type: "C", x: 0.27, y: -1.06, z: -0.00 },
        { type: "C", x: -1.20, y: -1.16, z: -0.36 },
        { type: "C", x: -1.80, y: 0.14, z: 0.07 },
        { type: "C", x: 1.70, y: 1.04, z: 0.37 },
        { type: "O", x: 1.77, y: 2.21, z: 0.70 },
        { type: "O", x: 2.73, y: 0.17, z: 0.54 },
        { type: "H", x: -1.00, y: 1.87, z: -0.36 },
        { type: "H", x: 0.70, y: 0.54, z: -1.40 },
        { type: "H", x: 0.90, y: -1.76, z: -0.56 },
        { type: "H", x: 0.43, y: -1.23, z: 1.07 },
        { type: "H", x: -1.37, y: -1.26, z: -1.43 },
        { type: "H", x: -1.63, y: -2.03, z: 0.14 },
        { type: "H", x: -2.70, y: 0.37, z: -0.50 },
        { type: "H", x: -2.03, y: 0.07, z: 1.14 },
        { type: "H", x: 3.43, y: 0.67, z: 0.97 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 0, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 5, to: 6, order: 2 },
        { from: 5, to: 7, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 2, to: 10, order: 1 },
        { from: 2, to: 11, order: 1 },
        { from: 3, to: 12, order: 1 },
        { from: 3, to: 13, order: 1 },
        { from: 4, to: 14, order: 1 },
        { from: 4, to: 15, order: 1 },
        { from: 7, to: 16, order: 1 }
      ]
    }
  },
  {
    id: "C6H9N3O2",
    formula: "C6H9N3O2",
    name: "ヒスチジン (Histidine)",
    geometry: "イミダゾール芳香環側鎖アミノ酸",
    signature: "C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,N-1)|C(C-1,C-2,N-1)|C(C-1,O-1,O-2)|C(C-2,H-1,N-1)|C(H-1,N-1,N-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,C-1,H-1)|N(C-1,C-2)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "側鎖に窒素を2個含むイミダゾール五員環を持つ塩基性アミノ酸だ。中性付近でプロトンを受け渡しできる性質ゆえに、多くの酵素の触媒中心やヘモグロビンの鉄結合部位で活躍する。",
    model3D: {
      atoms: [
        { type: "C", x: -0.24, y: -1.49, z: 0.02 },
        { type: "N", x: -1.59, y: -2.04, z: 0.37 },
        { type: "C", x: 0.91, y: -2.41, z: -0.13 },
        { type: "O", x: 0.91, y: -3.61, z: -0.33 },
        { type: "O", x: 2.08, y: -1.71, z: 0.07 },
        { type: "C", x: -0.19, y: -0.31, z: 0.97 },
        { type: "C", x: -0.19, y: 0.99, z: 0.17 },
        { type: "N", x: -1.32, y: 1.73, z: -0.10 },
        { type: "C", x: -0.96, y: 2.96, z: -0.56 },
        { type: "N", x: 0.34, y: 3.06, z: -0.60 },
        { type: "C", x: 0.86, y: 1.83, z: -0.16 },
        { type: "H", x: -0.24, y: -1.07, z: -1.00 },
        { type: "H", x: -2.32, y: -1.37, z: 0.14 },
        { type: "H", x: -1.69, y: -2.87, z: -0.20 },
        { type: "H", x: 2.81, y: -2.35, z: -0.03 },
        { type: "H", x: -1.06, y: -0.31, z: 1.64 },
        { type: "H", x: 0.68, y: -0.31, z: 1.64 },
        { type: "H", x: -1.66, y: 3.76, z: -0.86 },
        { type: "H", x: 0.88, y: 3.89, z: -0.90 },
        { type: "H", x: 1.90, y: 1.59, z: -0.06 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 7, to: 8, order: 2 },
        { from: 8, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 10, to: 6, order: 2 },
        { from: 0, to: 11, order: 1 },
        { from: 1, to: 12, order: 1 },
        { from: 1, to: 13, order: 1 },
        { from: 4, to: 14, order: 1 },
        { from: 5, to: 15, order: 1 },
        { from: 5, to: 16, order: 1 },
        { from: 8, to: 17, order: 1 },
       { from: 9, to: 18, order: 1 },
        { from: 10, to: 19, order: 1 }
      ]
    }
  },
  {
    id: "C11H12N2O2",
    formula: "C11H12N2O2",
    name: "トリプトファン (Tryptophan)",
    geometry: "インドール二環性芳香族側鎖アミノ酸",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,N-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,N-1)|C(C-1,O-1,O-2)|C(C-2,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,C-1,H-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "20種類のアミノ酸の中で最大のインドール二環骨格を持つ必須アミノ酸だ。脳内では幸福感や精神安定をもたらす神経伝達物質セロトニンや、睡眠ホルモンメラトニンの原料となる。",
    model3D: {
      atoms: [
        { type: "C", x: -1.76, y: -1.60, z: -0.03 },
        { type: "N", x: -3.06, y: -2.10, z: 0.32 },
        { type: "C", x: -0.66, y: -2.53, z: -0.18 },
        { type: "O", x: -0.66, y: -3.73, z: -0.38 },
        { type: "O", x: 0.51, y: -1.83, z: 0.02 },
        { type: "C", x: -1.66, y: -0.37, z: 0.89 },
        { type: "C", x: -0.76, y: 0.73, z: 0.32 },
        { type: "C", x: -1.23, y: 2.00, z: 0.09 },
        { type: "N", x: -0.16, y: 2.83, z: -0.28 },
        { type: "C", x: 0.97, y: 2.07, z: -0.28 },
        { type: "C", x: 0.61, y: 0.73, z: 0.09 },
        { type: "C", x: 1.54, y: -0.30, z: 0.19 },
        { type: "C", x: 2.87, y: 0.03, z: -0.08 },
        { type: "C", x: 3.24, y: 1.37, z: -0.45 },
        { type: "C", x: 2.31, y: 2.40, z: -0.55 },
        { type: "H", x: -1.76, y: -1.20, z: -1.05 },
        { type: "H", x: -3.79, y: -1.43, z: 0.09 },
        { type: "H", x: -3.16, y: -2.93, z: -0.25 },
        { type: "H", x: 1.24, y: -2.47, z: -0.08 },
        { type: "H", x: -2.63, y: 0.03, z: 1.12 },
        { type: "H", x: -1.26, y: -0.70, z: 1.85 },
        { type: "H", x: -2.26, y: 2.30, z: 0.19 },
        { type: "H", x: -0.19, y: 3.81, z: -0.51 },
        { type: "H", x: 1.25, y: -1.33, z: 0.47 },
        { type: "H", x: 3.61, y: -0.77, z: -0.01 },
        { type: "H", x: 4.27, y: 1.60, z: -0.65 },
        { type: "H", x: 2.61, y: 3.43, z: -0.83 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 5, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 8, order: 1 },
        { from: 8, to: 9, order: 1 },
        { from: 9, to: 10, order: 2 },
        { from: 10, to: 6, order: 1 },
        { from: 10, to: 11, order: 1 },
        { from: 11, to: 12, order: 2 },
        { from: 12, to: 13, order: 1 },
        { from: 13, to: 14, order: 2 },
        { from: 14, to: 9, order: 1 },
        { from: 0, to: 15, order: 1 },
        { from: 1, to: 16, order: 1 },
        { from: 1, to: 17, order: 1 },
        { from: 4, to: 18, order: 1 },
        { from: 5, to: 19, order: 1 },
        { from: 5, to: 20, order: 1 },
        { from: 7, to: 21, order: 1 },
        { from: 8, to: 22, order: 1 },
        { from: 11, to: 23, order: 1 },
        { from: 12, to: 24, order: 1 },
        { from: 13, to: 25, order: 1 },
        { from: 14, to: 26, order: 1 }
      ]
    }
  },
  {
    id: "C6H6N2O",
    formula: "C6H6N2O",
    name: "ニコチンアミド (Nicotinamide)",
    geometry: "ピリジン芳香環 + アミド平面構造 (ビタミンB3)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,H-1,N-2)|C(C-1,N-1,O-2)|C(C-2,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|N(C-1,C-2)|N(C-1,H-1,H-1)|O(C-2)",
    desc: "ビタミンB3(ナイアシン)の一形態であり、細胞内の酸化還元反応を担う補酵素NAD+およびNADP+の核心パーツだ。ピリジン環にアミド基が結合した平面構造を持つ。",
    model3D: {
      atoms: [
        { type: "N", x: -1.88, y: -0.98, z: 0.00 },
        { type: "C", x: -1.18, y: 0.23, z: 0.00 },
        { type: "C", x: 0.22, y: 0.23, z: 0.00 },
        { type: "C", x: 0.92, y: -0.98, z: 0.00 },
        { type: "C", x: 0.22, y: -2.19, z: 0.00 },
        { type: "C", x: -1.18, y: -2.19, z: 0.00 },
        { type: "C", x: 0.97, y: 1.50, z: 0.00 },
        { type: "O", x: 2.20, y: 1.50, z: 0.00 },
        { type: "N", x: 0.27, y: 2.67, z: 0.00 },
        { type: "H", x: -1.72, y: 1.17, z: 0.00 },
        { type: "H", x: 2.00, y: -0.98, z: 0.00 },
        { type: "H", x: 0.76, y: -3.13, z: 0.00 },
        { type: "H", x: -1.72, y: -3.13, z: 0.00 },
        { type: "H", x: 0.80, y: 3.54, z: 0.00 },
        { type: "H", x: -0.74, y: 2.67, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 6, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 },
        { from: 3, to: 10, order: 1 },
        { from: 4, to: 11, order: 1 },
        { from: 5, to: 12, order: 1 },
        { from: 8, to: 13, order: 1 },
        { from: 8, to: 14, order: 1 }
      ]
    }
  },
  {
    id: "C8H11NO3",
    formula: "C8H11NO3",
    name: "ピリドキシン (Pyridoxine)",
    geometry: "四置換ピリジン環構造 (ビタミンB6)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,N-2)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,O-1)|C(C-1,H-1,H-1,O-1)|C(C-2,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|H(O-1)|N(C-1,C-2)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)",
    desc: "アミノ酸の代謝や神経伝達物質の合成を助ける補酵素ピリドキサールリン酸の前駆体(ビタミンB6)だ。ピリジン環の周囲にメチル基・ヒドロキシ基・ヒドロキシメチル基が並ぶ。",
    model3D: {
      atoms: [
        { type: "N", x: -0.12, y: -2.31, z: 0.00 },
        { type: "C", x: -1.33, y: -1.61, z: 0.00 },
        { type: "C", x: -1.33, y: -0.21, z: 0.00 },
        { type: "C", x: -0.12, y: 0.49, z: 0.00 },
        { type: "C", x: 1.09, y: -0.21, z: 0.00 },
        { type: "C", x: 1.09, y: -1.61, z: 0.00 },
        { type: "C", x: -2.60, y: -2.36, z: 0.00 },
        { type: "H", x: -3.44, y: -1.67, z: 0.00 },
        { type: "H", x: -2.60, y: -2.99, z: 0.89 },
        { type: "H", x: -2.60, y: -2.99, z: -0.89 },
        { type: "O", x: -2.50, y: 0.47, z: 0.00 },
        { type: "H", x: -2.30, y: 1.41, z: 0.00 },
        { type: "C", x: -0.12, y: 1.97, z: 0.00 },
        { type: "O", x: 1.03, y: 2.64, z: 0.00 },
        { type: "H", x: 0.83, y: 3.57, z: 0.00 },
        { type: "H", x: -1.00, y: 2.34, z: 0.55 },
        { type: "H", x: -1.00, y: 2.34, z: -0.55 },
        { type: "C", x: 2.36, y: 0.54, z: 0.00 },
        { type: "O", x: 3.46, y: -0.26, z: 0.00 },
        { type: "H", x: 4.26, y: 0.27, z: 0.00 },
        { type: "H", x: 2.40, y: 1.21, z: 0.88 },
        { type: "H", x: 2.40, y: 1.21, z: -0.88 },
        { type: "H", x: 2.03, y: -2.15, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 6, to: 8, order: 1 },
        { from: 6, to: 9, order: 1 },
        { from: 2, to: 10, order: 1 },
        { from: 10, to: 11, order: 1 },
        { from: 3, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 13, to: 14, order: 1 },
        { from: 12, to: 15, order: 1 },
        { from: 12, to: 16, order: 1 },
        { from: 4, to: 17, order: 1 },
        { from: 17, to: 18, order: 1 },
        { from: 18, to: 19, order: 1 },
        { from: 17, to: 20, order: 1 },
        { from: 17, to: 21, order: 1 },
        { from: 5, to: 22, order: 1 }
      ]
    }
  },
  {
    id: "C6H8O6",
    formula: "C6H8O6",
    name: "アスコルビン酸 (Ascorbic Acid)",
    geometry: "不飽和ラクトン五員環 + ジオール側鎖 (ビタミンC)",
    signature: "C(C-1,C-1,H-1,O-1)|C(C-1,C-1,H-1,O-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,O-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|H(O-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "コラーゲン合成や強力な抗酸化作用を担うビタミンCだ。五員環内のエンジオール構造(HO-C=C-OH)が電子を放出しやすいため、活性酸素を無毒化する優れた還元剤として働く。",
    model3D: {
      atoms: [
        { type: "O", x: 1.51, y: 1.17, z: -0.17 },
        { type: "C", x: 2.69, y: 0.41, z: -0.17 },
        { type: "C", x: 2.23, y: -0.96, z: -0.17 },
        { type: "C", x: 0.83, y: -0.96, z: -0.17 },
        { type: "C", x: 0.39, y: 0.41, z: -0.17 },
        { type: "O", x: 3.86, y: 0.83, z: -0.17 },
        { type: "O", x: 3.06, y: -2.04, z: -0.17 },
        { type: "H", x: 2.53, y: -2.83, z: -0.17 },
        { type: "O", x: -0.01, y: -2.04, z: -0.17 },
        { type: "H", x: -0.91, y: -1.69, z: -0.17 },
        { type: "H", x: 0.26, y: 0.60, z: -1.23 },
        { type: "C", x: -0.87, y: 0.86, z: 0.51 },
        { type: "O", x: -0.87, y: 2.26, z: 0.51 },
        { type: "H", x: -0.01, y: 2.63, z: 0.75 },
        { type: "H", x: -0.87, y: 0.51, z: 1.55 },
        { type: "C", x: -2.14, y: 0.24, z: -0.09 },
        { type: "O", x: -3.27, y: 0.70, z: 0.61 },
        { type: "H", x: -4.04, y: 0.24, z: 0.25 },
        { type: "H", x: -2.14, y: 0.51, z: -1.15 },
        { type: "H", x: -2.14, y: -0.83, z: 0.05 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 0, order: 1 },
        { from: 1, to: 5, order: 2 },
        { from: 2, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 8, to: 9, order: 1 },
        { from: 4, to: 10, order: 1 },
        { from: 4, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 11, to: 14, order: 1 },
        { from: 11, to: 15, order: 1 },
        { from: 15, to: 16, order: 1 },
        { from: 16, to: 17, order: 1 },
       { from: 15, to: 18, order: 1 },
        { from: 15, to: 19, order: 1 }
      ]
    }
  },
  {
    id: "C10H14O",
    formula: "C10H14O",
    name: "チモール (Thymol)",
    geometry: "三置換ベンゼン環 (芳香族モノテルペンフェノール)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)",
    desc: "ハーブのタイム(タチジャコウソウ)に含まれる爽やかでスパイシーな香気・殺菌成分だ。メントールと同じ炭素骨格を持ちながら、六員環が芳香族ベンゼン環になった構造をしている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.91, y: -0.91, z: 0.00 },
        { type: "C", x: 0.21, y: 0.31, z: 0.00 },
        { type: "C", x: -1.19, y: 0.31, z: 0.00 },
        { type: "C", x: -1.89, y: -0.91, z: 0.00 },
        { type: "C", x: -1.19, y: -2.12, z: 0.00 },
        { type: "C", x: 0.21, y: -2.12, z: 0.00 },
        { type: "O", x: 2.27, y: -0.91, z: 0.00 },
        { type: "H", x: 2.73, y: -1.76, z: 0.00 },
        { type: "C", x: 0.93, y: 1.57, z: 0.00 },
        { type: "H", x: 1.99, y: 1.34, z: 0.00 },
        { type: "C", x: 0.56, y: 2.44, z: 1.20 },
        { type: "C", x: 0.56, y: 2.44, z: -1.20 },
        { type: "H", x: 0.56, y: 3.39, z: 1.65 },
        { type: "H", x: 1.44, y: 2.69, z: 1.75 },
        { type: "H", x: 1.11, y: 2.69, z: 0.32 },
        { type: "H", x: 0.56, y: 3.39, z: -1.65 },
        { type: "H", x: 1.44, y: 2.69, z: -1.75 },
        { type: "H", x: 1.11, y: 2.69, z: -0.32 },
        { type: "H", x: -1.73, y: 1.24, z: 0.00 },
        { type: "H", x: -2.97, y: -0.91, z: 0.00 },
        { type: "C", x: -1.94, y: -3.39, z: 0.00 },
        { type: "H", x: -3.01, y: -3.19, z: 0.00 },
        { type: "H", x: -1.67, y: -3.99, z: 0.89 },
        { type: "H", x: -1.67, y: -3.99, z: -0.89 },
        { type: "H", x: 0.75, y: -3.06, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 8, to: 9, order: 1 },
        { from: 8, to: 10, order: 1 },
        { from: 8, to: 11, order: 1 },
        { from: 10, to: 12, order: 1 },
        { from: 10, to: 13, order: 1 },
        { from: 10, to: 14, order: 1 },
        { from: 11, to: 15, order: 1 },
        { from: 11, to: 16, order: 1 },
        { from: 11, to: 17, order: 1 },
        { from: 2, to: 18, order: 1 },
        { from: 3, to: 19, order: 1 },
        { from: 4, to: 20, order: 1 },
        { from: 20, to: 21, order: 1 },
        { from: 20, to: 22, order: 1 },
        { from: 20, to: 23, order: 1 },
        { from: 5, to: 24, order: 1 }
      ]
    }
  },
  {
    id: "C10H12O2",
    formula: "C10H12O2",
    name: "オイゲノール (Eugenol)",
    geometry: "三置換ベンゼン環 (-OH / -OCH3 / アリル基)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,H-1,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|C(C-2,H-1,H-1)|C(H-1,H-1,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)",
    desc: "クローブ(丁子)やシナモンリーフに含まれる温かみのあるスパイシーな芳香成分だ。バニリンと非常によく似たベンゼン環骨格を持ち、歯科領域では鎮痛・消毒剤としても利用される。",
    model3D: {
      atoms: [
        { type: "C", x: 2.37, y: -0.34, z: 0.00 },
        { type: "C", x: 1.67, y: 0.87, z: 0.00 },
        { type: "C", x: 0.28, y: 0.87, z: 0.00 },
        { type: "C", x: -0.43, y: -0.34, z: 0.00 },
        { type: "C", x: 0.27, y: -1.55, z: 0.00 },
        { type: "C", x: 1.67, y: -1.55, z: 0.00 },
        { type: "O", x: 3.73, y: -0.34, z: 0.00 },
        { type: "H", x: 4.20, y: -1.19, z: 0.00 },
        { type: "O", x: 2.35, y: 2.05, z: 0.00 },
        { type: "C", x: 1.65, y: 3.28, z: 0.00 },
        { type: "H", x: 2.39, y: 4.08, z: 0.00 },
        { type: "H", x: 1.02, y: 3.34, z: 0.89 },
        { type: "H", x: 1.02, y: 3.34, z: -0.89 },
        { type: "H", x: -0.27, y: 1.81, z: 0.00 },
        { type: "C", x: -1.91, y: -0.34, z: 0.00 },
        { type: "H", x: -2.31, y: 0.28, z: 0.82 },
        { type: "H", x: -2.31, y: 0.28, z: -0.82 },
        { type: "C", x: -2.58, y: -1.66, z: 0.00 },
        { type: "H", x: -1.98, y: -2.56, z: 0.00 },
        { type: "C", x: -3.91, y: -1.76, z: 0.00 },
        { type: "H", x: -4.45, y: -2.70, z: 0.00 },
        { type: "H", x: -4.51, y: -0.86, z: 0.00 },
        { type: "H", x: -0.27, y: -2.49, z: 0.00 },
        { type: "H", x: 2.21, y: -2.49, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 8, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 9, to: 11, order: 1 },
        { from: 9, to: 12, order: 1 },
        { from: 2, to: 13, order: 1 },
        { from: 3, to: 14, order: 1 },
        { from: 14, to: 15, order: 1 },
        { from: 14, to: 16, order: 1 },
        { from: 14, to: 17, order: 1 },
        { from: 17, to: 18, order: 1 },
        { from: 17, to: 19, order: 2 },
        { from: 19, to: 20, order: 1 },
        { from: 19, to: 21, order: 1 },
        { from: 4, to: 22, order: 1 },
        { from: 5, to: 23, order: 1 }
      ]
    }
  },
  {
    id: "C14H10_PHENANTHRENE",
    formula: "C14H10",
    name: "フェナントレン (Phenanthrene)",
    geometry: "折れ曲がり三環式芳香族平面構造 (アントラセン異性体)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "3つのベンゼン環が「くの字」に折れ曲がって縮合した多環芳香族炭化水素だ。直線状のアントラセンの構造異性体であり、ステロイドやモルヒネなど多くの生体・天然物骨格の基本単位となる。",
    model3D: {
      atoms: [
        { type: "C", x: -1.97, y: 0.61, z: 0.00 },
        { type: "C", x: -3.18, y: -0.09, z: 0.00 },
        { type: "C", x: -3.18, y: -1.49, z: 0.00 },
        { type: "C", x: -1.97, y: -2.19, z: 0.00 },
        { type: "C", x: -0.76, y: -0.09, z: 0.00 },
        { type: "C", x: -0.76, y: -1.49, z: 0.00 },
        { type: "C", x: 0.45, y: 0.61, z: 0.00 },
        { type: "C", x: 0.45, y: -2.19, z: 0.00 },
        { type: "C", x: 1.66, y: -0.09, z: 0.00 },
        { type: "C", x: 1.66, y: -1.49, z: 0.00 },
        { type: "C", x: 0.45, y: 2.01, z: 0.00 },
        { type: "C", x: 1.66, y: 2.71, z: 0.00 },
        { type: "C", x: 2.87, y: 2.01, z: 0.00 },
        { type: "C", x: 2.87, y: 0.61, z: 0.00 },
        { type: "H", x: -1.97, y: 1.69, z: 0.00 },
        { type: "H", x: -4.12, y: 0.45, z: 0.00 },
        { type: "H", x: -4.12, y: -2.03, z: 0.00 },
        { type: "H", x: -1.97, y: -3.27, z: 0.00 },
        { type: "H", x: 0.45, y: -3.27, z: 0.00 },
        { type: "H", x: 2.60, y: -2.03, z: 0.00 },
        { type: "H", x: -0.49, y: 2.55, z: 0.00 },
        { type: "H", x: 1.66, y: 3.79, z: 0.00 },
        { type: "H", x: 3.81, y: 2.55, z: 0.00 },
        { type: "H", x: 3.81, y: 0.07, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 5, order: 1 },
        { from: 5, to: 4, order: 2 },
        { from: 4, to: 0, order: 1 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 8, order: 1 },
        { from: 8, to: 9, order: 1 },
        { from: 9, to: 7, order: 2 },
        { from: 7, to: 5, order: 1 },
        { from: 6, to: 10, order: 2 },
        { from: 10, to: 11, order: 1 },
        { from: 11, to: 12, order: 2 },
        { from: 12, to: 13, order: 1 },
        { from: 13, to: 8, order: 2 },
        { from: 0, to: 14, order: 1 },
        { from: 1, to: 15, order: 1 },
        { from: 2, to: 16, order: 1 },
        { from: 3, to: 17, order: 1 },
        { from: 7, to: 18, order: 1 },
        { from: 9, to: 19, order: 1 },
        { from: 10, to: 20, order: 1 },
        { from: 11, to: 21, order: 1 },
        { from: 12, to: 22, order: 1 },
        { from: 13, to: 23, order: 1 }
      ]
    }
  },
  {
    id: "C18H15P",
    formula: "C18H15P",
    name: "トリフェニルホスフィン (Triphenylphosphine)",
    geometry: "プロペラ型三角錐構造 (リン中心 + フェニル基x3)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,P-1)|C(C-1,C-2,P-1)|C(C-1,C-2,P-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|P(C-1,C-1,C-1)",
    desc: "3価のリン原子に3つのベンゼン環がプロペラのように羽を広げて結合した有機リン化合物だ。ノーベル化学賞を受賞したウィッティヒ反応やパラジウム触媒反応に欠かせない代表的配位子である。",
    model3D: {
      atoms: [
        { type: "P", x: 0.00, y: 1.27, z: -0.00 },
        { type: "C", x: 1.83, y: 0.37, z: -0.00 },
        { type: "C", x: 2.53, y: 0.89, z: 0.99 },
        { type: "C", x: 3.93, y: 0.54, z: 0.99 },
        { type: "C", x: 4.63, y: -0.33, z: -0.00 },
        { type: "C", x: 3.93, y: -0.85, z: -0.99 },
        { type: "C", x: 2.53, y: -0.50, z: -0.99 },
        { type: "H", x: 1.99, y: 1.56, z: 1.76 },
        { type: "H", x: 4.47, y: 0.94, z: 1.76 },
        { type: "H", x: 5.71, y: -0.60, z: -0.00 },
        { type: "H", x: 4.47, y: -1.53, z: -1.76 },
        { type: "H", x: 1.99, y: -0.91, z: -1.76 },
        { type: "C", x: -0.91, y: 0.37, z: 1.58 },
        { type: "C", x: -2.12, y: 0.89, z: 1.70 },
        { type: "C", x: -2.82, y: 0.54, z: 2.91 },
        { type: "C", x: -2.31, y: -0.33, z: 4.01 },
        { type: "C", x: -1.11, y: -0.85, z: 3.90 },
        { type: "C", x: -0.41, y: -0.50, z: 2.69 },
        { type: "H", x: -2.52, y: 1.56, z: 0.84 },
        { type: "H", x: -3.76, y: 0.94, z: 2.99 },
        { type: "H", x: -2.85, y: -0.60, z: 4.95 },
        { type: "H", x: -0.71, y: -1.53, z: 4.75 },
        { type: "H", x: 0.53, y: -0.91, z: 2.60 },
        { type: "C", x: -0.92, y: 0.37, z: -1.58 },
        { type: "C", x: -0.41, y: 0.89, z: -2.69 },
        { type: "C", x: -1.11, y: 0.54, z: -3.90 },
        { type: "C", x: -2.32, y: -0.33, z: -4.01 },
        { type: "C", x: -2.82, y: -0.85, z: -2.91 },
        { type: "C", x: -2.12, y: -0.50, z: -1.70 },
        { type: "H", x: 0.53, y: 1.56, z: -2.60 },
        { type: "H", x: -0.71, y: 0.94, z: -4.75 },
        { type: "H", x: -2.86, y: -0.60, z: -4.95 },
        { type: "H", x: -3.76, y: -1.53, z: -2.99 },
        { type: "H", x: -2.52, y: -0.91, z: -0.84 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 6, order: 2 },
        { from: 6, to: 1, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 },
        { from: 5, to: 10, order: 1 },
        { from: 6, to: 11, order: 1 },
        { from: 0, to: 12, order: 1 },
        { from: 12, to: 13, order: 2 },
        { from: 13, to: 14, order: 1 },
        { from: 14, to: 15, order: 2 },
        { from: 15, to: 16, order: 1 },
        { from: 16, to: 17, order: 2 },
        { from: 17, to: 12, order: 1 },
        { from: 13, to: 18, order: 1 },
        { from: 14, to: 19, order: 1 },
        { from: 15, to: 20, order: 1 },
        { from: 16, to: 21, order: 1 },
        { from: 17, to: 22, order: 1 },
        { from: 0, to: 23, order: 1 },
        { from: 23, to: 24, order: 2 },
        { from: 24, to: 25, order: 1 },
        { from: 25, to: 26, order: 2 },
        { from: 26, to: 27, order: 1 },
        { from: 27, to: 28, order: 2 },
        { from: 28, to: 23, order: 1 },
        { from: 24, to: 29, order: 1 },
        { from: 25, to: 30, order: 1 },
        { from: 26, to: 31, order: 1 },
       { from: 27, to: 32, order: 1 },
        { from: 28, to: 33, order: 1 }
      ]
    }
  },
  {
    id: "C4H4O",
    formula: "C4H4O",
    name: "フラン (Furan)",
    geometry: "含酸素五員環芳香族構造 (6π電子複素環)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-2,H-1,O-1)|C(C-2,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|O(C-1,C-1)",
    desc: "酸素原子1個と炭素原子4個が作る五員環芳香族化合物だ。酸素の非共有電子対が環のπ電子系に参加して芳香族性を獲得しており、多くの天然物や医薬品の基本骨格に含まれる。",
    model3D: {
      atoms: [
        { type: "O", x: 0.00, y: 1.41, z: 0.00 },
        { type: "C", x: 1.12, y: 0.61, z: 0.00 },
        { type: "C", x: 0.71, y: -0.70, z: 0.00 },
        { type: "C", x: -0.71, y: -0.70, z: 0.00 },
        { type: "C", x: -1.12, y: 0.61, z: 0.00 },
        { type: "H", x: 2.14, y: 0.96, z: 0.00 },
        { type: "H", x: 1.35, y: -1.57, z: 0.00 },
        { type: "H", x: -1.35, y: -1.57, z: 0.00 },
        { type: "H", x: -2.14, y: 0.96, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 0, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "C4H4S",
    formula: "C4H4S",
    name: "チオフェン (Thiophene)",
    geometry: "含硫黄五員環芳香族構造 (6π電子複素環)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-2,H-1,S-1)|C(C-2,H-1,S-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|S(C-1,C-1)",
    desc: "硫黄原子を含む五員環芳香族化合物で、ベンゼンに極めて似た高い芳香族安定性と物性を持つ。導電性高分子(ポリチオフェン)や有機EL材料の重要な構成単位である。",
    model3D: {
      atoms: [
        { type: "S", x: 0.00, y: 1.55, z: 0.00 },
        { type: "C", x: 1.22, y: 0.59, z: 0.00 },
        { type: "C", x: 0.73, y: -0.71, z: 0.00 },
        { type: "C", x: -0.73, y: -0.71, z: 0.00 },
        { type: "C", x: -1.22, y: 0.59, z: 0.00 },
        { type: "H", x: 2.24, y: 0.93, z: 0.00 },
        { type: "H", x: 1.36, y: -1.58, z: 0.00 },
        { type: "H", x: -1.36, y: -1.58, z: 0.00 },
        { type: "H", x: -2.24, y: 0.93, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 0, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "C4H4N2",
    formula: "C4H4N2",
    name: "ピリミジン (Pyrimidine)",
    geometry: "ジアジン六員環芳香族構造 (核酸塩基母核)",
    signature: "C(C-1,C-2,H-1)|C(C-1,H-1,N-2)|C(C-2,H-1,N-1)|C(H-1,N-1,N-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|N(C-1,C-2)|N(C-1,C-2)",
    desc: "ベンゼン環の1位と3位の炭素を窒素に置き換えた六員環複素芳香族化合物だ。DNAやRNAのシトシン・チミン・ウラシルの共通母核であり、ビタミンB1にも含まれる。",
    model3D: {
      atoms: [
        { type: "N", x: -1.18, y: -0.92, z: 0.00 },
        { type: "C", x: 0.00, y: -1.60, z: 0.00 },
        { type: "N", x: 1.18, y: -0.92, z: 0.00 },
        { type: "C", x: 1.18, y: 0.44, z: 0.00 },
        { type: "C", x: 0.00, y: 1.12, z: 0.00 },
        { type: "C", x: -1.18, y: 0.44, z: 0.00 },
        { type: "H", x: 0.00, y: -2.68, z: 0.00 },
        { type: "H", x: 2.12, y: 0.98, z: 0.00 },
        { type: "H", x: 0.00, y: 2.20, z: 0.00 },
        { type: "H", x: -2.12, y: 0.98, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 },
        { from: 5, to: 9, order: 1 }
      ]
    }
  },
  {
    id: "C8H7N",
    formula: "C8H7N",
    name: "インドール (Indole)",
    geometry: "ベンゼン環・ピロール環縮合二環構造 (10π電子系)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,N-1)|C(C-2,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|N(C-1,C-1,H-1)",
    desc: "ベンゼン環とピロール五員環が縮合した芳香族複素環化合物だ。トリプトファンやセロトニン、植物ホルモンのオーキシンなど数多くの生理活性物質の核心骨格をなす。",
    model3D: {
      atoms: [
        { type: "C", x: -1.65, y: 1.11, z: 0.00 },
        { type: "C", x: -2.45, y: -0.01, z: 0.00 },
        { type: "N", x: -1.65, y: -1.12, z: 0.00 },
        { type: "C", x: -0.32, y: -0.71, z: 0.00 },
        { type: "C", x: -0.32, y: 0.69, z: 0.00 },
        { type: "C", x: 0.89, y: 1.40, z: 0.00 },
        { type: "C", x: 2.10, y: 0.69, z: 0.00 },
        { type: "C", x: 2.10, y: -0.71, z: 0.00 },
        { type: "C", x: 0.89, y: -1.41, z: 0.00 },
        { type: "H", x: -2.00, y: 2.13, z: 0.00 },
        { type: "H", x: -3.53, y: -0.01, z: 0.00 },
        { type: "H", x: -1.98, y: -2.06, z: 0.00 },
        { type: "H", x: 0.89, y: 2.48, z: 0.00 },
        { type: "H", x: 3.04, y: 1.23, z: 0.00 },
        { type: "H", x: 3.04, y: -1.25, z: 0.00 },
        { type: "H", x: 0.89, y: -2.48, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 0, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 6, order: 2 },
        { from: 6, to: 7, order: 1 },
        { from: 7, to: 8, order: 2 },
        { from: 8, to: 3, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 2, to: 11, order: 1 },
        { from: 5, to: 12, order: 1 },
        { from: 6, to: 13, order: 1 },
        { from: 7, to: 14, order: 1 },
        { from: 8, to: 15, order: 1 }
      ]
    }
  },
  {
    id: "C9H7N",
    formula: "C9H7N",
    name: "キノリン (Quinoline)",
    geometry: "ベンゼン環・ピリジン環縮合二環構造 (10π電子系)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,N-1)|C(C-1,H-1,N-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|N(C-1,C-2)",
    desc: "ナフタレンの1位の炭素を窒素に置き換えた二環性芳香族化合物だ。抗マラリア薬キニーネやキノロン系抗菌薬、有機EL発光材料など幅広い分野で重要な母核となっている。",
    model3D: {
      atoms: [
        { type: "N", x: -1.55, y: 1.28, z: 0.00 },
        { type: "C", x: -0.85, y: 2.49, z: 0.00 },
        { type: "C", x: 0.55, y: 2.49, z: 0.00 },
        { type: "C", x: 1.25, y: 1.28, z: 0.00 },
        { type: "C", x: 0.55, y: 0.07, z: 0.00 },
        { type: "C", x: -0.85, y: 0.07, z: 0.00 },
        { type: "C", x: 1.25, y: -1.14, z: 0.00 },
        { type: "C", x: 0.55, y: -2.35, z: 0.00 },
        { type: "C", x: -0.85, y: -2.35, z: 0.00 },
        { type: "C", x: -1.55, y: -1.14, z: 0.00 },
        { type: "H", x: -1.39, y: 3.43, z: 0.00 },
        { type: "H", x: 1.09, y: 3.43, z: 0.00 },
        { type: "H", x: 2.33, y: 1.28, z: 0.00 },
        { type: "H", x: 2.33, y: -1.14, z: 0.00 },
        { type: "H", x: 1.09, y: -3.29, z: 0.00 },
        { type: "H", x: -1.39, y: -3.29, z: 0.00 },
        { type: "H", x: -2.63, y: -1.14, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 8, order: 1 },
        { from: 8, to: 9, order: 2 },
        { from: 9, to: 5, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 2, to: 11, order: 1 },
        { from: 3, to: 12, order: 1 },
        { from: 6, to: 13, order: 1 },
        { from: 7, to: 14, order: 1 },
        { from: 8, to: 15, order: 1 },
        { from: 9, to: 16, order: 1 }
      ]
    }
  },
  {
    id: "C6H6O2",
    formula: "C6H6O2",
    name: "ヒドロキノン (Hydroquinone)",
    geometry: "パラ二置換ベンゼン環 (1,4-ジヒドロキシベンゼン)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|O(C-1,H-1)|O(C-1,H-1)",
    desc: "ベンゼン環の対角線上(パラ位)に2つのヒドロキシ基を持つ二価フェノールだ。容易に酸化されてベンゾキノンへ変化する可逆的な酸化還元能を持ち、写真現像液や美白成分としても知られる。",
    model3D: {
      atoms: [
        { type: "C", x: 1.40, y: -0.00, z: 0.00 },
        { type: "C", x: 0.70, y: 1.21, z: 0.00 },
        { type: "C", x: -0.70, y: 1.21, z: 0.00 },
        { type: "C", x: -1.40, y: 0.00, z: 0.00 },
        { type: "C", x: -0.70, y: -1.21, z: 0.00 },
        { type: "C", x: 0.70, y: -1.21, z: 0.00 },
        { type: "O", x: 2.76, y: -0.00, z: 0.00 },
        { type: "H", x: 3.22, y: 0.85, z: 0.00 },
        { type: "O", x: -2.76, y: -0.00, z: 0.00 },
        { type: "H", x: -3.22, y: -0.85, z: 0.00 },
        { type: "H", x: 1.24, y: 2.15, z: 0.00 },
        { type: "H", x: -1.24, y: 2.15, z: 0.00 },
        { type: "H", x: -1.24, y: -2.15, z: 0.00 },
        { type: "H", x: 1.24, y: -2.15, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 8, to: 9, order: 1 },
        { from: 1, to: 10, order: 1 },
        { from: 2, to: 11, order: 1 },
       { from: 4, to: 12, order: 1 },
        { from: 5, to: 13, order: 1 }
      ]
    }
  },
  {
    id: "C4H5N",
    formula: "C4H5N",
    name: "ピロール (Pyrrole)",
    geometry: "含窒素五員環芳香族構造 (ヘム・クロロフィル構成単位)",
    signature: "C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-2,H-1,N-1)|C(C-2,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|N(C-1,C-1,H-1)",
    desc: "窒素原子1個と炭素原子4個が作る五員環芳香族化合物だ。4つのピロール環が繋がったポルフィリン環は、血液のヘモグロビンや植物のクロロフィルの中心骨格を形成する。",
    model3D: {
      atoms: [
        { type: "N", x: 0.00, y: 1.17, z: 0.00 },
        { type: "C", x: 1.12, y: 0.37, z: 0.00 },
        { type: "C", x: 0.71, y: -0.94, z: 0.00 },
        { type: "C", x: -0.71, y: -0.94, z: 0.00 },
        { type: "C", x: -1.12, y: 0.37, z: 0.00 },
        { type: "H", x: 0.00, y: 2.18, z: 0.00 },
        { type: "H", x: 2.14, y: 0.72, z: 0.00 },
        { type: "H", x: 1.35, y: -1.81, z: 0.00 },
        { type: "H", x: -1.35, y: -1.81, z: 0.00 },
        { type: "H", x: -2.14, y: 0.72, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 0, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 }
      ]
    }
  },
  {
    id: "C10H14N2",
    formula: "C10H14N2",
    name: "ニコチン (Nicotine)",
    geometry: "ピリジン環 + N-メチルピロリジン環二環構造",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,N-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,H-1,H-1,N-1)|C(C-1,H-1,N-2)|C(C-2,H-1,N-1)|C(H-1,H-1,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|N(C-1,C-1,C-1)|N(C-1,C-2)",
    desc: "タバコ属植物が害虫から身を守るために生合成する天然アルカロイドだ。平面のピリジン環と立体的なピロリジン五員環が単結合で繋がった構造を持ち、神経系の受容体に強く作用する。",
    model3D: {
      atoms: [
        { type: "N", x: -3.03, y: -1.77, z: -0.20 },
        { type: "C", x: -2.33, y: -0.56, z: -0.20 },
        { type: "C", x: -0.93, y: -0.56, z: -0.20 },
        { type: "C", x: -0.23, y: -1.77, z: -0.20 },
        { type: "C", x: -0.93, y: -2.98, z: -0.20 },
        { type: "C", x: -2.33, y: -2.98, z: -0.20 },
        { type: "H", x: -2.87, y: 0.38, z: -0.20 },
        { type: "H", x: 0.85, y: -1.77, z: -0.20 },
        { type: "H", x: -0.39, y: -3.92, z: -0.20 },
        { type: "H", x: -2.87, y: -3.92, z: -0.20 },
        { type: "C", x: -0.16, y: 0.71, z: 0.05 },
        { type: "N", x: 1.24, y: 0.48, z: -0.35 },
        { type: "C", x: 1.87, y: 1.78, z: -0.05 },
        { type: "C", x: 0.74, y: 2.75, z: -0.35 },
        { type: "C", x: -0.50, y: 1.98, z: 0.05 },
        { type: "C", x: 1.84, y: -0.69, z: 0.32 },
        { type: "H", x: -0.30, y: 0.95, z: 1.11 },
        { type: "H", x: -1.36, y: 2.35, z: -0.52 },
        { type: "H", x: -0.76, y: 2.05, z: 1.11 },
        { type: "H", x: 0.87, y: 3.68, z: 0.22 },
        { type: "H", x: 0.70, y: 3.01, z: -1.41 },
        { type: "H", x: 2.77, y: 1.95, z: -0.65 },
        { type: "H", x: 2.14, y: 1.81, z: 1.01 },
        { type: "H", x: 2.90, y: -0.75, z: 0.05 },
        { type: "H", x: 1.74, y: -0.62, z: 1.41 },
        { type: "H", x: 1.34, y: -1.59, z: -0.05 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
        { from: 4, to: 8, order: 1 },
        { from: 5, to: 9, order: 1 },
        { from: 2, to: 10, order: 1 },
        { from: 10, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 },
        { from: 12, to: 13, order: 1 },
        { from: 13, to: 14, order: 1 },
        { from: 14, to: 10, order: 1 },
        { from: 11, to: 15, order: 1 },
        { from: 10, to: 16, order: 1 },
        { from: 14, to: 17, order: 1 },
        { from: 14, to: 18, order: 1 },
        { from: 13, to: 19, order: 1 },
        { from: 13, to: 20, order: 1 },
        { from: 12, to: 21, order: 1 },
        { from: 12, to: 22, order: 1 },
        { from: 15, to: 23, order: 1 },
        { from: 15, to: 24, order: 1 },
        { from: 15, to: 25, order: 1 }
      ]
    }
  },
  {
    id: "C9H13NO3",
    formula: "C9H13NO3",
    name: "アドレナリン (Adrenaline)",
    geometry: "カテコール環 + キラルβ-ヒドロキシ側鎖",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,H-1,O-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|C(C-1,H-1,H-1,N-1)|C(H-1,H-1,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(O-1)|H(O-1)|H(O-1)|N(C-1,C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-1,H-1)",
    desc: "副腎髄質から分泌されるホルモン兼神経伝達物質(別名エピネフリン)だ。ドーパミンにヒドロキシ基とメチル基が加わった構造を持ち、心拍数や血糖値を高めて身体を臨戦態勢へ導く。",
    model3D: {
      atoms: [
        { type: "C", x: -0.53, y: 0.67, z: -0.08 },
        { type: "C", x: -1.23, y: 1.88, z: -0.08 },
        { type: "C", x: -2.63, y: 1.88, z: -0.08 },
        { type: "C", x: -3.33, y: 0.67, z: -0.08 },
        { type: "C", x: -2.63, y: -0.54, z: -0.08 },
        { type: "C", x: -1.23, y: -0.54, z: -0.08 },
        { type: "H", x: -0.69, y: 2.82, z: -0.08 },
        { type: "H", x: -3.17, y: 2.82, z: -0.08 },
        { type: "H", x: -0.69, y: -1.48, z: -0.08 },
        { type: "O", x: -4.69, y: 0.67, z: -0.08 },
        { type: "H", x: -5.15, y: 1.52, z: -0.08 },
        { type: "O", x: -3.31, y: -1.72, z: -0.08 },
        { type: "H", x: -4.25, y: -1.48, z: -0.08 },
        { type: "C", x: 0.97, y: 0.67, z: -0.08 },
        { type: "O", x: 1.42, y: 1.52, z: 0.97 },
        { type: "H", x: 2.37, y: 1.52, z: 0.97 },
        { type: "H", x: 1.35, y: 1.22, z: -0.96 },
        { type: "C", x: 1.72, y: -0.65, z: -0.08 },
        { type: "H", x: 1.35, y: -1.27, z: 0.74 },
        { type: "H", x: 1.35, y: -1.27, z: -0.90 },
        { type: "N", x: 3.17, y: -0.58, z: -0.08 },
        { type: "H", x: 3.55, y: -0.01, z: 0.68 },
        { type: "C", x: 3.92, y: -1.83, z: -0.08 },
        { type: "H", x: 4.99, y: -1.61, z: -0.08 },
        { type: "H", x: 3.65, y: -2.41, z: 0.81 },
        { type: "H", x: 3.65, y: -2.41, z: -0.97 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 },
        { from: 5, to: 8, order: 1 },
        { from: 3, to: 9, order: 1 },
        { from: 9, to: 10, order: 1 },
        { from: 4, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 },
        { from: 0, to: 13, order: 1 },
        { from: 13, to: 14, order: 1 },
        { from: 14, to: 15, order: 1 },
        { from: 13, to: 16, order: 1 },
        { from: 13, to: 17, order: 1 },
        { from: 17, to: 18, order: 1 },
        { from: 17, to: 19, order: 1 },
        { from: 17, to: 20, order: 1 },
        { from: 20, to: 21, order: 1 },
        { from: 20, to: 22, order: 1 },
        { from: 22, to: 23, order: 1 },
        { from: 22, to: 24, order: 1 },
        { from: 22, to: 25, order: 1 }
      ]
    }
  },
  {
    id: "C6H18OSi2",
    formula: "C6H18OSi2",
    name: "ヘキサメチルジシロキサン (HMDSO)",
    geometry: "シロキサン架橋構造 (Si-O-Si + メチル基x6)",
    signature: "C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|C(H-1,H-1,H-1,Si-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|O(Si-1,Si-1)|Si(C-1,C-1,C-1,O-1)|Si(C-1,C-1,C-1,O-1)",
    desc: "2つのケイ素原子が酸素原子を介して繋がるシロキサン結合(Si-O-Si)を持つ最も基本的な有機ケイ素化合物だ。シリコーン樹脂や撥水コーティングの最小モデル分子である。",
    model3D: {
      atoms: [
        { type: "O", x: -0.00, y: 0.57, z: -0.00 },
        { type: "Si", x: -1.55, y: -0.00, z: -0.00 },
        { type: "Si", x: 1.55, y: -0.00, z: -0.00 },
        { type: "C", x: -2.56, y: 1.55, z: -0.00 },
        { type: "H", x: -3.61, y: 1.30, z: -0.00 },
        { type: "H", x: -2.32, y: 2.13, z: 0.88 },
        { type: "H", x: -2.32, y: 2.13, z: -0.88 },
        { type: "C", x: -2.53, y: -0.81, z: 1.34 },
        { type: "H", x: -2.08, y: -1.75, z: 1.60 },
        { type: "H", x: -2.55, y: -0.16, z: 2.21 },
        { type: "H", x: -3.55, y: -0.98, z: 1.00 },
        { type: "C", x: -2.53, y: -0.81, z: -1.34 },
        { type: "H", x: -2.08, y: -1.75, z: -1.60 },
        { type: "H", x: -3.55, y: -0.98, z: -1.00 },
        { type: "H", x: -2.55, y: -0.16, z: -2.21 },
        { type: "C", x: 2.56, y: 1.55, z: -0.00 },
        { type: "H", x: 1.89, y: 2.41, z: -0.00 },
        { type: "H", x: 3.18, y: 1.58, z: 0.88 },
        { type: "H", x: 3.18, y: 1.58, z: -0.88 },
        { type: "C", x: 2.53, y: -0.81, z: 1.34 },
        { type: "H", x: 3.37, y: -0.17, z: 1.60 },
        { type: "H", x: 1.91, y: -0.95, z: 2.21 },
        { type: "H", x: 2.90, y: -1.76, z: 1.00 },
        { type: "C", x: 2.53, y: -0.81, z: -1.34 },
        { type: "H", x: 3.37, y: -0.17, z: -1.60 },
        { type: "H", x: 2.90, y: -1.76, z: -1.00 },
        { type: "H", x: 1.91, y: -0.95, z: -2.21 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 3, to: 5, order: 1 },
        { from: 3, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 7, to: 8, order: 1 },
        { from: 7, to: 9, order: 1 },
        { from: 7, to: 10, order: 1 },
        { from: 1, to: 11, order: 1 },
        { from: 11, to: 12, order: 1 },
        { from: 11, to: 13, order: 1 },
        { from: 11, to: 14, order: 1 },
        { from: 2, to: 15, order: 1 },
        { from: 15, to: 16, order: 1 },
        { from: 15, to: 17, order: 1 },
        { from: 15, to: 18, order: 1 },
        { from: 2, to: 19, order: 1 },
        { from: 19, to: 20, order: 1 },
        { from: 19, to: 21, order: 1 },
        { from: 19, to: 22, order: 1 },
        { from: 2, to: 23, order: 1 },
        { from: 23, to: 24, order: 1 },
        { from: 23, to: 25, order: 1 },
        { from: 23, to: 26, order: 1 }
      ]
    }
  },
  {
    id: "C16H10",
    formula: "C16H10",
    name: "ピレン (Pyrene)",
    geometry: "四環式ペリ縮合芳香族平面構造 (16π電子系)",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "4つのベンゼン環がひし形に密集縮合した多環芳香族炭化水素だ。16個のπ電子が平面全体に広がっており、分子同士が重なると緑色のエキシマー蛍光を放つ光機能材料の代表格である。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.70, z: 0.00 },
        { type: "C", x: 0.00, y: -0.70, z: 0.00 },
        { type: "C", x: -1.21, y: 1.40, z: 0.00 },
        { type: "C", x: 1.21, y: 1.40, z: 0.00 },
        { type: "C", x: -1.21, y: -1.40, z: 0.00 },
        { type: "C", x: 1.21, y: -1.40, z: 0.00 },
        { type: "C", x: -2.42, y: 0.70, z: 0.00 },
        { type: "C", x: -2.42, y: -0.70, z: 0.00 },
        { type: "C", x: 2.42, y: 0.70, z: 0.00 },
        { type: "C", x: 2.42, y: -0.70, z: 0.00 },
        { type: "C", x: -1.21, y: 2.80, z: 0.00 },
        { type: "C", x: 0.00, y: 3.50, z: 0.00 },
        { type: "C", x: 1.21, y: 2.80, z: 0.00 },
        { type: "C", x: -1.21, y: -2.80, z: 0.00 },
        { type: "C", x: 0.00, y: -3.50, z: 0.00 },
        { type: "C", x: 1.21, y: -2.80, z: 0.00 },
        { type: "H", x: -3.36, y: 1.24, z: 0.00 },
        { type: "H", x: -3.36, y: -1.24, z: 0.00 },
        { type: "H", x: 3.36, y: 1.24, z: 0.00 },
        { type: "H", x: 3.36, y: -1.24, z: 0.00 },
        { type: "H", x: -2.15, y: 3.34, z: 0.00 },
        { type: "H", x: 0.00, y: 4.58, z: 0.00 },
        { type: "H", x: 2.15, y: 3.34, z: 0.00 },
        { type: "H", x: -2.15, y: -3.34, z: 0.00 },
        { type: "H", x: 0.00, y: -4.58, z: 0.00 },
        { type: "H", x: 2.15, y: -3.34, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 2 },
        { from: 0, to: 3, order: 1 },
        { from: 1, to: 4, order: 2 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 4, order: 1 },
        { from: 3, to: 8, order: 1 },
        { from: 8, to: 9, order: 2 },
        { from: 9, to: 5, order: 1 },
        { from: 2, to: 10, order: 1 },
        { from: 10, to: 11, order: 2 },
        { from: 11, to: 12, order: 1 },
        { from: 12, to: 3, order: 2 },
        { from: 4, to: 13, order: 1 },
        { from: 13, to: 14, order: 2 },
        { from: 14, to: 15, order: 1 },
        { from: 15, to: 5, order: 2 },
        { from: 6, to: 16, order: 1 },
        { from: 7, to: 17, order: 1 },
        { from: 8, to: 18, order: 1 },
        { from: 9, to: 19, order: 1 },
        { from: 10, to: 20, order: 1 },
        { from: 11, to: 21, order: 1 },
        { from: 12, to: 22, order: 1 },
        { from: 13, to: 23, order: 1 },
        { from: 14, to: 24, order: 1 },
        { from: 15, to: 25, order: 1 }
      ]
    }
  },






  {
    id: "CH2O",
    formula: "CH2O",
    name: "ホルムアルデヒド (Formaldehyde)",
    geometry: "平面三角形構造 (結合角 120度)",
    signature: "C(H-1,H-1,O-2)|H(C-1)|H(C-1)|O(C-2)",
    desc: "樹脂や接着剤の原料として産業界で広く使われる基礎化合物だ。反応性が高く生体標本を固定する防腐剤としても知られるが、実は遠い星間空間でも観測されている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.10, z: 0.00 },
        { type: "O", x: 0.00, y: -1.11, z: 0.00 },
        { type: "H", x: -0.94, y: 0.69, z: 0.00 },
        { type: "H", x: 0.94, y: 0.69, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }
      ]
    }
  },
  {
    id: "C2H6",
    formula: "C2H6",
    name: "エタン (Ethylene)",
    geometry: "二重四面体・ねじれ形配置",
    signature: "C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "天然ガスに含まれる第2の炭化水素で、プラスチック原料であるエチレンの供給源だ。中央のC-C単結合は軸回転でき、電子雲の反発を避けるためプロペラのようにねじれて安定する。",
    model3D: {
      atoms: [
        { type: "C", x: -0.77, y: 0.00, z: 0.00 },
        { type: "C", x: 0.77, y: 0.00, z: 0.00 },
        { type: "H", x: -1.16, y: -1.02, z: 0.00 },
        { type: "H", x: -1.16, y: 0.51, z: 0.88 },
        { type: "H", x: -1.16, y: 0.51, z: -0.88 },
        { type: "H", x: 1.16, y: 1.02, z: 0.00 },
        { type: "H", x: 1.16, y: -0.51, z: -0.88 },
        { type: "H", x: 1.16, y: -0.51, z: 0.88 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "C2H4",
    formula: "C2H4",
    name: "エチレン (Ethylene)",
    geometry: "同一平面構造 (結合角 120度)",
    signature: "C(C-2,H-1,H-1)|C(C-2,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "ポリエチレンなど現代のプラスチック製品の出発点となる有機化学の主役だ。植物自身が分泌する成熟ホルモンでもあり、青果物の追熟を促す働きを持つ。",
    model3D: {
      atoms: [
        { type: "C", x: -0.67, y: 0.00, z: 0.00 },
        { type: "C", x: 0.67, y: 0.00, z: 0.00 },
        { type: "H", x: -1.23, y: -0.93, z: 0.00 },
        { type: "H", x: -1.23, y: 0.93, z: 0.00 },
        { type: "H", x: 1.23, y: -0.93, z: 0.00 },
        { type: "H", x: 1.23, y: 0.93, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 }
      ]
    }
  },
  {
    id: "C2H2",
    formula: "C2H2",
    name: "アセチレン (Acetylene)",
    geometry: "直線形三重結合構造 (結合角 180度)",
    signature: "C(C-3,H-1)|C(C-3,H-1)|H(C-1)|H(C-1)",
    desc: "酸素と混ぜて燃焼させると3000度を超える高温炎を生むため、金属の溶接や切断に欠かせない。高密度な三重結合の電子雲には膨大な化学エネルギーが蓄えられている。",
    model3D: {
      atoms: [
        { type: "C", x: -0.60, y: 0.00, z: 0.00 },
        { type: "C", x: 0.60, y: 0.00, z: 0.00 },
        { type: "H", x: -1.66, y: 0.00, z: 0.00 },
        { type: "H", x: 1.66, y: 0.00, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 3 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 }
      ]
    }
  },
  {
    id: "C2H5OH",
    formula: "C2H5OH",
    name: "エタノール (Ethanol)",
    geometry: "四面体鎖 ＋ ヒドロキシ基(-OH)",
    signature: "C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)",
    desc: "消毒剤、溶媒、燃料、そして酒類の成分として古来より人類と密接に関わってきた分子だ。油になじむ炭素鎖と水になじむ-OH基を併せ持つため、水と油の双方に溶ける。",
    model3D: {
      atoms: [
        { type: "C", x: -1.20, y: 0.25, z: 0.00 },
        { type: "C", x: 0.25, y: -0.22, z: 0.00 },
        { type: "O", x: 1.15, y: 0.88, z: 0.00 },
        { type: "H", x: -1.85, y: -0.63, z: 0.00 },
        { type: "H", x: -1.40, y: 0.85, z: 0.89 },
        { type: "H", x: -1.40, y: 0.85, z: -0.89 },
        { type: "H", x: 0.43, y: -0.83, z: 0.89 },
        { type: "H", x: 0.43, y: -0.83, z: -0.89 },
        { type: "H", x: 2.04, y: 0.52, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 2, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "N_BUTANE",
    formula: "C4H10",
    name: "ノルマルブタン (n-Butane)",
    geometry: "直鎖ジグザグ炭素骨格 (構造異性体A)",
    signature: "C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "カセットコンロやライターの燃料として身近な炭化水素だ。わずかな加圧で簡単に液化するため携帯性に優れ、表面積が広い直鎖構造ゆえに枝分かれしたイソブタンより沸点が高い。",
    model3D: {
      atoms: [
        { type: "C", x: -1.90, y: 0.35, z: 0.00 },
        { type: "C", x: -0.63, y: -0.35, z: 0.00 },
        { type: "C", x: 0.63, y: 0.35, z: 0.00 },
        { type: "C", x: 1.90, y: -0.35, z: 0.00 },
        { type: "H", x: -2.78, y: -0.29, z: 0.00 },
        { type: "H", x: -1.95, y: 0.98, z: 0.89 },
        { type: "H", x: -1.95, y: 0.98, z: -0.89 },
        { type: "H", x: -0.63, y: -0.98, z: 0.89 },
        { type: "H", x: -0.63, y: -0.98, z: -0.89 },
        { type: "H", x: 0.63, y: 0.98, z: 0.89 },
        { type: "H", x: 0.63, y: 0.98, z: -0.89 },
        { type: "H", x: 2.78, y: 0.29, z: 0.00 },
        { type: "H", x: 1.95, y: -0.98, z: 0.89 },
        { type: "H", x: 1.95, y: -0.98, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }, { from: 0, to: 5, order: 1 }, { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 }, { from: 1, to: 8, order: 1 },
        { from: 2, to: 9, order: 1 }, { from: 2, to: 10, order: 1 },
        { from: 3, to: 11, order: 1 }, { from: 3, to: 12, order: 1 }, { from: 3, to: 13, order: 1 }
      ]
    }
  },
  {
    id: "ISOBUTANE",
    formula: "C4H10",
    name: "イソブタン / 2-メチルプロパン (Isobutane)",
    geometry: "枝分かれ四面体骨格 (構造異性体B)",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "冷蔵庫の冷媒や寒冷地向けアウトドア燃料に重宝される構造異性体だ。球状にコンパクトにまとまっているため分子同士が絡みにくく、氷点下でも気化しやすい性質を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: -0.25, z: 0.00 },
        { type: "C", x: 1.42, y: 0.22, z: 0.00 },
        { type: "C", x: -0.71, y: 0.22, z: 1.23 },
        { type: "C", x: -0.71, y: 0.22, z: -1.23 },
        { type: "H", x: 0.00, y: -1.34, z: 0.00 },
        { type: "H", x: 2.12, y: -0.61, z: 0.00 },
        { type: "H", x: 1.61, y: 0.83, z: 0.89 },
        { type: "H", x: 1.61, y: 0.83, z: -0.89 },
        { type: "H", x: -1.78, y: -0.01, z: 1.15 },
        { type: "H", x: -0.58, y: 1.30, z: 1.35 },
        { type: "H", x: -0.32, y: -0.27, z: 2.12 },
        { type: "H", x: -1.78, y: -0.01, z: -1.15 },
        { type: "H", x: -0.58, y: 1.30, z: -1.35 },
        { type: "H", x: -0.32, y: -0.27, z: -2.12 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 }, { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 }, { from: 1, to: 6, order: 1 }, { from: 1, to: 7, order: 1 },
        { from: 2, to: 8, order: 1 }, { from: 2, to: 9, order: 1 }, { from: 2, to: 10, order: 1 },
        { from: 3, to: 11, order: 1 }, { from: 3, to: 12, order: 1 }, { from: 3, to: 13, order: 1 }
      ]
    }
  },
  {
    id: "CH3OCH3",
    formula: "C2H6O",
    name: "ジメチルエーテル (Dimethyl Ether)",
    geometry: "折れ線形エーテル結合 C-O-C (エタノールの構造異性体)",
    signature: "C(H-1,H-1,H-1,O-1)|C(H-1,H-1,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|O(C-1,C-1)",
    desc: "黒煙を出さずにクリーンに燃焼する次世代ディーゼル代替燃料として注目されている。エタノールと全く同じ原子数でありながら、水素結合を作らないため常温では気体として振る舞う。",
    model3D: {
      atoms: [
        { type: "O", x: 0.00, y: -0.35, z: 0.00 },
        { type: "C", x: -1.16, y: 0.35, z: 0.00 },
        { type: "C", x: 1.16, y: 0.35, z: 0.00 },
        { type: "H", x: -2.04, y: -0.30, z: 0.00 },
        { type: "H", x: -1.18, y: 0.99, z: 0.89 },
        { type: "H", x: -1.18, y: 0.99, z: -0.89 },
        { type: "H", x: 2.04, y: -0.30, z: 0.00 },
        { type: "H", x: 1.18, y: 0.99, z: 0.89 },
        { type: "H", x: 1.18, y: 0.99, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 }, { from: 1, to: 4, order: 1 }, { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 }, { from: 2, to: 7, order: 1 }, { from: 2, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "C3H6_PROPENE",
    formula: "C3H6",
    name: "プロペン (Propene)",
    geometry: "二重結合を含む鎖状不飽和炭化水素 (構造異性体A)",
    signature: "C(C-1,C-2,H-1)|C(C-1,H-1,H-1,H-1)|C(C-2,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "自動車部品や食品容器に使われるポリプロピレンの原料だ。1つの二重結合を持つだけで反応性が飛躍的に高まり、分子同士が連鎖的に繋がって強靭な高分子へと姿を変える。",
    model3D: {
      atoms: [
        { type: "C", x: -1.25, y: -0.25, z: 0.00 },
        { type: "C", x: 0.00, y: 0.35, z: 0.00 },
        { type: "C", x: 1.28, y: -0.35, z: 0.00 },
        { type: "H", x: -2.15, y: 0.35, z: 0.00 },
        { type: "H", x: -1.35, y: -1.33, z: 0.00 },
        { type: "H", x: 0.05, y: 1.43, z: 0.00 },
        { type: "H", x: 2.15, y: 0.30, z: 0.00 },
        { type: "H", x: 1.33, y: -0.99, z: 0.89 },
        { type: "H", x: 1.33, y: -0.99, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 }, { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 }, { from: 2, to: 7, order: 1 }, { from: 2, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "C3H6_CYCLOPROPANE",
    formula: "C3H6",
    name: "シクロプロパン (Cyclopropane)",
    geometry: "正三角形の炭素三員環構造 (構造異性体B)",
    signature: "C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "かつて吸入麻酔薬として医療現場で使われた環状分子だ。本来の結合角109.5度を無理やり60度の正三角形に押し込めているため、結合がバナナのように外へ湾曲し大きな歪みエネルギーを抱えている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: -0.87, z: 0.00 },
        { type: "C", x: -0.76, y: 0.44, z: 0.00 },
        { type: "C", x: 0.76, y: 0.44, z: 0.00 },
        { type: "H", x: 0.00, y: -1.45, z: 0.91 },
        { type: "H", x: 0.00, y: -1.45, z: -0.91 },
        { type: "H", x: -1.26, y: 0.73, z: 0.91 },
        { type: "H", x: -1.26, y: 0.73, z: -0.91 },
        { type: "H", x: 1.26, y: 0.73, z: 0.91 },
        { type: "H", x: 1.26, y: 0.73, z: -0.91 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 0, order: 1 },
        { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 }, { from: 1, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 }, { from: 2, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "HF",
    formula: "HF",
    name: "フッ化水素 (Hydrogen Fluoride)",
    geometry: "直線形二原子分子 (極限極性結合)",
    signature: "F(H-1)|H(F-1)",
    desc: "半導体製造の微細エッチングやフッ素樹脂の合成に不可欠な工業物質だ。全元素で最大の電気陰性度3.98を持つフッ素が電子を独占するうえ、ガラスすら溶かす特異な反応性を示す。",
    model3D: {
      atoms: [
        { type: "F", x: -0.46, y: 0.00, z: 0.00 },
        { type: "H", x: 0.46, y: 0.00, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }
      ]
    }
  },
  {
    id: "HCL",
    formula: "HCl",
    name: "塩化水素 (Hydrogen Chloride)",
    geometry: "直線形二原子分子 (強極性共有結合)",
    signature: "Cl(H-1)|H(Cl-1)",
    desc: "水に溶けて塩酸となり、金属精錬から医薬品合成まであらゆる化学工業を支える基礎酸だ。実は我々の胃液にも含まれており、食物の消化と殺菌を担う重要な生体防御因子でもある。",
    model3D: {
      atoms: [
        { type: "Cl", x: -0.63, y: 0.00, z: 0.00 },
        { type: "H", x: 0.64, y: 0.00, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }
      ]
    }
  },
  {
    id: "HBR",
    formula: "HBr",
    name: "臭化水素 (Hydrogen Bromide)",
    geometry: "直線形二原子分子 (N殻ハロゲン結合)",
    signature: "Br(H-1)|H(Br-1)",
    desc: "有機合成において炭素鎖へ臭素を導入する際の重要な試薬であり、難燃剤や医薬中間体の製造に活躍する。N殻まで広がる巨大な臭素の電子雲は、外部の電場に対して柔軟に変形しやすい。",
    model3D: {
      atoms: [
        { type: "Br", x: -0.70, y: 0.00, z: 0.00 },
        { type: "H", x: 0.71, y: 0.00, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }
      ]
    }
  },
  {
    id: "H2S",
    formula: "H2S",
    name: "硫化水素 (Hydrogen Sulfide)",
    geometry: "折れ線形 (結合角 92.1度)",
    signature: "H(S-1)|H(S-1)|S(H-1,H-1)",
    desc: "火山ガスや温泉地特有の腐卵臭の正体であり、金属イオンを沈殿分離する分析化学の定番試薬だ。近年の研究では、人間の体内でも微量に生成されて血圧調節などを担うガス状伝達物質だと判明している。",
    model3D: {
      atoms: [
        { type: "S", x: 0.00, y: -0.22, z: 0.00 },
        { type: "H", x: 0.96, y: 0.45, z: 0.00 },
        { type: "H", x: -0.96, y: 0.45, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 }
      ]
    }
  },
  {
    id: "PH3",
    formula: "PH3",
    name: "ホスフィン (Phosphine)",
    geometry: "三角錐形 (結合角 93.5度)",
    signature: "H(P-1)|H(P-1)|H(P-1)|P(H-1,H-1,H-1)",
    desc: "半導体のシリコン結晶にリンを注入するドーピング工程で不可欠な電子材料ガスだ。地球上では嫌気性微生物や工業プロセスに由来するため、太陽系外惑星における生命存在の指標分子としても注目されている。",
    model3D: {
      atoms: [
        { type: "P", x: 0.00, y: -0.28, z: 0.00 },
        { type: "H", x: 1.18, y: 0.25, z: 0.00 },
        { type: "H", x: -0.59, y: 0.25, z: 1.02 },
        { type: "H", x: -0.59, y: 0.25, z: -1.02 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }
      ]
    }
  },
  {
    id: "CF4",
    formula: "CF4",
    name: "四フッ化炭素 (Carbon Tetrafluoride)",
    geometry: "正四面体構造 (対称無極性分子)",
    signature: "C(F-1,F-1,F-1,F-1)|F(C-1)|F(C-1)|F(C-1)|F(C-1)",
    desc: "極めて強固なC-F結合で鎧われた化学的に不活性なガスで、半導体ウエハのプラズマ洗浄に欠かせない。あまりに安定すぎるため大気中での寿命は約5万年に達し、地球上で最も分解されにくい分子の一つだ。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.00, z: 0.00 },
        { type: "F", x: 0.76, y: 0.76, z: 0.76 },
        { type: "F", x: -0.76, y: -0.76, z: 0.76 },
        { type: "F", x: -0.76, y: 0.76, z: -0.76 },
        { type: "F", x: 0.76, y: -0.76, z: -0.76 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }
      ]
    }
  },
  {
    id: "CH3CL",
    formula: "CH3Cl",
    name: "クロロメタン (Chloromethane)",
    geometry: "歪んだ四面体構造 (非対称極性分子)",
    signature: "C(Cl-1,H-1,H-1,H-1)|Cl(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "シリコーン樹脂や医薬品のメチル化剤として重宝される工業原料だ。かつては冷蔵庫の冷媒として広く使われていたほか、海洋の藻類や森林火災からも自然に放出されている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.20, z: 0.00 },
        { type: "Cl", x: 0.00, y: -1.58, z: 0.00 },
        { type: "H", x: 1.03, y: 0.56, z: 0.00 },
        { type: "H", x: -0.51, y: 0.56, z: 0.89 },
        { type: "H", x: -0.51, y: 0.56, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }
      ]
    }
  },
  {
    id: "PCL3",
    formula: "PCl3",
    name: "三塩化リン (Phosphorus Trichloride)",
    geometry: "三角錐形 (結合角 100.3度)",
    signature: "Cl(P-1)|Cl(P-1)|Cl(P-1)|P(Cl-1,Cl-1,Cl-1)",
    desc: "除草剤、難燃剤、可塑剤など多様なリン化合物を生み出す化学工業の要だ。頂点に非共有電子対を持つ三角錐構造をしており、水と出会うと激しく反応して亜リン酸と塩化水素へ分解する。",
    model3D: {
      atoms: [
        { type: "P", x: 0.00, y: -0.35, z: 0.00 },
        { type: "Cl", x: 1.62, y: 0.30, z: 0.00 },
        { type: "Cl", x: -0.81, y: 0.30, z: 1.40 },
        { type: "Cl", x: -0.81, y: 0.30, z: -1.40 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }
      ]
    }
  },
  {
    id: "CH3OH",
    formula: "CH3OH",
    name: "メタノール (Methanol)",
    geometry: "四面体メチル基 ＋ ヒドロキシ基(-OH)",
    signature: "C(H-1,H-1,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)",
    desc: "ホルムアルデヒドや酢酸の原料であり、次世代のクリーン燃料や燃料電池の水素キャリアとしても期待されている。木材の乾留から得られた歴史から「木精」とも呼ばれ、エタノールと異なり強い視覚毒性を有する。",
    model3D: {
      atoms: [
        { type: "C", x: -0.71, y: 0.05, z: 0.00 },
        { type: "O", x: 0.68, y: -0.22, z: 0.00 },
        { type: "H", x: -1.12, y: -0.96, z: 0.00 },
        { type: "H", x: -1.04, y: 0.58, z: 0.89 },
        { type: "H", x: -1.04, y: 0.58, z: -0.89 },
        { type: "H", x: 1.14, y: 0.63, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 }
      ]
    }
  },
  {
    id: "HCOOH",
    formula: "HCOOH",
    name: "ギ酸 (Formic Acid)",
    geometry: "平面カルボキシ基 (-COOH)",
    signature: "C(H-1,O-1,O-2)|H(C-1)|H(O-1)|O(C-1,H-1)|O(C-2)",
    desc: "皮革のなめしや繊維の染色、さらには次世代の水素貯蔵媒体として研究される最小のカルボン酸だ。名前の由来はアリの毒腺から最初に単離されたことにあり、ハチやイラクサの防衛物質としても使われている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.08, z: 0.00 },
        { type: "O", x: -1.08, y: -0.46, z: 0.00 },
        { type: "O", x: 1.12, y: -0.62, z: 0.00 },
        { type: "H", x: 0.08, y: 1.17, z: 0.00 },
        { type: "H", x: 1.88, y: -0.02, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 }
      ]
    }
  },
  {
    id: "CH3COOH",
    formula: "CH3COOH",
    name: "酢酸 (Acetic Acid)",
    geometry: "四面体メチル基 ＋ 平面カルボキシ基",
    signature: "C(C-1,H-1,H-1,H-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)|O(C-2)",
    desc: "食酢の酸味の本体であり、繊維やペットボトル原料など工業的にも不可欠なカルボン酸だ。純度100%に近いものは16.7度で氷のように結晶化するため、古来より「氷酢酸」と呼ばれて区別されてきた。",
    model3D: {
      atoms: [
        { type: "C", x: -1.18, y: 0.12, z: 0.00 },
        { type: "C", x: 0.28, y: -0.15, z: 0.00 },
        { type: "O", x: 0.78, y: -1.26, z: 0.00 },
        { type: "O", x: 1.05, y: 0.96, z: 0.00 },
        { type: "H", x: -1.75, y: -0.81, z: 0.00 },
        { type: "H", x: -1.45, y: 0.70, z: 0.89 },
        { type: "H", x: -1.45, y: 0.70, z: -0.89 },
        { type: "H", x: 1.98, y: 0.68, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 1, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "CH3COCH3",
    formula: "C3H6O",
    name: "アセトン (Acetone)",
    geometry: "平面ケトン骨格 (C-CO-C)",
    signature: "C(C-1,C-1,O-2)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|O(C-2)",
    desc: "実験器具の洗浄から除光液、樹脂製造まで幅広く活躍する万能有機溶媒だ。中央のC=O基の強い極性と両端のメチル基の親油性により、水とも油とも自在に混ざり合う稀有な溶解力を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: -0.15, z: 0.00 },
        { type: "O", x: 0.00, y: -1.37, z: 0.00 },
        { type: "C", x: -1.28, y: 0.64, z: 0.00 },
        { type: "C", x: 1.28, y: 0.64, z: 0.00 },
        { type: "H", x: -2.15, y: -0.02, z: 0.00 },
        { type: "H", x: -1.32, y: 1.28, z: 0.89 },
        { type: "H", x: -1.32, y: 1.28, z: -0.89 },
        { type: "H", x: 2.15, y: -0.02, z: 0.00 },
        { type: "H", x: 1.32, y: 1.28, z: 0.89 },
        { type: "H", x: 1.32, y: 1.28, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 }, { from: 2, to: 5, order: 1 }, { from: 2, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 }, { from: 3, to: 8, order: 1 }, { from: 3, to: 9, order: 1 }
      ]
    }
  },
  {
    id: "UREA",
    formula: "CH4N2O",
    name: "尿素 (Urea)",
    geometry: "平面ジアミド構造 (CO(NH2)2)",
    signature: "C(N-1,N-1,O-2)|H(N-1)|H(N-1)|H(N-1)|H(N-1)|N(C-1,H-1,H-1)|N(C-1,H-1,H-1)|O(C-2)",
    desc: "窒素肥料や保湿クリーム、さらにはディーゼル車の排ガス浄化剤として現代社会を支える分子だ。1828年に無機物から初めて人工合成されたことで「有機物は生命力なしには作れない」という当時の常識を打ち砕いた。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: -0.10, z: 0.00 },
        { type: "O", x: 0.00, y: -1.32, z: 0.00 },
        { type: "N", x: -1.18, y: 0.62, z: 0.00 },
        { type: "N", x: 1.18, y: 0.62, z: 0.00 },
        { type: "H", x: -2.04, y: 0.10, z: 0.00 },
        { type: "H", x: -1.18, y: 1.63, z: 0.00 },
        { type: "H", x: 2.04, y: 0.10, z: 0.00 },
        { type: "H", x: 1.18, y: 1.63, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 }, { from: 2, to: 5, order: 1 },
        { from: 3, to: 6, order: 1 }, { from: 3, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "GLYCINE",
    formula: "C2H5NO2",
    name: "グリシン (Glycine)",
    geometry: "最も単純なアミノ酸 (H2N-CH2-COOH)",
    signature: "C(C-1,H-1,H-1,N-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|H(O-1)|N(C-1,H-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "コラーゲンの約3分の1を占め、睡眠の質を高める機能性成分としても知られる最小のアミノ酸だ。20種の標準アミノ酸の中で唯一光学異性体を持たず、隕石や彗星の塵からも発見されている宇宙最古級の生命分子である。",
    model3D: {
      atoms: [
        { type: "C", x: -0.45, y: 0.15, z: 0.00 },
        { type: "C", x: 0.98, y: -0.25, z: 0.00 },
        { type: "N", x: -1.35, y: -0.98, z: 0.00 },
        { type: "O", x: 1.38, y: -1.40, z: 0.00 },
        { type: "O", x: 1.82, y: 0.80, z: 0.00 },
        { type: "H", x: -0.62, y: 0.78, z: 0.89 },
        { type: "H", x: -0.62, y: 0.78, z: -0.89 },
        { type: "H", x: -2.30, y: -0.65, z: 0.00 },
        { type: "H", x: -1.18, y: -1.55, z: 0.82 },
        { type: "H", x: 2.72, y: 0.45, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 2 },
        { from: 1, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 }, { from: 0, to: 6, order: 1 },
        { from: 2, to: 7, order: 1 }, { from: 2, to: 8, order: 1 },
        { from: 4, to: 9, order: 1 }
      ]
    }
  },
  {
    id: "CH3NH2",
    formula: "CH5N",
    name: "メチルアミン (Methylamine)",
    geometry: "四面体メチル基 ＋ 三角錐アミノ基",
    signature: "C(H-1,H-1,H-1,N-1)|H(C-1)|H(C-1)|H(C-1)|H(N-1)|H(N-1)|N(C-1,H-1,H-1)",
    desc: "医薬品や農薬、界面活性剤の合成に欠かせない最も単純な第一級アミンだ。電子供与性のメチル基が窒素の非共有電子対を押し出すため、アンモニアよりもさらに強い塩基性を発揮する。",
    model3D: {
      atoms: [
        { type: "C", x: -0.72, y: 0.05, z: 0.00 },
        { type: "N", x: 0.72, y: -0.15, z: 0.00 },
        { type: "H", x: -1.15, y: -0.95, z: 0.00 },
        { type: "H", x: -1.05, y: 0.58, z: 0.89 },
        { type: "H", x: -1.05, y: 0.58, z: -0.89 },
        { type: "H", x: 1.15, y: 0.35, z: 0.82 },
        { type: "H", x: 1.15, y: 0.35, z: -0.82 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 }, { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 }, { from: 1, to: 6, order: 1 }
      ]
    }
  },
  {
    id: "H2O2",
    formula: "H2O2",
    name: "過酸化水素 (Hydrogen Peroxide)",
    geometry: "開いた本のようなねじれ二面角構造 (約111度)",
    signature: "H(O-1)|H(O-1)|O(H-1,O-1)|O(H-1,O-1)",
    desc: "傷口の消毒や漂白剤として身近であり、分解後に水と酸素しか残さないクリーンな酸化剤だ。中央のO-O結合は146kJ/molと非常に弱く、ロケットの推進剤としても利用されるほどのエネルギーを秘めている。",
    model3D: {
      atoms: [
        { type: "O", x: -0.73, y: 0.00, z: 0.00 },
        { type: "O", x: 0.73, y: 0.00, z: 0.00 },
        { type: "H", x: -0.98, y: 0.92, z: 0.15 },
        { type: "H", x: 0.98, y: -0.35, z: -0.88 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 }
      ]
    }
  },
  {
    id: "CS2",
    formula: "CS2",
    name: "二硫化炭素 (Carbon Disulfide)",
    geometry: "直線形二重結合構造 (結合角 180.0度)",
    signature: "C(S-2,S-2)|S(C-2)|S(C-2)",
    desc: "レーヨン繊維やセロファンの製造、さらに光学ガラスの屈折率測定用液体として重宝される無極性溶媒だ。硫黄やリン、ヨウ素といった単体元素を驚くほどよく溶かす特殊な溶解特性を備えている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.00, z: 0.00 },
        { type: "S", x: -1.55, y: 0.00, z: 0.00 },
        { type: "S", x: 1.55, y: 0.00, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 }
      ]
    }
  },
  {
    id: "CH3SCH3",
    formula: "C2H6S",
    name: "ジメチルスルフィド (Dimethyl Sulfide)",
    geometry: "折れ線形チオエーテル結合 C-S-C",
    signature: "C(H-1,H-1,H-1,S-1)|C(H-1,H-1,H-1,S-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|S(C-1,C-1)",
    desc: "海辺の「磯の香り」やトウモロコシの風味を構成する主要な揮発性硫黄化合物だ。海洋の植物プランクトンが大量に放出しており、大気中で酸化されて雲の核となることで地球の気候調節にも一役買っている。",
    model3D: {
      atoms: [
        { type: "S", x: 0.00, y: -0.42, z: 0.00 },
        { type: "C", x: -1.38, y: 0.48, z: 0.00 },
        { type: "C", x: 1.38, y: 0.48, z: 0.00 },
        { type: "H", x: -2.28, y: -0.14, z: 0.00 },
        { type: "H", x: -1.38, y: 1.12, z: 0.89 },
        { type: "H", x: -1.38, y: 1.12, z: -0.89 },
        { type: "H", x: 2.28, y: -0.14, z: 0.00 },
        { type: "H", x: 1.38, y: 1.12, z: 0.89 },
        { type: "H", x: 1.38, y: 1.12, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 }, { from: 1, to: 4, order: 1 }, { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 }, { from: 2, to: 7, order: 1 }, { from: 2, to: 8, order: 1 }
      ]
    }
  },
  {
    id: "CH2CL2",
    formula: "CH2Cl2",
    name: "ジクロロメタン (Dichloromethane)",
    geometry: "歪んだ四面体構造 (極性ハロゲン化アルキル)",
    signature: "C(Cl-1,Cl-1,H-1,H-1)|Cl(C-1)|Cl(C-1)|H(C-1)|H(C-1)",
    desc: "医薬品精製や塗料剥離剤として重宝される低沸点溶媒だ。水より重く燃えにくい性質を持ち、かつてはコーヒー豆からカフェインだけを抽出するデカフェ処理にも利用されていた。",
    model3D: {
      atoms: [
        { type: "C", x: 0.00, y: 0.15, z: 0.00 },
        { type: "Cl", x: 1.45, y: -0.82, z: 0.00 },
        { type: "Cl", x: -1.45, y: -0.82, z: 0.00 },
        { type: "H", x: 0.00, y: 0.80, z: 0.89 },
        { type: "H", x: 0.00, y: 0.80, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }
      ]
    }
  },
  {
    id: "C2H5F",
    formula: "C2H5F",
    name: "フルオロエタン (Fluoroethane)",
    geometry: "ねじれ形四面体鎖 (C-F強極性結合)",
    signature: "C(C-1,F-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|F(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "オゾン層を破壊しない冷媒や発泡剤として開発されたフッ化アルキルだ。水素とほぼ同じ大きさのフッ素が1つ置換するだけで、代謝分解されにくくなり創薬化学でも重要な設計手法となっている。",
    model3D: {
      atoms: [
        { type: "C", x: -0.95, y: 0.22, z: 0.00 },
        { type: "C", x: 0.48, y: -0.25, z: 0.00 },
        { type: "F", x: 1.32, y: 0.82, z: 0.00 },
        { type: "H", x: -1.62, y: -0.64, z: 0.00 },
        { type: "H", x: -1.15, y: 0.82, z: 0.89 },
        { type: "H", x: -1.15, y: 0.82, z: -0.89 },
        { type: "H", x: 0.65, y: -0.86, z: 0.89 },
        { type: "H", x: 0.65, y: -0.86, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 }, { from: 0, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 }, { from: 1, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "C2H5BR",
    formula: "C2H5Br",
    name: "ブロモエタン (Bromoethane)",
    geometry: "ねじれ形四面体鎖 (N殻臭素置換体)",
    signature: "Br(C-1)|C(Br-1,C-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)",
    desc: "有機合成において分子骨格へエチル基(-C2H5)を自在に導入するための定番試薬だ。臭素は脱離能に優れているため反応の足がかりとして優秀で、医薬品や香料の合成経路で頻繁に活躍する。",
    model3D: {
      atoms: [
        { type: "C", x: -1.15, y: 0.25, z: 0.00 },
        { type: "C", x: 0.28, y: -0.22, z: 0.00 },
        { type: "Br", x: 1.52, y: 1.25, z: 0.00 },
        { type: "H", x: -1.82, y: -0.61, z: 0.00 },
        { type: "H", x: -1.35, y: 0.85, z: 0.89 },
        { type: "H", x: -1.35, y: 0.85, z: -0.89 },
        { type: "H", x: 0.45, y: -0.83, z: 0.89 },
        { type: "H", x: 0.45, y: -0.83, z: -0.89 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 }, { from: 0, to: 5, order: 1 },
    { from: 1, to: 6, order: 1 }, { from: 1, to: 7, order: 1 }
      ]
    }
  },
  {
    id: "LACTIC_ACID",
    formula: "C3H6O3",
    name: "乳酸 (Lactic Acid)",
    geometry: "キラル中心を持つ不斉炭素骨格",
    signature: "C(C-1,H-1,H-1,H-1)|C(C-1,C-1,H-1,O-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "ヨーグルトの酸味成分であり、激しい運動時に人間の筋肉内でも生成されるエネルギー代謝の産物だ。中央の炭素は4つの異なるパーツ（-H, -OH, -CH3, -COOH）と結ばれた「不斉炭素原子」であり、右手と左手のような光学異性体を持つ。",
    model3D: {
      atoms: [
        { type: "C", x: -0.06, y: -0.22, z: 0.28 },
        { type: "C", x: -1.41, y: 0.44, z: -0.05 },
        { type: "C", x: 1.15, y: 0.58, z: -0.19 },
        { type: "O", x: 0.05, y: -1.44, z: -0.46 },
        { type: "O", x: 2.30, y: 0.21, z: 0.21 },
        { type: "O", x: 0.98, y: 1.54, z: -0.89 },
        { type: "H", x: -0.05, y: -0.45, z: 1.35 },
        { type: "H", x: -1.42, y: 1.39, z: 0.48 },
        { type: "H", x: -1.53, y: 0.65, z: -1.11 },
        { type: "H", x: -2.25, y: -0.19, z: 0.23 },
        { type: "H", x: 0.93, y: -1.78, z: -0.43 },
        { type: "H", x: 3.01, y: 0.77, z: -0.08 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }, { from: 2, to: 4, order: 1 }, { from: 2, to: 5, order: 2 },
        { from: 0, to: 6, order: 1 }, { from: 1, to: 7, order: 1 }, { from: 1, to: 8, order: 1 },
        { from: 1, to: 9, order: 1 }, { from: 3, to: 10, order: 1 }, { from: 4, to: 11, order: 1 }
      ]
    }
  },
{
    id: "VANILLIN",
    formula: "C8H8O3",
    name: "バニリン (Vanillin)",
    geometry: "三置換ベンゼン環平面構造",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,C-2,O-1)|C(C-1,H-1,O-2)|C(H-1,H-1,H-1,O-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,C-1)|O(C-1,H-1)|O(C-2)",
    desc: "バニラビーンズの甘い香りの正体だ。強固なベンゼン環（フェニル基）をベースに、アルデヒド基（-CHO）、ヒドロキシ基（-OH）、メトキシ基（-OCH3）という3種類の異なる官能基が絶妙なバランスで配置されている。",
    model3D: {
      atoms: [
        { type: "C", x: 0.05, y: -0.32, z: 0.00 },
        { type: "C", x: -0.73, y: -1.48, z: 0.00 },
        { type: "C", x: -2.12, y: -1.33, z: 0.00 },
        { type: "C", x: -2.71, y: -0.05, z: 0.00 },
        { type: "C", x: -1.94, y: 1.11, z: 0.00 },
        { type: "C", x: -0.56, y: 0.98, z: 0.00 },
        { type: "C", x: 1.54, y: -0.52, z: 0.00 },
        { type: "O", x: 0.17, y: 2.15, z: 0.00 },
        { type: "O", x: -4.06, y: 0.07, z: 0.00 },
        { type: "O", x: 2.21, y: -1.53, z: 0.00 },
        { type: "C", x: 1.59, y: 2.10, z: 0.00 },
        { type: "H", x: -0.28, y: -2.46, z: 0.00 },
        { type: "H", x: -2.74, y: -2.21, z: 0.00 },
        { type: "H", x: -2.39, y: 2.09, z: 0.00 },
        { type: "H", x: 1.99, y: 0.49, z: 0.00 },
        { type: "H", x: -4.37, y: 0.98, z: 0.00 },
        { type: "H", x: 1.96, y: 1.58, z: -0.89 },
        { type: "H", x: 1.96, y: 1.58, z: 0.89 },
        { type: "H", x: 1.95, y: 3.12, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 }, { from: 4, to: 5, order: 2 }, { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 }, { from: 5, to: 7, order: 1 }, { from: 3, to: 8, order: 1 },
        { from: 6, to: 9, order: 2 }, { from: 7, to: 10, order: 1 },
        { from: 1, to: 11, order: 1 }, { from: 2, to: 12, order: 1 }, { from: 4, to: 13, order: 1 },
        { from: 6, to: 14, order: 1 }, { from: 8, to: 15, order: 1 },
        { from: 10, to: 16, order: 1 }, { from: 10, to: 17, order: 1 }, { from: 10, to: 18, order: 1 }
      ]
    }
  },
  {
    id: "SALICYLIC_ACID",
    formula: "C7H6O3",
    name: "サリチル酸 (Salicylic Acid)",
    geometry: "分子内水素結合を形成する芳香族化合物",
    signature: "C(C-1,C-1,C-2)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,H-1)|C(C-1,C-2,O-1)|C(C-1,O-1,O-2)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|H(O-1)|O(C-1,H-1)|O(C-1,H-1)|O(C-2)",
    desc: "ヤナギの樹皮から発見され、古代から鎮痛解熱薬として使われてきた分子だ。隣り合う-OH基と-COOH基の間で強い「分子内水素結合」を形成しており、これが特有の酸性の強さと薬理作用を生み出している。",
    model3D: {
      atoms: [
        { type: "C", x: 0.17, y: 0.44, z: 0.00 },
        { type: "C", x: 0.81, y: -0.79, z: 0.00 },
        { type: "C", x: 0.07, y: -1.97, z: 0.00 },
        { type: "C", x: -1.32, y: -1.91, z: 0.00 },
        { type: "C", x: -1.97, y: -0.69, z: 0.00 },
        { type: "C", x: -1.22, y: 0.48, z: 0.00 },
        { type: "C", x: 0.98, y: 1.70, z: 0.00 },
        { type: "O", x: 2.15, y: -0.91, z: 0.00 },
        { type: "O", x: 2.19, y: 1.63, z: 0.00 },
        { type: "O", x: 0.36, y: 2.89, z: 0.00 },
        { type: "H", x: 0.59, y: -2.92, z: 0.00 },
        { type: "H", x: -1.89, y: -2.83, z: 0.00 },
        { type: "H", x: -3.05, y: -0.66, z: 0.00 },
        { type: "H", x: -1.72, y: 1.44, z: 0.00 },
        { type: "H", x: 2.60, y: -0.06, z: 0.00 },
        { type: "H", x: 0.99, y: 3.61, z: 0.00 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 }, { from: 4, to: 5, order: 2 }, { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 }, { from: 1, to: 7, order: 1 },
        { from: 6, to: 8, order: 2 }, { from: 6, to: 9, order: 1 },
        { from: 2, to: 10, order: 1 }, { from: 3, to: 11, order: 1 },
        { from: 4, to: 12, order: 1 }, { from: 5, to: 13, order: 1 },
        { from: 7, to: 14, order: 1 }, { from: 9, to: 15, order: 1 }
      ]
    }
  },
  {
    id: "MENTHOL",
    formula: "C10H20O",
    name: "メントール (Menthol)",
    geometry: "いす型シクロヘキサン誘導体",
    signature: "C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,C-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,H-1)|C(C-1,C-1,H-1,O-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|C(C-1,H-1,H-1,H-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(C-1)|H(O-1)|O(C-1,H-1)",
    desc: "ハッカやミントの爽快感をもたらす成分だ。シクロヘキサン（六角形の単結合リング）を基本骨格とし、そこにメチル基、イソプロピル基、ヒドロキシ基が立体的に配置された、パズルとして非常に組みがいのある中規模分子である。",
    model3D: {
      atoms: [
        { type: "C", x: 0.12, y: -0.66, z: 0.19 },
        { type: "C", x: 1.10, y: 0.44, z: -0.23 },
        { type: "C", x: 0.45, y: 1.83, z: -0.06 },
        { type: "C", x: -0.89, y: 1.81, z: -0.80 },
        { type: "C", x: -1.86, y: 0.71, z: -0.38 },
        { type: "C", x: -1.22, y: -0.68, z: -0.56 },
        { type: "C", x: 0.77, y: -2.01, z: -0.16 },
        { type: "C", x: -2.85, y: 0.78, z: 0.78 },
        { type: "C", x: -2.31, y: 0.81, z: 2.21 },
        { type: "C", x: -3.95, y: 1.81, z: 0.56 },
        { type: "O", x: 1.40, y: 0.28, z: -1.63 },
        { type: "H", x: 0.00, y: -0.55, z: 1.28 },
        { type: "H", x: 2.05, y: 0.38, z: 0.31 },
        { type: "H", x: 1.15, y: 2.62, z: -0.37 },
        { type: "H", x: 0.28, y: 2.02, z: 1.01 },
        { type: "H", x: -0.72, y: 1.68, z: -1.88 },
        { type: "H", x: -1.33, y: 2.80, z: -0.65 },
        { type: "H", x: -1.05, y: -0.87, z: -1.63 },
        { type: "H", x: -1.93, y: -1.45, z: -0.25 },
        { type: "H", x: 1.76, y: -2.06, z: 0.29 },
        { type: "H", x: 0.16, y: -2.81, z: 0.26 },
        { type: "H", x: 0.88, y: -2.17, z: -1.24 },
        { type: "H", x: -3.28, y: -0.21, z: 0.68 },
        { type: "H", x: -3.05, y: 0.01, z: 2.21 },
        { type: "H", x: -2.78, y: 1.77, z: 2.30 },
        { type: "H", x: -1.45, y: 0.67, z: 2.74 },
        { type: "H", x: -4.75, y: 1.78, z: 1.29 },
        { type: "H", x: -3.56, y: 2.82, z: 0.66 },
        { type: "H", x: -4.39, y: 1.66, z: -0.43 },
        { type: "H", x: 2.22, y: 0.77, z: -1.78 },
        { type: "H", x: -2.41, y: 0.83, z: -1.31 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 }, { from: 4, to: 5, order: 1 }, { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 }, { from: 4, to: 7, order: 1 }, { from: 7, to: 8, order: 1 },
        { from: 7, to: 9, order: 1 }, { from: 1, to: 10, order: 1 },
        { from: 0, to: 11, order: 1 }, { from: 1, to: 12, order: 1 }, { from: 2, to: 13, order: 1 },
        { from: 2, to: 14, order: 1 }, { from: 3, to: 15, order: 1 }, { from: 3, to: 16, order: 1 },
        { from: 5, to: 17, order: 1 }, { from: 5, to: 18, order: 1 }, { from: 6, to: 19, order: 1 },
        { from: 6, to: 20, order: 1 }, { from: 6, to: 21, order: 1 }, { from: 7, to: 22, order: 1 },
        { from: 8, to: 23, order: 1 }, { from: 8, to: 24, order: 1 }, { from: 8, to: 25, order: 1 },
        { from: 9, to: 26, order: 1 }, { from: 9, to: 27, order: 1 }, { from: 9, to: 28, order: 1 },
        { from: 10, to: 29, order: 1 }, { from: 4, to: 30, order: 1 }
      ]
    }
  },
 ];

// 重複分子の自動クリーンアップ（検証済みの新規データを優先して保持）
(function deduplicateMoleculeDB() {
  if (typeof MOLECULE_DB === "undefined" || !Array.isArray(MOLECULE_DB)) return;
  const seenKeys = new Set();
  for (let i = MOLECULE_DB.length - 1; i >= 0; i--) {
    const mol = MOLECULE_DB[i];
    const key = mol.formula + "::" + mol.name.split(" ")[0];
    if (seenKeys.has(key)) {
      MOLECULE_DB.splice(i, 1);
    } else {
      seenKeys.add(key);
    }
  }
})();






// 量子・物理定数マスタ（インスペクタ詳細解析・多殻描画用）
const QUANTUM_ELEMENT_SPECS = {
  H: {
    z: 1,
    enName: "HYDROGEN",
    atomicMass: "1.008 u",
    shells: "K:1",
    shellCount: 1,
    baseConfig: "1s1",
    valenceElectrons: 1,
    targetOctet: 2,
    covalentRadius: 31,
    vdwRadius: 120,
    paulingEN: 2.20,
    mullikenEN: "7.18 eV",
    ionizationEnergy: 1312.0,
    electronAffinity: 72.8,
    nmrIsotope: "1H (Spin 1/2, 99.98%)",
    cloudColor: "#f8fafc",
    coreColor: "#cbd5e1"
  },
  C: {
    z: 6,
    enName: "CARBON",
    atomicMass: "12.011 u",
    shells: "K:2, L:4",
    shellCount: 2,
    baseConfig: "1s2 2s2 2p2",
    valenceElectrons: 4,
    targetOctet: 8,
    covalentRadius: 76,
    vdwRadius: 170,
    paulingEN: 2.55,
    mullikenEN: "6.27 eV",
    ionizationEnergy: 1086.5,
    electronAffinity: 121.8,
    nmrIsotope: "13C (Spin 1/2, 1.07%)",
    cloudColor: "#38bdf8",
    coreColor: "#64748b"
  },
  N: {
    z: 7,
    enName: "NITROGEN",
    atomicMass: "14.007 u",
    shells: "K:2, L:5",
    shellCount: 2,
    baseConfig: "1s2 2s2 2p3",
    valenceElectrons: 5,
    targetOctet: 8,
    covalentRadius: 71,
    vdwRadius: 155,
    paulingEN: 3.04,
    mullikenEN: "7.30 eV",
    ionizationEnergy: 1402.3,
    electronAffinity: -7.0,
    nmrIsotope: "14N (Spin 1) / 15N (Spin 1/2)",
    cloudColor: "#60a5fa",
    coreColor: "#3b82f6"
  },
  O: {
    z: 8,
    enName: "OXYGEN",
    atomicMass: "15.999 u",
    shells: "K:2, L:6",
    shellCount: 2,
    baseConfig: "1s2 2s2 2p4",
    valenceElectrons: 6,
    targetOctet: 8,
    covalentRadius: 66,
    vdwRadius: 152,
    paulingEN: 3.44,
    mullikenEN: "7.54 eV",
    ionizationEnergy: 1313.9,
    electronAffinity: 141.0,
    nmrIsotope: "17O (Spin 5/2, 0.038%)",
    cloudColor: "#f87171",
    coreColor: "#ef4444"
  },
  F: {
    z: 9,
    enName: "FLUORINE",
    atomicMass: "18.998 u",
    shells: "K:2, L:7",
    shellCount: 2,
    baseConfig: "1s2 2s2 2p5",
    valenceElectrons: 7,
    targetOctet: 8,
    covalentRadius: 64,
    vdwRadius: 147,
    paulingEN: 3.98,
    mullikenEN: "10.41 eV",
    ionizationEnergy: 1681.0,
    electronAffinity: 328.0,
    nmrIsotope: "19F (Spin 1/2, 100%)",
    cloudColor: "#4ade80",
    coreColor: "#22c55e"
  },
  P: {
    z: 15,
    enName: "PHOSPHORUS",
    atomicMass: "30.974 u",
    shells: "K:2, L:8, M:5",
    shellCount: 3,
    baseConfig: "[Ne] 3s2 3p3",
    valenceElectrons: 5,
    targetOctet: 8,
    covalentRadius: 107,
    vdwRadius: 180,
    paulingEN: 2.19,
    mullikenEN: "5.62 eV",
    ionizationEnergy: 1011.8,
    electronAffinity: 72.0,
    nmrIsotope: "31P (Spin 1/2, 100%)",
    cloudColor: "#fb923c",
    coreColor: "#f97316"
  },
  S: {
    z: 16,
    enName: "SULFUR",
    atomicMass: "32.06 u",
    shells: "K:2, L:8, M:6",
    shellCount: 3,
    baseConfig: "[Ne] 3s2 3p4",
    valenceElectrons: 6,
    targetOctet: 8,
    covalentRadius: 105,
    vdwRadius: 180,
    paulingEN: 2.58,
    mullikenEN: "6.22 eV",
    ionizationEnergy: 999.6,
    electronAffinity: 200.4,
    nmrIsotope: "33S (Spin 3/2, 0.75%)",
    cloudColor: "#facc15",
    coreColor: "#eab308"
  },
  Cl: {
    z: 17,
    enName: "CHLORINE",
    atomicMass: "35.45 u",
    shells: "K:2, L:8, M:7",
    shellCount: 3,
    baseConfig: "[Ne] 3s2 3p5",
    valenceElectrons: 7,
    targetOctet: 8,
    covalentRadius: 102,
    vdwRadius: 175,
    paulingEN: 3.16,
    mullikenEN: "8.30 eV",
    ionizationEnergy: 1251.2,
    electronAffinity: 349.0,
    nmrIsotope: "35Cl (75.8%) / 37Cl (24.2%)",
    cloudColor: "#34d399",
    coreColor: "#10b981"
  },
  Br: {
    z: 35,
    enName: "BROMINE",
    atomicMass: "79.904 u",
    shells: "K:2, L:8, M:18, N:7",
    shellCount: 4,
    baseConfig: "[Ar] 3d10 4s2 4p5",
    valenceElectrons: 7,
    targetOctet: 8,
    covalentRadius: 120,
    vdwRadius: 185,
    paulingEN: 2.96,
    mullikenEN: "7.59 eV",
    ionizationEnergy: 1139.9,
    electronAffinity: 324.6,
  nmrIsotope: "79Br (50.7%) / 81Br (49.3%)",
    cloudColor: "#f87171",
    coreColor: "#b91c1c"
  },
  I: {
    z: 53,
    enName: "IODINE",
    atomicMass: "126.90 u",
    shells: "K:2, L:8, M:18, N:18, O:7",
    shellCount: 5,
    baseConfig: "[Kr] 4d10 5s2 5p5",
    valenceElectrons: 7,
    targetOctet: 8,
    covalentRadius: 139,
    vdwRadius: 198,
    paulingEN: 2.66,
    mullikenEN: "6.76 eV",
    ionizationEnergy: 1008.4,
    electronAffinity: 295.2,
    nmrIsotope: "127I (Spin 5/2, 100%)",
    cloudColor: "#c084fc",
    coreColor: "#7e22ce"
  },
  Si: {
    z: 14,
    enName: "SILICON",
    atomicMass: "28.085 u",
    shells: "K:2, L:8, M:4",
    shellCount: 3,
    baseConfig: "[Ne] 3s2 3p2",
    valenceElectrons: 4,
    targetOctet: 8,
    covalentRadius: 111,
    vdwRadius: 210,
    paulingEN: 1.90,
    mullikenEN: "4.77 eV",
    ionizationEnergy: 786.5,
    electronAffinity: 133.6,
    nmrIsotope: "29Si (Spin 1/2, 4.68%)",
    cloudColor: "#fbbf24",
    coreColor: "#b45309"
  },
  B: {
    z: 5,
    enName: "BORON",
    atomicMass: "10.81 u",
    shells: "K:2, L:3",
    shellCount: 2,
    baseConfig: "1s2 2s2 2p1",
    valenceElectrons: 3,
    targetOctet: 6,
    covalentRadius: 84,
    vdwRadius: 192,
    paulingEN: 2.04,
    mullikenEN: "4.29 eV",
    ionizationEnergy: 800.6,
    electronAffinity: 26.7,
    nmrIsotope: "11B (Spin 3/2, 80.1%)",
    cloudColor: "#f472b6",
    coreColor: "#db2777"
  }
};

// 平均結合解離エンタルピー (kJ/mol)
const BOND_ENTHALPY_TABLE = {
  "H-H:1": 436,
  "C-H:1": 413,
  "C-C:1": 348,
  "C-C:2": 614,
  "C-C:3": 839,
  "C-O:1": 358,
  "C-O:2": 799,
  "H-O:1": 463,
  "H-N:1": 391,
  "C-N:1": 305,
  "C-N:2": 615,
  "C-N:3": 891,
  "N-N:1": 163,
  "N-N:2": 418,
  "N-N:3": 945,
  "O-O:1": 146,
  "O-O:2": 498,
  "N-O:1": 201,
  "N-O:2": 607,
  "F-H:1": 568,
  "C-F:1": 485,
  "F-F:1": 159,
  "F-N:1": 272,
  "F-O:1": 190,
  "F-P:1": 490,
  "F-S:1": 327,
  "Cl-H:1": 431,
  "C-Cl:1": 328,
  "Cl-Cl:1": 243,
  "Cl-N:1": 200,
  "Cl-O:1": 203,
  "Cl-P:1": 319,
  "Cl-S:1": 253,
  "Br-H:1": 366,
  "Br-C:1": 276,
  "Br-Br:1": 193,
  "Br-P:1": 264,
  "Br-S:1": 218,
  "H-S:1": 347,
  "C-S:1": 259,
  "C-S:2": 536,
  "S-S:1": 266,
  "H-P:1": 322,
  "C-P:1": 264,
  "P-P:1": 201,
  "O-P:1": 335,
"O-P:2": 544,
  "O-S:1": 265,
  "O-S:2": 523,
  "H-I:1": 299,
  "C-I:1": 213,
  "I-I:1": 151,
  "H-Si:1": 318,
  "C-Si:1": 301,
  "O-Si:1": 452,
  "Si-Si:1": 222,
  "Cl-Si:1": 381,
  "F-Si:1": 565,
  "B-H:1": 389,
  "B-C:1": 372,
  "B-O:1": 536,
"B-F:1": 613,
  "B-Cl:1": 456
};

// 段階アンロック式・官能基ブロック定義（結合線視認性確保のため 2 GRID_PITCH = 64px 基準で配置）
const FUNCTIONAL_BLOCKS = {
  HYDROXYL: {
    id: "HYDROXYL",
    label: "-OH",
    name: "ヒドロキシ基",
    unlockBy: "H2O",
    anchorIndex: 0,
    atoms: [
      { el: "O", gx: 0, gy: 0 },
      { el: "H", gx: 2, gy: 0 }
    ],
    bonds: [
      [0, 1, 1]
    ]
  },
  METHYL: {
    id: "METHYL",
    label: "-CH3",
    name: "メチル基",
    unlockBy: "CH4",
    anchorIndex: 0,
    atoms: [
      { el: "C", gx: 0, gy: 0 },
      { el: "H", gx: 0, gy: -2 },
      { el: "H", gx: 2, gy: 0 },
      { el: "H", gx: 0, gy: 2 }
    ],
  bonds: [
      [0, 1, 1], [0, 2, 1], [0, 3, 1]
    ]
  },
  THIOL: {
    id: "THIOL",
    label: "-SH",
    name: "チオール基",
    unlockBy: "C3H7NO2S",
    anchorIndex: 0,
    atoms: [
      { el: "S", gx: 0, gy: 0 },
      { el: "H", gx: 2, gy: 0 }
    ],
    bonds: [
      [0, 1, 1]
    ]
  },
  ALDEHYDE: {
    id: "ALDEHYDE",
    label: "-CHO",
    name: "アルデヒド基",
    unlockBy: "CH4N2O",
    anchorIndex: 0,
    atoms: [
      { el: "C", gx: 0, gy: 0 },
      { el: "O", gx: 0, gy: -2 },
      { el: "H", gx: 2, gy: 0 }
    ],
    bonds: [
      [0, 1, 2], [0, 2, 1]
    ]
  },






  AMINO: {
    id: "AMINO",
    label: "-NH2",
    name: "アミノ基",
    unlockBy: "NH3",
    anchorIndex: 0,
    atoms: [
      { el: "N", gx: 0, gy: 0 },
      { el: "H", gx: 1, gy: -2 },
      { el: "H", gx: 1, gy: 2 }
    ],
    bonds: [
      [0, 1, 1], [0, 2, 1]
    ]
  },
  ETHYL: {
    id: "ETHYL",
    label: "-C2H5",
    name: "エチル基",
    unlockBy: "C2H6",
    anchorIndex: 0,
    atoms: [
      { el: "C", gx: 0, gy: 0 },
      { el: "H", gx: 0, gy: -2 },
      { el: "H", gx: 0, gy: 2 },
      { el: "C", gx: 2, gy: 0 },
      { el: "H", gx: 2, gy: -2 },
      { el: "H", gx: 2, gy: 2 },
      { el: "H", gx: 4, gy: 0 }
    ],
    bonds: [
      [0, 1, 1], [0, 2, 1], [0, 3, 1],
      [3, 4, 1], [3, 5, 1], [3, 6, 1]
    ]
  },
  CARBOXYL: {
    id: "CARBOXYL",
    label: "-COOH",
    name: "カルボキシ基",
    unlockBy: "HCOOH",
    anchorIndex: 0,
    atoms: [
      { el: "C", gx: 0, gy: 0 },
      { el: "O", gx: 0, gy: -2 },
      { el: "O", gx: 2, gy: 0 },
      { el: "H", gx: 2, gy: 2 }
    ],
    bonds: [
      [0, 1, 2], [0, 2, 1], [2, 3, 1]
    ]
  },
  PHENYL: {
    id: "PHENYL",
    label: "Ph-",
    name: "フェニル基(環)",
    unlockBy: "C3H6_CYCLOPROPANE",
    anchorIndex: 0,
    atoms: [
      { el: "C", gx: 0, gy: 0 },
      { el: "C", gx: 1, gy: -2 },
      { el: "C", gx: 3, gy: -2 },
      { el: "C", gx: 4, gy: 0 },
      { el: "C", gx: 3, gy: 2 },
      { el: "C", gx: 1, gy: 2 },
      { el: "H", gx: 0, gy: -4 },
      { el: "H", gx: 4, gy: -4 },
      { el: "H", gx: 6, gy: 0 },
      { el: "H", gx: 4, gy: 4 },
      { el: "H", gx: 0, gy: 4 }
    ],
    bonds: [
      [0, 1, 2], [1, 2, 1], [2, 3, 2],
      [3, 4, 1], [4, 5, 2], [5, 0, 1],
      [1, 6, 1], [2, 7, 1], [3, 8, 1],
      [4, 9, 1], [5, 10, 1]
    ]
  }
};


// ======================================================================
// 【第3章：状態管理・履歴システム (State & History Management)】
// 配置済み原子(atoms)、結合線(bonds)、履歴スタック、カメラ状態
// ======================================================================
const chemState = {
  atoms: [],
  bonds: [],
 nextAtomId: 1,
  nextBondId: 1,
selectedElements: new Set(),
  carbonMode: "SINGLE",
  elementModes: { C: "SINGLE", O: "SINGLE", N: "SINGLE", S: "SINGLE" },
  selectedBlocks: new Set(),
  unlockedBlocks: new Set(),
  zoom2D: 1.0,
  autoSnap: false,
  isEraseMode: false,  history: [],
  discoveredIds: new Set(),
  lastEvaluation: null,
inspector: {
    targetAtomId: null,
    visible: false,
    deepSpec: true,
    telemetry3D: false,
    animRunning: false
  },

drill: {
    active: false,
    type: "BASIC",
    level: 1,
    marathonCourse: "EVOLUTION",
    marathonIndex: 0,
    currentMission: null,
    showingAnswer: false,
    savedUserBonds: null
  },


  dragState: {
    activeAtomId: null,
    startX: 0,
    startY: 0,
    currX: 0,
    currY: 0,
    hasMoved: false
  }
};



const camera3D = {
  rotX: CHEM_ENV.DEFAULT_ROT_X,
  rotY: CHEM_ENV.DEFAULT_ROT_Y,
  zoom: 1.0,
  orbitRadius: CHEM_ENV.ORBIT_RADIUS_3D,
  autoRotate: false,
  isDragging: false
};

function saveSnapshot() {
  chemState.history.push({
    atoms: JSON.parse(JSON.stringify(chemState.atoms)),
    bonds: JSON.parse(JSON.stringify(chemState.bonds)),
    nextAtomId: chemState.nextAtomId,
    nextBondId: chemState.nextBondId
  });
  if (chemState.history.length > 30) chemState.history.shift();
}

function undoAction() {
  if (chemState.history.length === 0) return;
  const prev = chemState.history.pop();
  chemState.atoms = prev.atoms;
  chemState.bonds = prev.bonds;
  chemState.nextAtomId = prev.nextAtomId;
  chemState.nextBondId = prev.nextBondId;
  refreshSimulation();
}

function clearWorkspace(recordHistory = true) {
  if (recordHistory && chemState.atoms.length > 0) saveSnapshot();
  chemState.atoms.length = 0;
  chemState.bonds.length = 0;
  chemState.nextAtomId = 1;
  chemState.nextBondId = 1;
  refreshSimulation();
}

function snapToGrid(val) {
  return Math.round(val / CHEM_ENV.GRID_PITCH) * CHEM_ENV.GRID_PITCH;
}

function addAtom(type, x, y, recordHistory = true) {
  if (!ELEMENTS[type] || chemState.atoms.length >= CHEM_ENV.MAX_ATOMS) return null;
  if (recordHistory) saveSnapshot();
  const atom = {
    id: `A_${chemState.nextAtomId++}`,
    type,
    x: snapToGrid(x),
    y: snapToGrid(y)
  };
  chemState.atoms.push(atom);
  return atom;
}

function removeAtom(atomId) {
  saveSnapshot();
  chemState.atoms = chemState.atoms.filter(a => a.id !== atomId);
  chemState.bonds = chemState.bonds.filter(b => b.from !== atomId && b.to !== atomId);
}

function addOrCycleBond(fromId, toId) {
  if (fromId === toId) return;
  saveSnapshot();
  const existing = chemState.bonds.find(
    b => (b.from === fromId && b.to === toId) || (b.from === toId && b.to === fromId)
  );
  if (existing) {
    if (existing.order < 3) {
      existing.order += 1;
    } else {
      chemState.bonds = chemState.bonds.filter(b => b !== existing);
    }
    return;
  }
  chemState.bonds.push({
    id: `B_${chemState.nextBondId++}`,
    from: fromId,
    to: toId,
    order: 1
  });
}

function cycleBondByInstance(bond) {
  saveSnapshot();
  if (bond.order < 3) {
    bond.order += 1;
  } else {
    chemState.bonds = chemState.bonds.filter(b => b !== bond);
  }
}

function getRemainingValence(atom) {
  const maxVal = ELEMENTS[atom.type] ? ELEMENTS[atom.type].valence : 0;
  let used = 0;
  chemState.bonds.forEach(b => {
    if (b.from === atom.id || b.to === atom.id) used += (b.order || 1);
  });
  return maxVal - used;
}

function placeFunctionalBlock(blockId, x, y, targetHostAtom = null, skipSnapshot = false) {
  const block = FUNCTIONAL_BLOCKS[blockId];
  if (!block) return false;
  if (chemState.atoms.length + block.atoms.length > CHEM_ENV.MAX_ATOMS) return false;
  const pitch = CHEM_ENV.GRID_PITCH;
  let hostAtom = targetHostAtom;
  if (!hostAtom && chemState.autoSnap) {
    hostAtom = chemState.atoms.find(a => getRemainingValence(a) > 0 && Math.hypot(a.x - x, a.y - y) <= pitch * 1.6) || null;
  }

  let dirX = 1;
  let dirY = 0;
  let anchorX = snapToGrid(x);
  let anchorY = snapToGrid(y);

  if (hostAtom && chemState.autoSnap && getRemainingValence(hostAtom) > 0) {
    const candidates = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];
    let bestCand = candidates[0];
    let bestClearance = -1;
    candidates.forEach(c => {
      const cx = hostAtom.x + c.dx * pitch * 2;
      const cy = hostAtom.y + c.dy * pitch * 2;
      const minD = chemState.atoms.reduce((m, a) => Math.min(m, Math.hypot(a.x - cx, a.y - cy)), 9999);
      if (minD > bestClearance) {
        bestClearance = minD;
        bestCand = c;
      }
    });
    dirX = bestCand.dx;
    dirY = bestCand.dy;
    anchorX = hostAtom.x + dirX * pitch * 2;
    anchorY = hostAtom.y + dirY * pitch * 2;
  }

 if (!skipSnapshot) saveSnapshot();
  const createdIds = block.atoms.map(spec => {
    const rotGx = dirX === 1 ? spec.gx : (dirX === -1 ? -spec.gx : -spec.gy);
    const rotGy = dirX === 1 ? spec.gy : (dirX === -1 ? -spec.gy : (dirY === 1 ? spec.gx : -spec.gx));
    const px = anchorX + rotGx * pitch;
    const py = anchorY + rotGy * pitch;
    const atom = {
      id: `A_${chemState.nextAtomId++}`,
      type: spec.el,
      x: snapToGrid(px),
      y: snapToGrid(py)
    };
    chemState.atoms.push(atom);
    return atom.id;
  });

  block.bonds.forEach(([fromIdx, toIdx, order]) => {
    chemState.bonds.push({
      id: `B_${chemState.nextBondId++}`,
      from: createdIds[fromIdx],
      to: createdIds[toIdx],
      order
    });
  });

  const anchorAtomId = createdIds[block.anchorIndex];
  if (hostAtom && chemState.autoSnap && getRemainingValence(hostAtom) > 0 && anchorAtomId) {
    chemState.bonds.push({
      id: `B_${chemState.nextBondId++}`,
      from: hostAtom.id,
      to: anchorAtomId,
      order: 1
    });
  }

if (anchorAtomId) {
    chemState.inspector.targetAtomId = anchorAtomId;
  }
  const maxGx = Math.max(...block.atoms.map(a => a.gx));
  return { placed: true, maxGx };
}

function placeCarbonHexRing(cx, cy, isAromatic) {
  const r = CHEM_ENV.GRID_PITCH * 2;
  const dx = Math.round(r * 0.866);
  const dy = Math.round(r * 0.5);
  const offsets = [
    { x: 0, y: -r },
    { x: dx, y: -dy },
    { x: dx, y: dy },
    { x: 0, y: r },
    { x: -dx, y: dy },
    { x: -dx, y: -dy }
  ];
  const ringAtoms = offsets.map(off => addAtom("C", cx + off.x, cy + off.y, false)).filter(Boolean);
  if (ringAtoms.length === 6) {
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      const order = isAromatic && (i % 2 === 0) ? 2 : 1;
      chemState.bonds.push({
        id: `B_${chemState.nextBondId++}`,
        from: ringAtoms[i].id,
        to: ringAtoms[next].id,
        order
      });
    }
    chemState.inspector.targetAtomId = ringAtoms[0].id;
  }
}

function placeSelectedBatch(x, y) {
  const elList = Array.from(chemState.selectedElements);
  const blkList = Array.from(chemState.selectedBlocks).filter(id => Boolean(FUNCTIONAL_BLOCKS[id]));
  if (elList.length === 0 && blkList.length === 0) return false;

  const modes = chemState.elementModes || { C: "SINGLE", O: "SINGLE", N: "SINGLE", S: "SINGLE" };
  const elAtomsCount = elList.reduce((sum, sym) => {
    const mode = modes[sym] || "SINGLE";
    if (mode === "BENZENE" || mode === "CYCLOHEXANE") return sum + 6;
    if (mode.startsWith("BLOCK:")) {
      const blk = FUNCTIONAL_BLOCKS[mode.slice(6)];
      return sum + (blk ? blk.atoms.length : 1);
    }
    return sum + 1;
  }, 0);
  const blockAtomsCount = blkList.reduce((sum, id) => sum + FUNCTIONAL_BLOCKS[id].atoms.length, 0);
  if (chemState.atoms.length + elAtomsCount + blockAtomsCount > CHEM_ENV.MAX_ATOMS) return false;

  const pitch = CHEM_ENV.GRID_PITCH;
  const z = chemState.zoom2D || 1.0;
  const canvas = document.getElementById("canvas-2d");
  const maxW = canvas ? (canvas.width / z) - pitch * 2 : 700;
  const startX = snapToGrid(x);
  let currX = startX;
  let currY = snapToGrid(y);

  saveSnapshot();

  elList.forEach(sym => {
    const mode = modes[sym] || "SINGLE";
    if (mode === "BENZENE" || mode === "CYCLOHEXANE") {
      placeCarbonHexRing(currX, currY, mode === "BENZENE");
      currX += pitch * 5;
      if (currX > maxW) {
        currX = startX;
        currY += pitch * 5;
      }
    } else if (mode.startsWith("BLOCK:")) {
      const blkId = mode.slice(6);
      const res = placeFunctionalBlock(blkId, currX, currY, null, true);
      const spanCols = res && res.maxGx ? res.maxGx + 2 : 4;
      currX += spanCols * pitch;
      if (currX > maxW) {
        currX = startX;
        currY += pitch * 4;
      }
    } else {
      const atom = addAtom(sym, currX, currY, false);
      if (atom) chemState.inspector.targetAtomId = atom.id;
      currX += pitch * 2;
      if (currX > maxW) {
        currX = startX;
        currY += pitch * 3;
      }
    }
  });

  blkList.forEach(blkId => {
    const res = placeFunctionalBlock(blkId, currX, currY, null, true);
    const spanCols = res && res.maxGx ? res.maxGx + 2 : 4;
    currX += spanCols * pitch;
    if (currX > maxW) {
      currX = startX;
      currY += pitch * 4;
    }
  });

  return true;
}

function getMoleculeFeatureVector(mol) {
  const counts = {};
  mol.model3D.atoms.forEach(a => {
    counts[a.type] = (counts[a.type] || 0) + 1;
  });
  let single = 0;
  let double = 0;
  let triple = 0;
  mol.model3D.bonds.forEach(b => {
    if (b.order === 1) single++;
    else if (b.order === 2) double++;
    else if (b.order === 3) triple++;
  });
  const totalAtoms = mol.model3D.atoms.length;
  const totalBonds = mol.model3D.bonds.length;
  const hasRing = totalBonds >= totalAtoms;
  const formulaKey = Object.keys(counts).sort().map(k => `${k}${counts[k]}`).join("");
  return { counts, single, double, triple, totalAtoms, hasRing, formulaKey };
}

function buildMarathonSequence(course) {
  const items = MOLECULE_DB.map(mol => ({ mol, feat: getMoleculeFeatureVector(mol) }));
  if (items.length === 0) return [];

  if (course === "FAMILY") {
    const getFamilyRank = (feat) => {
      const c = feat.counts;
      const hasSpecial = Object.keys(c).some(el => !["C", "H", "O", "N"].includes(el));
      if (hasSpecial) return 5;
      if (c.N) return 4;
      if (!c.C || feat.totalAtoms <= 4) return 1;
      if (feat.hasRing) return 3;
      return 2;
    };
    return items
      .sort((a, b) => (getFamilyRank(a.feat) - getFamilyRank(b.feat)) || (a.feat.totalAtoms - b.feat.totalAtoms))
      .map(x => x.mol);
  }

  if (course === "ISOMER") {
    const groups = {};
    items.forEach(item => {
      const key = item.feat.formulaKey;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    const sortedGroups = Object.values(groups).sort((a, b) => {
      const isIsoA = a.length > 1 ? 0 : 1;
      const isIsoB = b.length > 1 ? 0 : 1;
      if (isIsoA !== isIsoB) return isIsoA - isIsoB;
      return a[0].feat.totalAtoms - b[0].feat.totalAtoms;
    });
    return sortedGroups.flat().map(x => x.mol);
  }

  const remaining = [...items].sort((a, b) => a.feat.totalAtoms - b.feat.totalAtoms);
  const chain = [remaining.shift()];
  while (remaining.length > 0) {
    const curr = chain[chain.length - 1].feat;
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const cand = remaining[i].feat;
      const allEls = new Set([...Object.keys(curr.counts), ...Object.keys(cand.counts)]);
      let elDiff = 0;
      allEls.forEach(el => {
        elDiff += Math.abs((curr.counts[el] || 0) - (cand.counts[el] || 0));
      });
      const bondDiff = Math.abs(curr.double - cand.double) * 1.5 + Math.abs(curr.triple - cand.triple) * 2;
      const ringPenalty = curr.hasRing === cand.hasRing ? 0 : 3;
      const sizeStepPenalty = cand.totalAtoms < curr.totalAtoms ? 2 : 0;
      const dist = elDiff + bondDiff + ringPenalty + sizeStepPenalty;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    chain.push(remaining.splice(bestIdx, 1)[0]);
  }
  return chain.map(x => x.mol);
}

// ハイブリッド・プログレッシブ分子ドリル動的生成エンジン (Lv.1 - Lv.5 / 91マラソン)
function generateChemDrill(lv, viewW, viewH) {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const isMarathon = chemState.drill.type === "MARATHON";
  let targetId = "";
  let targetMol = null;
  let marathonMeta = null;

  if (isMarathon) {
    const seq = buildMarathonSequence(chemState.drill.marathonCourse);
    const total = seq.length;
    const idx = ((chemState.drill.marathonIndex % total) + total) % total;
    targetMol = seq[idx];
    targetId = targetMol.id;
    const courseNames = {
      EVOLUTION: "進化チェーン",
      FAMILY: "骨格ファミリー",
      ISOMER: "異性体・比較"
    };
    marathonMeta = {
      index: idx + 1,
      total,
      courseName: courseNames[chemState.drill.marathonCourse] || "進化チェーン"
    };
  } else {
    const levelPools = {
      1: ["H2O", "CH4", "NH3"],
      2: ["CO2", "CH2O", "C2H4", "C2H2"],
      3: ["CO2", "C2H4", "C2H2", "C2H5OH", "CH3COOH"],
      4: ["C2H5OH", "CH3OCH3", "C3H6_PROPENE", "C3H6_CYCLOPROPANE", "C3H6O3", "C7H6O3"],
      5: ["N_BUTANE", "ISOBUTANE", "C8H8O3", "C7H6O3", "C10H20O", "C8H10N4O2"]
    };
    const pool = (levelPools[lv] || levelPools[1]).filter(id => MOLECULE_DB.some(m => m.id === id));
    targetId = pick(pool.length > 0 ? pool : levelPools[1]);
    targetMol = MOLECULE_DB.find(m => m.id === targetId);
  }


// 中心間距離保証ロジック: 中規模分子はスクロール領域全体を活用して重なりを防止
  const pitch = CHEM_ENV.GRID_PITCH;
  const margin = 44;
  const isLargeMol = targetMol.model3D.atoms.length >= 12;
  const effectiveW = isLargeMol ? Math.min(CHEM_ENV.WORKSPACE_COLS * pitch, Math.max(viewW, 640)) : viewW;
  const effectiveH = isLargeMol ? Math.min(CHEM_ENV.WORKSPACE_ROWS * pitch, Math.max(viewH, 480)) : viewH;
  const usableW = Math.max(pitch * 4, effectiveW - margin * 2);
  const usableH = Math.max(pitch * 3, effectiveH - margin * 2);  const placedPositions = [];

  const allocateCell = () => {
    const distanceSteps = [84, 72, 62, 52];
    for (const minDist of distanceSteps) {
      for (let attempt = 0; attempt < 150; attempt++) {
        const rawX = margin + Math.random() * usableW;
        const rawY = margin + Math.random() * usableH;
        const x = snapToGrid(rawX);
        const y = snapToGrid(rawY);
        const isClear = placedPositions.every(p => Math.hypot(p.x - x, p.y - y) >= minDist);
        if (isClear) {
          placedPositions.push({ x, y });
          return { x, y };
        }
      }
    }
    const idx = placedPositions.length;
    const step = pitch * 2;
    const cols = Math.max(2, Math.floor(usableW / step));
    const fallback = {
      x: snapToGrid(margin + (idx % cols) * step),
      y: snapToGrid(margin + Math.floor(idx / cols) * step)
    };
    placedPositions.push(fallback);
    return fallback;
  };
  const atoms = targetMol.model3D.atoms.map((a, idx) => {
    const pos = allocateCell();
    return { id: `A_${idx + 1}`, type: a.type, x: pos.x, y: pos.y };
  });

  const answerBonds = targetMol.model3D.bonds.map((b, idx) => ({
    id: `B_ANS_${idx + 1}`,
    from: atoms[b.from].id,
    to: atoms[b.to].id,
    order: b.order
  }));

const isomerSwaps = {
    C2H5OH: "CH3OCH3",
    CH3OCH3: "C2H5OH",
    N_BUTANE: "ISOBUTANE",
    ISOBUTANE: "N_BUTANE",
    C3H6_PROPENE: "C3H6_CYCLOPROPANE",
    C3H6_CYCLOPROPANE: "C3H6_PROPENE"
  };

  let initialBonds = [];
  let modeLabel = "新規結線構築";
  let symptomHint = `指定された実在分子 [${targetMol.name}] を組み立てよ。`;

  const useFaultMode = isMarathon
    ? (atoms.length >= 10 && (marathonMeta.index % 2 === 0))
    : (lv >= 3);

  if (useFaultMode) {
    const effectiveLv = isMarathon ? 4 : lv;
    const baseModes = effectiveLv === 3
      ? ["UNDER_ORDER", "BYPASS_BOND"]
      : (effectiveLv === 4 ? ["ISOMER_REWIRE", "UNDER_ORDER", "MULTI_BREAK"] : ["ISOMER_REWIRE", "BYPASS_BOND", "UNDER_ORDER", "MULTI_BREAK"]);
    const faultModes = baseModes.filter(m => m !== "ISOMER_REWIRE" || Boolean(isomerSwaps[targetId]));
    const faultMode = pick(faultModes);

    if (faultMode === "ISOMER_REWIRE" && isomerSwaps[targetId]) {
      const wrongMol = MOLECULE_DB.find(m => m.id === isomerSwaps[targetId]);
      const typeBuckets = {};
      atoms.forEach(a => {
        if (!typeBuckets[a.type]) typeBuckets[a.type] = [];
        typeBuckets[a.type].push(a.id);
      });
      const wrongIdxToAtomId = wrongMol.model3D.atoms.map(wa => typeBuckets[wa.type].shift());
      initialBonds = wrongMol.model3D.bonds.map((wb, idx) => ({
        id: `B_ERR_${idx + 1}`,
        from: wrongIdxToAtomId[wb.from],
        to: wrongIdxToAtomId[wb.to],
        order: wb.order
      }));
      modeLabel = "異性体再配線診断";
      symptomHint = `原子価は一致しているが別の構造異性体に誤結線されている。結合を組み替えて [${targetMol.name}] へ修正せよ。`;
    } else if (faultMode === "MULTI_BREAK" && answerBonds.length >= 10) {
      initialBonds = JSON.parse(JSON.stringify(answerBonds));
      let removed = 0;
      for (let i = initialBonds.length - 1; i >= 0 && removed < 2; i -= 3) {
        if (initialBonds[i].order === 1) {
          initialBonds.splice(i, 1);
          removed++;
        }
      }
      if (removed === 0) initialBonds.pop();
      modeLabel = "複数骨格破断修復";
      symptomHint = `骨格および官能基の結合線が複数欠落している。原子価の不足を特定し [${targetMol.name}] へ復旧せよ。`;
    } else if (faultMode === "UNDER_ORDER") {
      initialBonds = JSON.parse(JSON.stringify(answerBonds));
      const multiBond = initialBonds.find(b => b.order > 1);
      if (multiBond) {
        multiBond.order -= 1;
        modeLabel = "結合次数不全修復";
        symptomHint = `多重結合の次数不足により不安定状態になっている。手を補って [${targetMol.name}] へ復旧せよ。`;
      } else {
        initialBonds.pop();
        modeLabel = "結合欠損修復";
        symptomHint = `結合線が1本欠落している。不足経路を特定し [${targetMol.name}] へ復旧せよ。`;
      }
    } else {
      initialBonds = JSON.parse(JSON.stringify(answerBonds));
      for (let i = 0; i < atoms.length; i++) {
        let injected = false;
        for (let j = i + 1; j < atoms.length; j++) {
          const exists = initialBonds.some(
            b => (b.from === atoms[i].id && b.to === atoms[j].id) || (b.from === atoms[j].id && b.to === atoms[i].id)
          );
          if (!exists) {
            initialBonds.push({
              id: "B_FAULT_BYPASS",
              from: atoms[i].id,
              to: atoms[j].id,
              order: 1
            });
            injected = true;
            break;
          }
        }
        if (injected) break;
      }
      modeLabel = "過剰架橋バイパス診断";
      symptomHint = `余分なバイパス結合が混入し原子価が破綻している。不正な結合を除去し [${targetMol.name}] へ復旧せよ。`;
    }
  }

 if (marathonMeta) {
    modeLabel = `[${marathonMeta.courseName} ${marathonMeta.index}/${marathonMeta.total}] ${modeLabel}`;
    symptomHint = `(${marathonMeta.index}/${marathonMeta.total}問目) ${symptomHint}`;
  }

  return {
    level: lv,
    targetId,
    targetMolecule: targetMol,
    modeLabel,
    symptomHint,
    atoms,
    initialBonds,
    answerBonds
  };
}

function startNewDrill(lv = chemState.drill.level) {
  const viewport = document.getElementById("canvas-2d-viewport");
  const canvas = document.getElementById("canvas-2d");
  if (viewport) {
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
  }
  const w = (viewport && viewport.clientWidth > 0) ? viewport.clientWidth : (canvas ? canvas.width : 480);
  const h = (viewport && viewport.clientHeight > 0) ? viewport.clientHeight : (canvas ? canvas.height : 360);

  chemState.drill.active = true;  chemState.drill.level = lv;
  chemState.drill.showingAnswer = false;
  chemState.drill.savedUserBonds = null;

  const mission = generateChemDrill(lv, w, h);
  chemState.drill.currentMission = mission;

  chemState.atoms = JSON.parse(JSON.stringify(mission.atoms));
  chemState.bonds = JSON.parse(JSON.stringify(mission.initialBonds));
  chemState.nextAtomId = chemState.atoms.length + 1;
  chemState.nextBondId = chemState.bonds.length + 1;
  chemState.history.length = 0;
  chemState.isEraseMode = false;

  syncDrillToolbarUI();
  refreshSimulation();
}

function toggleAnswerDisplay() {
  if (!chemState.drill.active || !chemState.drill.currentMission) return;
  const mission = chemState.drill.currentMission;

  if (!chemState.drill.showingAnswer) {
    chemState.drill.savedUserBonds = JSON.parse(JSON.stringify(chemState.bonds));
    chemState.bonds = JSON.parse(JSON.stringify(mission.answerBonds));
    chemState.drill.showingAnswer = true;
  } else {
    if (chemState.drill.savedUserBonds) {
      chemState.bonds = JSON.parse(JSON.stringify(chemState.drill.savedUserBonds));
    }
    chemState.drill.savedUserBonds = null;
    chemState.drill.showingAnswer = false;
  }

 syncDrillToolbarUI();
  refreshSimulation();
}

// 対象原子の結合前(ISOLATED) vs 結合後(BONDED) 量子・物理テレメトリ計算
function analyzeAtomQuantumState(atom) {
  const spec = QUANTUM_ELEMENT_SPECS[atom.type] || QUANTUM_ELEMENT_SPECS.C;
  const maxValence = ELEMENTS[atom.type] ? ELEMENTS[atom.type].valence : 4;
  const connectedBonds = chemState.bonds.filter(b => b.from === atom.id || b.to === atom.id);

  let usedValence = 0;
  let totalBondEnergy = 0;
  let deltaCharge = 0;
  let oxidationSum = 0;
  const neighbors = [];

  connectedBonds.forEach(b => {
    usedValence += b.order;
    const partnerId = b.from === atom.id ? b.to : b.from;
    const partner = chemState.atoms.find(a => a.id === partnerId);
    if (partner) {
      const pSpec = QUANTUM_ELEMENT_SPECS[partner.type] || QUANTUM_ELEMENT_SPECS.C;
      const pair = [atom.type, partner.type].sort().join("-");
      const enthalpy = BOND_ENTHALPY_TABLE[`${pair}:${b.order}`] || 300;
      totalBondEnergy += enthalpy;

      const enDiff = pSpec.paulingEN - spec.paulingEN;
      deltaCharge += enDiff * 0.14 * b.order;
      if (Math.abs(enDiff) > 0.05) {
        oxidationSum += (enDiff > 0 ? 1 : -1) * b.order;
      }

      const angleRad = Math.atan2(partner.y - atom.y, partner.x - atom.x);
      const bondDistPm = spec.covalentRadius + pSpec.covalentRadius - (b.order - 1) * 11;
      neighbors.push({
        id: partner.id,
        type: partner.type,
        order: b.order,
        enthalpy,
        bondDistPm,
        angleRad
      });
    }
  });

  const isBonded = usedValence > 0;
  const ownNonBonding = Math.max(0, spec.valenceElectrons - usedValence);
  const lonePairs = isBonded ? Math.floor(ownNonBonding / 2) : Math.floor(spec.valenceElectrons / 2);
  const totalShellElectrons = isBonded ? Math.min(spec.targetOctet + 2, spec.valenceElectrons + usedValence) : spec.valenceElectrons;
  const formalCharge = spec.valenceElectrons - usedValence - ownNonBonding;
  const coordination = neighbors.length;
  const stericNumber = isBonded ? (coordination + lonePairs) : 0;
const nShell = spec.shellCount || (spec.z === 1 ? 1 : 2);
  const closedCoreTag = nShell === 1 ? "[He-Core]" : (nShell === 2 ? "[Ne-Core]" : (nShell === 3 ? "[Ar-Core]" : (nShell === 4 ? "[Kr-Core]" : "[Xe-Core]")));

  let hybridization = "ATOMIC (Unmixed)";
  let vseprCode = "AX0 (Spherical)";
  let idealAngle = "N/A (Isotropic)";
  let bondedConfig = spec.baseConfig;

  if (isBonded) {
    if (nShell === 1) {
      hybridization = "1s Sigma Overlap";
      vseprCode = "AX1 (Terminal)";
      idealAngle = "180.0 deg (Linear Axis)";
      bondedConfig = `1s2 ${closedCoreTag}`;
    } else if (stericNumber >= 4) {
      hybridization = "sp3 Hybrid";
      vseprCode = lonePairs === 0 ? "AX4 (Tetrahedral)" : (lonePairs === 1 ? "AX3E (Trigonal Pyramidal)" : "AX2E2 (Bent)");
      idealAngle = lonePairs === 0 ? "109.5 deg" : (lonePairs === 1 ? "107.0 deg" : "104.5 deg");
      bondedConfig = `(sp3)^${Math.min(8, totalShellElectrons)} ${closedCoreTag}`;
    } else if (stericNumber === 3) {
      hybridization = `sp2 Hybrid + ${nShell}p(pi)`;
      vseprCode = lonePairs === 0 ? "AX3 (Trigonal Planar)" : "AX2E (Bent)";
      idealAngle = lonePairs === 0 ? "120.0 deg" : "117.5 deg";
      bondedConfig = `(sp2)^6 (${nShell}p)^2 [Pi-System]`;
    } else {
      hybridization = `sp Hybrid + 2x${nShell}p(pi)`;
      vseprCode = lonePairs === 0 ? "AX2 (Linear)" : "AXE (Linear)";
      idealAngle = "180.0 deg";
      bondedConfig = `(sp)^4 (${nShell}p)^4 [Triple/Cumulene]`;
    }
  }

  let stabilityLabel = "ISOLATED RADICAL";
  if (usedValence === maxValence) {
    stabilityLabel = "OCTET CLOSED [STABLE]";
  } else if (usedValence > maxValence) {
    stabilityLabel = "HYPERVALENT OVERFLOW [ERR]";
  } else if (isBonded) {
    stabilityLabel = `UNSATURATED (-${maxValence - usedValence} HAND)`;
  }

  return {
    atom,
    spec,
    maxValence,
    usedValence,
    isBonded,
    ownNonBonding,
    lonePairs,
    totalShellElectrons,
    formalCharge,
    deltaCharge,
    oxidationSum,
    totalBondEnergy,
    coordination,
    stericNumber,
    hybridization,
    vseprCode,
    idealAngle,
    bondedConfig,
    stabilityLabel,
    neighbors
  };
}

// 量子確率雲（多殻K/L/M/N対応・ガウス減衰ミスト）リアルタイムCanvas描画ループ
function renderQuantumProbabilityCloud() {
  const canvas = document.getElementById("quantum-cloud-canvas");
  if (!canvas || !chemState.inspector.visible) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;

  // 滑らかな残像減衰でミストの連続性を維持
  ctx.fillStyle = "rgba(2, 6, 23, 0.28)";
  ctx.fillRect(0, 0, w, h);

  // 極薄テレメトリ十字軸
  ctx.strokeStyle = "rgba(56, 189, 248, 0.11)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(w, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, h);
  ctx.stroke();

  const targetAtom = chemState.atoms.find(a => a.id === chemState.inspector.targetAtomId) || chemState.atoms[0];
  if (!targetAtom) {
    ctx.fillStyle = "#475569";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("NO TARGET", cx, cy + 3);
    return;
  }

  const q = analyzeAtomQuantumState(targetAtom);
  const gauss = () => ((Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.414);
  const nShell = q.spec.shellCount || (q.spec.z === 1 ? 1 : 2);
  // 共有結合半径に比例した外殻確率雲スケール（Zero Hardcoding）
  const scaleR = Math.min(33, Math.max(14, 9.5 + q.spec.covalentRadius * 0.18));

  // 1. 多層内殻ミスト（K殻=1層目, L殻=2層目, M殻=3層目）
  const innerShellCount = Math.max(0, nShell - 1);
  const innerPalette = ["#94a3b8", "#64748b", "#475569"];
  for (let sIdx = 0; sIdx < innerShellCount; sIdx++) {
    const shellSigma = 5.2 + sIdx * 4.4;
    const dotCount = 30 + sIdx * 16;
    ctx.fillStyle = innerPalette[sIdx % innerPalette.length];
    for (let i = 0; i < dotCount; i++) {
      const r = Math.abs(gauss()) * shellSigma;
      const theta = Math.random() * Math.PI * 2;
      const fade = Math.exp(-r / (shellSigma * 1.45));
      ctx.globalAlpha = fade * (0.68 - sIdx * 0.14);
      ctx.fillRect(cx + Math.cos(theta) * r, cy + Math.sin(theta) * r, 1.1, 1.1);
    }
  }

  if (!q.isBonded) {
    // 2A. 結合前（孤立状態）: 最外殻s軌道ミスト
    const sDots = nShell === 1 ? 110 : 75;
    for (let i = 0; i < sDots; i++) {
      const r = Math.abs(gauss()) * scaleR;
      const theta = Math.random() * Math.PI * 2;
      const fade = Math.exp(-r / (scaleR * 1.25));
      ctx.fillStyle = q.spec.cloudColor;
      ctx.globalAlpha = fade * (0.25 + Math.random() * 0.55);
      ctx.fillRect(cx + Math.cos(theta) * r, cy + Math.sin(theta) * r, 1.15, 1.15);
    }

    // 最外殻pオービタル（フントの規則に基づく不対電子ローブと既ペア電子ローブの自動算出）
    if (nShell > 1) {
      const pElectrons = Math.max(0, q.spec.valenceElectrons - 2);
      const maxPOrbitals = 3;
      const activeLobes = Math.min(maxPOrbitals, pElectrons);
      const pairedLobes = Math.max(0, pElectrons - maxPOrbitals);

      const lobes = [];
      for (let idx = 0; idx < activeLobes; idx++) {
        lobes.push({
          angle: (idx * Math.PI) / activeLobes,
          paired: idx < pairedLobes
        });
      }

      const pDots = pElectrons * 34;
      for (let i = 0; i < pDots; i++) {
        const lobe = lobes[i % lobes.length];
        const sign = Math.random() < 0.5 ? 1 : -1;
        const peakBase = scaleR * 0.66;
        const radialPeak = peakBase + Math.abs(gauss()) * (scaleR * 0.42);
        const angSpread = gauss() * (lobe.paired ? 0.34 : 0.25);
        const angle = lobe.angle + (sign > 0 ? 0 : Math.PI) + angSpread;

        const radialFade = Math.exp(-Math.max(0, radialPeak - peakBase) / (scaleR * 0.78));
        const angFade = Math.exp(-(angSpread * angSpread) / 0.14);
        ctx.fillStyle = lobe.paired ? "#fbbf24" : "#34d399";
        ctx.globalAlpha = radialFade * angFade * (lobe.paired ? 0.85 : 0.62);
        ctx.fillRect(cx + Math.cos(angle) * radialPeak, cy + Math.sin(angle) * radialPeak, 1.15, 1.15);
      }
    }
  } else {
    // 2B. 結合後（分子内状態）: 結合軸方向へ減衰しながら伸びる共有電子対ミスト
    q.neighbors.forEach(nb => {
      const sigmaDots = 70 * nb.order;
      for (let i = 0; i < sigmaDots; i++) {
        const dist = 7 + Math.abs(gauss()) * (scaleR * 0.92);
        const latSigma = nb.order === 1 ? 3.4 : 5.6;
        const lateral = gauss() * latSigma;
        const perpAngle = nb.angleRad + Math.PI / 2;
        const px = cx + Math.cos(nb.angleRad) * dist + Math.cos(perpAngle) * lateral;
        const py = cy + Math.sin(nb.angleRad) * dist + Math.sin(perpAngle) * lateral;

        const distFade = Math.exp(-Math.max(0, dist - 10) / 26);
        const latFade = Math.exp(-(lateral * lateral) / (2 * latSigma * latSigma));
        const isPiRegion = nb.order > 1 && Math.abs(lateral) > 3.2;

        ctx.fillStyle = isPiRegion ? "#a855f7" : "#22d3ee";
        ctx.globalAlpha = distFade * latFade * (0.35 + Math.random() * 0.65);
        ctx.fillRect(px, py, 1.2, 1.2);
      }
    });

    // 非共有電子対（ローンペア）のガウス減衰ミスト
    if (q.lonePairs > 0) {
      const avgAngle = q.neighbors.reduce((acc, n) => acc + n.angleRad, 0) / Math.max(1, q.neighbors.length);
      for (let lp = 0; lp < q.lonePairs; lp++) {
        const offset = q.lonePairs === 1
          ? Math.PI
          : (Math.PI * 0.65 + (lp / Math.max(1, q.lonePairs - 1)) * Math.PI * 0.7);
        const lpAngle = avgAngle + offset;
        for (let i = 0; i < 50; i++) {
          const dist = 10 + Math.abs(gauss()) * (scaleR * 0.42);
          const angSpread = gauss() * 0.32;
          const px = cx + Math.cos(lpAngle + angSpread) * dist;
          const py = cy + Math.sin(lpAngle + angSpread) * dist;

          const fade = Math.exp(-Math.max(0, dist - 10) / 14) * Math.exp(-(angSpread * angSpread) / 0.18);
          ctx.fillStyle = "#fbbf24";
          ctx.globalAlpha = fade * (0.3 + Math.random() * 0.65);
          ctx.fillRect(px, py, 1.15, 1.15);
        }
      }
    }
  }

  ctx.globalAlpha = 1.0;

  // 中心の原子核コア描画
  const coreRadius = Math.min(7.5, Math.max(4.2, 3.6 + nShell * 0.95));
  ctx.fillStyle = q.spec.coreColor;
  ctx.beginPath();
  ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.stroke();
}



function renderInspectorCalloutLine() {
  const canvas2d = document.getElementById("canvas-2d");
  const host = document.getElementById("puzzle-stage") || (canvas2d ? canvas2d.parentElement : null);
  const hud = document.getElementById("quantum-inspector-hud");
  if (!canvas2d || !host || !hud) return;
  if (getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }

  let overlay = document.getElementById("inspector-callout-canvas");
  if (!overlay) {
    overlay = document.createElement("canvas");
    overlay.id = "inspector-callout-canvas";
    host.appendChild(overlay);
  }
  overlay.style.cssText = "position:absolute; left:0; top:0; width:100%; height:100%; margin:0; padding:0; background:transparent !important; background-color:transparent !important; pointer-events:none; z-index:35;";


  const hostW = host.clientWidth;
  const hostH = host.clientHeight;
  if (hostW === 0 || hostH === 0) return;
  if (overlay.width !== hostW || overlay.height !== hostH) {
    overlay.width = hostW;
    overlay.height = hostH;
  }

  const ctx = overlay.getContext("2d");
  ctx.clearRect(0, 0, hostW, hostH);

  if (!chemState.inspector || !chemState.inspector.visible) return;
  const targetAtom = chemState.atoms.find(a => a.id === chemState.inspector.targetAtomId);
  if (!targetAtom) return;

const hostRect = host.getBoundingClientRect();
  const cRect = canvas2d.getBoundingClientRect();
  const hRect = hud.getBoundingClientRect();
  if (hRect.width === 0 || hRect.height === 0) return;

  const z = chemState.zoom2D || 1.0;
  const scaleX = (cRect.width / (canvas2d.width || 1)) * z;
  const scaleY = (cRect.height / (canvas2d.height || 1)) * z;
  const ax = (cRect.left - hostRect.left) + targetAtom.x * scaleX;
  const ay = (cRect.top - hostRect.top) + targetAtom.y * scaleY;

  const hudLeft = hRect.left - hostRect.left;
  const hudTop = hRect.top - hostRect.top;
  const hudRight = hudLeft + hRect.width;
  const hudBottom = hudTop + hRect.height;

// 接続先は常にHUDの左辺とし、最終区間が水平に繋がるエルボー座標を算出
  const tx = hudLeft;
  const ty = Math.max(hudTop + 18, Math.min(hudBottom - 18, ay));
  const minHorizontal = 28;
  const diagX = ax + Math.abs(ty - ay);
  const ex = Math.min(tx - minHorizontal, diagX);
  const ey = ty;

  const reticleR = 25;
  ctx.save();
  ctx.strokeStyle = "rgba(34, 211, 238, 0.85)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(ax, ay, reticleR, 0, Math.PI * 2);
  ctx.stroke();

  const angle = Math.atan2(ey - ay, ex - ax);
  const sx = ax + Math.cos(angle) * reticleR;
  const sy = ay + Math.sin(angle) * reticleR;

  ctx.strokeStyle = "#22d3ee";
  ctx.lineWidth = 1.4;
  ctx.shadowColor = "rgba(34, 211, 238, 0.65)";
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.lineTo(tx, ty);
  ctx.stroke();

  ctx.fillStyle = "#34d399";
  ctx.beginPath();
  ctx.arc(tx, ty, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function startQuantumCloudLoop() {
  if (chemState.inspector.animRunning) return;
  chemState.inspector.animRunning = true;
  const tick = () => {
    renderQuantumProbabilityCloud();
    renderInspectorCalloutLine();
    if (chemState.lastEvaluation && chemState.lastEvaluation.status === "STABLE_MATCH") {
      if (camera3D.autoRotate && !camera3D.isDragging) {
        camera3D.rotY = (camera3D.rotY + CHEM_ENV.AUTO_ROTATE_SPEED) % (Math.PI * 2);
      }
      render3DViewer();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}


// ======================================================================
// 【第4章：グラフ指紋解析 ＆ 化学構造判定コア (Graph Topology & Chemistry Core)】
// ======================================================================
function evaluateMoleculeState() {
  const atoms = chemState.atoms;
  const bonds = chemState.bonds;

  if (atoms.length === 0) {
    return {
      status: "EMPTY",
      message: "元素ボタンを選び、2Dキャンバスをタップして原子を配置してください。",
      atomDiagnostics: []
    };
  }

  const adjMap = new Map();
  const usedValenceMap = new Map();
  atoms.forEach(a => {
    adjMap.set(a.id, []);
    usedValenceMap.set(a.id, 0);
  });

  bonds.forEach(b => {
    const atomA = atoms.find(a => a.id === b.from);
    const atomB = atoms.find(a => a.id === b.to);
    if (!atomA || !atomB) return;
    const order = b.order || 1;
    usedValenceMap.set(atomA.id, usedValenceMap.get(atomA.id) + order);
    usedValenceMap.set(atomB.id, usedValenceMap.get(atomB.id) + order);
    adjMap.get(atomA.id).push({ neighborType: atomB.type, order });
    adjMap.get(atomB.id).push({ neighborType: atomA.type, order });
  });

  const atomDiagnostics = atoms.map(a => {
    const maxValence = ELEMENTS[a.type].valence;
    const usedValence = usedValenceMap.get(a.id);
    const diff = maxValence - usedValence;
    return {
      id: a.id,
      type: a.type,
      usedValence,
      maxValence,
      state: diff === 0 ? "OK" : (diff > 0 ? "INCOMPLETE" : "OVERFLOW")
    };
  });

  if (atomDiagnostics.some(d => d.state !== "OK")) {
    return {
      status: "UNSTABLE",
      message: "結合の手の数(原子価)が過不足している原子があります。すべての手の数を合わせてください。",
      atomDiagnostics
    };
  }

  const visited = new Set([atoms[0].id]);
  const queue = [atoms[0].id];
  const neighborIdsMap = new Map();
  atoms.forEach(a => neighborIdsMap.set(a.id, []));
  bonds.forEach(b => {
    neighborIdsMap.get(b.from).push(b.to);
    neighborIdsMap.get(b.to).push(b.from);
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    for (const nxt of neighborIdsMap.get(curr)) {
      if (!visited.has(nxt)) {
        visited.add(nxt);
        queue.push(nxt);
      }
    }
  }

  if (visited.size !== atoms.length) {
    return {
      status: "DISCONNECTED",
      message: "離ればなれの原子グループがあります。1つの分子に繋げてください。",
      atomDiagnostics
    };
  }

  const atomDescriptors = atoms.map(a => {
    const neighbors = adjMap.get(a.id)
      .map(n => `${n.neighborType}-${n.order}`)
      .sort()
      .join(",");
    return `${a.type}(${neighbors})`;
  });
  const signature = atomDescriptors.sort().join("|");

const matchedMolecule = MOLECULE_DB.find(m => m.signature === signature);
  if (!matchedMolecule) {
    const unlistedMol = buildUnlistedMolecule(atoms, bonds, signature);
    return {
      status: "STABLE_MATCH",
      isUnlisted: true,
      signature,
      molecule: unlistedMol,
      message: `UNLISTED_STABLE: 既知アーカイブに該当なし。未知の安定分子 [${unlistedMol.formula}] を観測。`,
      atomDiagnostics
    };
  }

chemState.discoveredIds.add(matchedMolecule.id);
  const newlyUnlocked = [];
  Object.values(FUNCTIONAL_BLOCKS).forEach(blk => {
    if (blk.unlockBy === matchedMolecule.id && !chemState.unlockedBlocks.has(blk.id)) {
      chemState.unlockedBlocks.add(blk.id);
      newlyUnlocked.push(`${blk.name}(${blk.label})`);
    }
  });
const unlockNotice = newlyUnlocked.length > 0 ? ` | ブロック解放: ${newlyUnlocked.join(", ")}` : "";
  const geoText = matchedMolecule.geometry ? ` / 骨格: ${matchedMolecule.geometry}` : "";
  const descText = matchedMolecule.desc ? `\n${matchedMolecule.desc}` : "";

  return {
    status: "STABLE_MATCH",
    signature,
    molecule: matchedMolecule,
    message: `分子構造を同定: ${matchedMolecule.name} [${matchedMolecule.formula}]${geoText}${unlockNotice}${descText}`,
    atomDiagnostics
  };

}


// 辞書未登録の安定分子に対する組成式・立体構造・3D量子モデルの自動生成
function buildUnlistedMolecule(atoms, bonds, signature) {
  // 1. ヒル方式（Hill System）による組成式生成
  const counts = {};
  atoms.forEach(a => {
    counts[a.type] = (counts[a.type] || 0) + 1;
  });
  let orderedSymbols = [];
  if (counts.C) {
    orderedSymbols.push("C");
    if (counts.H) orderedSymbols.push("H");
    Object.keys(counts)
      .filter(s => s !== "C" && s !== "H")
      .sort()
      .forEach(s => orderedSymbols.push(s));
  } else {
    orderedSymbols = Object.keys(counts).sort();
  }
  const formula = orderedSymbols.map(s => s + (counts[s] > 1 ? counts[s] : "")).join("");

  // 2. インデックス変換と隣接リスト構築
  const idToIndex = new Map();
  atoms.forEach((a, i) => idToIndex.set(a.id, i));
  const n = atoms.length;
  const modelBonds = bonds.map(b => ({
    from: idToIndex.get(b.from),
    to: idToIndex.get(b.to),
    order: b.order || 1
  }));

  const adj = Array.from({ length: n }, () => []);
  const usedVal = new Array(n).fill(0);
  modelBonds.forEach(b => {
    adj[b.from].push({ to: b.to, order: b.order });
    adj[b.to].push({ to: b.from, order: b.order });
    usedVal[b.from] += b.order;
    usedVal[b.to] += b.order;
  });

  // 3. 2D配置を基準にZ軸の立体オフセットを付与して初期3D座標を生成
  const cx2d = atoms.reduce((s, a) => s + a.x, 0) / n;
  const cy2d = atoms.reduce((s, a) => s + a.y, 0) / n;
  const coords = atoms.map((a, idx) => {
    const qSpec = QUANTUM_ELEMENT_SPECS[a.type] || { valenceElectrons: 4 };
    const lp = Math.max(0, Math.floor((qSpec.valenceElectrons - usedVal[idx]) / 2));
    const steric = adj[idx].length + lp;
    const zJitter = steric >= 4 ? ((idx % 2 === 0 ? 1 : -1) * 0.45) : ((idx % 3 - 1) * 0.18);
    return {
      x: (a.x - cx2d) * 0.016,
      y: (a.y - cy2d) * 0.016,
      z: zJitter
    };
  });

  // 4. 共有結合半径に基づく結合長保持 ＋ 非結合原子間のVSEPR立体反発緩和
  const targetLengths = modelBonds.map(b => {
    const r1 = (QUANTUM_ELEMENT_SPECS[atoms[b.from].type] || { covalentRadius: 75 }).covalentRadius;
    const r2 = (QUANTUM_ELEMENT_SPECS[atoms[b.to].type] || { covalentRadius: 75 }).covalentRadius;
    return ((r1 + r2) - (b.order - 1) * 12) * 0.0095;
  });

  for (let step = 0; step < 40; step++) {
    const forces = Array.from({ length: n }, () => ({ x: 0, y: 0, z: 0 }));

    // 結合バネ力（目標結合長へ収束）
    modelBonds.forEach((b, bIdx) => {
      const p1 = coords[b.from];
      const p2 = coords[b.to];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = p2.z - p1.z;
      const dist = Math.hypot(dx, dy, dz) || 0.001;
      const diff = (dist - targetLengths[bIdx]) * 0.28;
      const fx = (dx / dist) * diff;
      const fy = (dy / dist) * diff;
      const fz = (dz / dist) * diff;
      forces[b.from].x += fx; forces[b.from].y += fy; forces[b.from].z += fz;
      forces[b.to].x -= fx;   forces[b.to].y -= fy;   forces[b.to].z -= fz;
    });

    // 全原子ペア間の立体反発力（結合角の確保と重なり防止）
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const p1 = coords[i];
        const p2 = coords[j];
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let dz = p2.z - p1.z;
        const dist = Math.hypot(dx, dy, dz) || 0.001;
        if (dist < 2.2) {
          const rep = 0.09 / (dist * dist + 0.15);
          const fx = (dx / dist) * rep;
          const fy = (dy / dist) * rep;
          const fz = (dz / dist) * rep;
          forces[i].x -= fx; forces[i].y -= fy; forces[i].z -= fz;
          forces[j].x += fx; forces[j].y += fy; forces[j].z += fz;
        }
      }
    }

    for (let i = 0; i < n; i++) {
      coords[i].x += forces[i].x;
      coords[i].y += forces[i].y;
      coords[i].z += forces[i].z;
    }
  }

  // 重心を原点(0, 0, 0)へ正規化
  const gx = coords.reduce((s, c) => s + c.x, 0) / n;
  const gy = coords.reduce((s, c) => s + c.y, 0) / n;
  const gz = coords.reduce((s, c) => s + c.z, 0) / n;

  const modelAtoms = atoms.map((a, i) => ({
    type: a.type,
    x: Number((coords[i].x - gx).toFixed(3)),
    y: Number((coords[i].y - gy).toFixed(3)),
    z: Number((coords[i].z - gz).toFixed(3))
  }));

const stability = analyzeBondStability(atoms, bonds);
  let dynamicDesc = "";
  if (stability.tier === "TRANSIENT") {
    dynamicDesc = `既知アーカイブに該当記録はなく、内部に極めて脆い ${stability.weakestLabel} 結合（${stability.weakestBde} kJ/mol）を抱えている。現実の自然界では室温の熱運動すら耐えられず、極低温下や上層大気で一瞬だけ観測される過渡的な超不安定分子だ。`;
  } else if (stability.tier === "FRAGILE") {
    dynamicDesc = `既知アーカイブには未登録の分子だ。原子価は閉じているが、最も弱い ${stability.weakestLabel} 結合（${stability.weakestBde} kJ/mol）が熱や光による開裂のボトルネックとなり、反応性の高い不安定種として振る舞う。`;
  } else if (stability.tier === "RIGID") {
    dynamicDesc = `既知アーカイブには未登録だが、全結合が ${stability.weakestBde} kJ/mol 以上の強固な共有結合で組まれている。熱力学的なエネルギーの谷が深く、一度生成されれば安定して存在し得る頑丈な構造だ。`;
  } else {
    dynamicDesc = `既知アーカイブには未登録だが、全原子の価電子軌道は破綻なく閉殻している。最弱の ${stability.weakestLabel} 結合（${stability.weakestBde} kJ/mol）を起点に反応し得る、自然界の化学空間に潜む名もなき分子だ。`;
  }

  return {
    id: `UNLISTED_${formula}`,
    formula,
    name: `未登録の安定分子 (${formula})`,
    geometry: stability.hasThreeRing
      ? "動的VSEPR立体展開構造（三員環角度ひずみ内在）"
      : "動的VSEPR立体自動展開構造",
    signature,
    desc: dynamicDesc,
    model3D: {
      atoms: modelAtoms,
      bonds: modelBonds
    }
  };
}

// 分子内の最弱結合（ボトルネック）・最強結合・環ひずみ・熱的安定度ランクを解析
function analyzeBondStability(atoms, bonds) {
  const atomMap = new Map();
  atoms.forEach(a => atomMap.set(a.id, a));

  let weakest = { label: "-", bde: Infinity };
  let strongest = { label: "-", bde: -Infinity };

  const adjIds = new Map();
  atoms.forEach(a => adjIds.set(a.id, new Set()));

  bonds.forEach(b => {
    const a1 = atomMap.get(b.from);
    const a2 = atomMap.get(b.to);
    if (!a1 || !a2) return;
    adjIds.get(a1.id).add(a2.id);
    adjIds.get(a2.id).add(a1.id);

    const order = b.order || 1;
    const pair = [a1.type, a2.type].sort();
    const key = `${pair[0]}-${pair[1]}:${order}`;
    const fallback = order === 3 ? 820 : order === 2 ? 580 : 260;
    const bde = (typeof BOND_ENTHALPY_TABLE !== "undefined" && BOND_ENTHALPY_TABLE[key]) || fallback;    const sym = order === 3 ? "#" : order === 2 ? "=" : "-";
    const label = `${a1.type}${sym}${a2.type}`;

    if (bde < weakest.bde) weakest = { label, bde };
    if (bde > strongest.bde) strongest = { label, bde };
  });

  if (weakest.bde === Infinity) weakest = { label: "NONE", bde: 0 };
  if (strongest.bde === -Infinity) strongest = { label: "NONE", bde: 0 };

  // 三員環（角度ひずみ）の検出
  let hasThreeRing = false;
  const ids = atoms.map(a => a.id);
  for (let i = 0; i < ids.length && !hasThreeRing; i++) {
    const n1 = adjIds.get(ids[i]);
    for (const id2 of n1) {
      if (id2 <= ids[i]) continue;
      const n2 = adjIds.get(id2);
      for (const id3 of n2) {
        if (id3 <= id2) continue;
        if (n1.has(id3)) {
          hasThreeRing = true;
          break;
        }
      }
    }
  }

  let tier = "MODERATE";
  let tierLabel = "STANDARD（標準的共有結合）";
  if (weakest.bde > 0 && (weakest.bde <= 205 || (hasThreeRing && weakest.bde < 280))) {
    tier = "TRANSIENT";
    tierLabel = "TRANSIENT（極低温・過渡的超不安定種）";
  } else if (weakest.bde > 0 && (weakest.bde < 270 || hasThreeRing)) {
    tier = "FRAGILE";
    tierLabel = "LABILE（熱・光で開裂しやすい不安定種）";
  } else if (weakest.bde >= 340 && !hasThreeRing) {
    tier = "RIGID";
    tierLabel = "RIGID（高耐久・難分解性安定構造）";
  }

  return {
    weakestLabel: weakest.label,
    weakestBde: weakest.bde,
    strongestLabel: strongest.label,
    strongestBde: strongest.bde,
    hasThreeRing,
    tier,
    tierLabel
  };
}

// ======================================================================
// 【第5章：グラフィック描画エンジン (2D & 3D Rendering Pipeline)】
// 5-1. 2D構造式キャンバス描画モジュール
// 5-2. 3D立体構造ビューア描画モジュール (外部依存ゼロ・Zソート透視投影)
// ======================================================================
function formatHillFormula(counts) {
  const keys = Object.keys(counts).filter(k => counts[k] > 0);
  if (keys.length === 0) return "";
  const ordered = [];
  if (counts.C > 0) {
    ordered.push("C");
    if (counts.H > 0) ordered.push("H");
    keys.filter(k => k !== "C" && k !== "H").sort().forEach(k => ordered.push(k));
  } else {
    if (counts.H > 0) ordered.push("H");
    keys.filter(k => k !== "H").sort().forEach(k => ordered.push(k));
  }
  return ordered.map(el => el + (counts[el] > 1 ? counts[el] : "")).join("");
}

function updateLiveFormulaInspector() {
  const bar = document.getElementById("live-formula-bar");
  if (!bar) return;

  const atoms = chemState.atoms || [];
  const bonds = chemState.bonds || [];
  if (atoms.length === 0) {
    bar.innerHTML = `<span>分子式: -</span><span style="color: #94a3b8;">検出パーツ: なし</span>`;
    return;
  }

  const counts = {};
  const adj = new Map();
  atoms.forEach(a => {
    counts[a.type] = (counts[a.type] || 0) + 1;
    adj.set(a.id, []);
  });

  bonds.forEach(b => {
    const a1 = atoms.find(a => a.id === b.from);
    const a2 = atoms.find(a => a.id === b.to);
    if (!a1 || !a2) return;
    const order = b.order || 1;
    adj.get(a1.id).push({ atom: a2, order });
    adj.get(a2.id).push({ atom: a1, order });
  });

  // 残余結合手（未接続の原子価）の計算
  const defaultValence = { H: 1, Cl: 1, Br: 1, F: 1, I: 1, O: 2, S: 2, N: 3, P: 3, B: 3, C: 4, Si: 4 };
  let openHands = 0;
  atoms.forEach(a => {
    const used = (adj.get(a.id) || []).reduce((sum, e) => sum + e.order, 0);
    const maxV = (typeof ELEMENT_DATA !== "undefined" && ELEMENT_DATA[a.type] && ELEMENT_DATA[a.type].valence) || defaultValence[a.type] || 4;
    openHands += Math.abs(maxV - used);
  });

  // 官能基パーツの検出
  const detectedGroups = [];
  let countOH = 0;
  let countCOOH = 0;
  let countCHO = 0;
  let countNH2 = 0;
  let countCH3 = 0;
  let hasEther = false;

  const carboxylOxygenIds = new Set();

  atoms.forEach(a => {
    const links = adj.get(a.id) || [];
    if (a.type === "C") {
      const dblO = links.find(l => l.atom.type === "O" && l.order === 2);
      const sglOH = links.find(l => {
        if (l.atom.type !== "O" || l.order !== 1) return false;
        const oLinks = adj.get(l.atom.id) || [];
        return oLinks.length === 2 && oLinks.some(ol => ol.atom.type === "H" && ol.order === 1);
      });
      const sglH = links.find(l => l.atom.type === "H" && l.order === 1);
      const hLinks = links.filter(l => l.atom.type === "H" && l.order === 1);

      if (dblO && sglOH) {
        countCOOH++;
        carboxylOxygenIds.add(sglOH.atom.id);
      } else if (dblO && sglH) {
        countCHO++;
      } else if (hLinks.length === 3 && links.length === 4) {
        countCH3++;
      }
    }
  });

  atoms.forEach(a => {
    const links = adj.get(a.id) || [];
    if (a.type === "O" && !carboxylOxygenIds.has(a.id)) {
      const hasH = links.some(l => l.atom.type === "H" && l.order === 1);
      const cLinks = links.filter(l => l.atom.type === "C" && l.order === 1);
      if (hasH && cLinks.length === 1 && links.length === 2) {
        countOH++;
      } else if (cLinks.length === 2 && links.length === 2) {
        hasEther = true;
      }
    } else if (a.type === "N") {
      const hLinks = links.filter(l => l.atom.type === "H" && l.order === 1);
      if (hLinks.length === 2 && links.length === 3) {
        countNH2++;
      }
    }
  });

  // 6員環（ベンゼン環・シクロヘキサン環）の簡易判定
  const cAtoms = atoms.filter(a => a.type === "C");
  let hasSixRing = false;
  if (cAtoms.length >= 6) {
    const cIds = new Set(cAtoms.map(c => c.id));
    const dfsRing = (currId, startId, visited, depth) => {
      if (depth === 6) {
        return (adj.get(currId) || []).some(l => l.atom.id === startId);
      }
      for (const l of (adj.get(currId) || [])) {
        if (cIds.has(l.atom.id) && !visited.has(l.atom.id)) {
          visited.add(l.atom.id);
          if (dfsRing(l.atom.id, startId, visited, depth + 1)) return true;
          visited.delete(l.atom.id);
        }
      }
      return false;
    };
    for (const ca of cAtoms) {
      if (dfsRing(ca.id, ca.id, new Set([ca.id]), 1)) {
        hasSixRing = true;
        break;
      }
    }
  }

  if (hasSixRing) detectedGroups.push("炭素6員環(Ph/環状)");
  if (countCOOH > 0) detectedGroups.push(`カルボキシ基(-COOH)${countCOOH > 1 ? "x" + countCOOH : ""}`);
  if (countCHO > 0) detectedGroups.push(`アルデヒド基(-CHO)${countCHO > 1 ? "x" + countCHO : ""}`);
  if (countOH > 0) detectedGroups.push(`ヒドロキシ基(-OH)${countOH > 1 ? "x" + countOH : ""}`);
  if (countNH2 > 0) detectedGroups.push(`アミノ基(-NH2)${countNH2 > 1 ? "x" + countNH2 : ""}`);
  if (hasEther) detectedGroups.push("エーテル結合(-O-)");
  if (countCH3 > 0) detectedGroups.push(`メチル基(-CH3)${countCH3 > 1 ? "x" + countCH3 : ""}`);

  const hillFormula = formatHillFormula(counts);

  // 示性式の自動組み立て（特定の官能基が切り出せる場合）
  let rationalFormula = "";
  if (openHands === 0 && counts.C > 0) {
    const rem = { ...counts };
    let suffix = "";
    if (countCOOH === 1 && countOH === 0 && rem.C >= 1 && rem.O >= 2 && rem.H >= 1) {
      rem.C -= 1; rem.O -= 2; rem.H -= 1;
      suffix = "COOH";
    } else if (countCHO === 1 && countOH === 0 && rem.C >= 1 && rem.O >= 1 && rem.H >= 1) {
      rem.C -= 1; rem.O -= 1; rem.H -= 1;
      suffix = "CHO";
    } else if (countOH >= 1 && countCOOH === 0 && rem.O >= countOH && rem.H >= countOH) {
      rem.O -= countOH; rem.H -= countOH;
      suffix = countOH === 1 ? "OH" : `(OH)${countOH}`;
    } else if (countNH2 === 1 && rem.N >= 1 && rem.H >= 2) {
      rem.N -= 1; rem.H -= 2;
      suffix = "NH2";
    }
    if (suffix) {
      const body = formatHillFormula(rem);
      if (body && body + suffix !== hillFormula) {
        rationalFormula = body + suffix;
      }
    }
  }

  const formulaText = rationalFormula
    ? `分子式: <b>${hillFormula}</b> <span style="color: #4ade80;">→ 示性式: <b>${rationalFormula}</b></span>`
    : `分子式: <b>${hillFormula}</b>`;

  const handStatus = openHands === 0
    ? `<span style="color: #4ade80;">[原子価: 過不足なし]</span>`
    : `<span style="color: #fbbf24;">[未結合の手: 残り${openHands}本]</span>`;

  const groupText = detectedGroups.length > 0
    ? `検出パーツ: <span style="color: #e2e8f0;">${detectedGroups.join(" / ")}</span>`
    : `検出パーツ: <span style="color: #94a3b8;">基本骨格のみ</span>`;

  bar.innerHTML = `<span>${formulaText} ${handStatus}</span><span>${groupText}</span>`;
}

function render2DCanvas() {
  const canvas = document.getElementById("canvas-2d");  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const z = chemState.zoom2D || 1.0;

  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.scale(z, z);
  const logicalW = w / z;
  const logicalH = h / z;

  // 背景グリッド
  ctx.strokeStyle = "rgba(51, 65, 85, 0.35)";
  ctx.lineWidth = 1;
  const pitch = CHEM_ENV.GRID_PITCH;
  for (let x = 0; x <= logicalW; x += pitch) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, logicalH); ctx.stroke();
  }
  for (let y = 0; y <= logicalH; y += pitch) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(logicalW, y); ctx.stroke();
  }
  // ドラッグ中の結線ガイド線
  const ds = chemState.dragState;
  if (ds.activeAtomId) {
    const src = chemState.atoms.find(a => a.id === ds.activeAtomId);
    if (src) {
      ctx.save();
      ctx.strokeStyle = "#38bdf8";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(ds.currX, ds.currY);
      ctx.stroke();
      ctx.restore();
    }
  }

  // 結合線（単結合・二重結合・三重結合）の描画
  chemState.bonds.forEach(b => {
    const a1 = chemState.atoms.find(a => a.id === b.from);
    const a2 = chemState.atoms.find(a => a.id === b.to);
    if (!a1 || !a2) return;

    const dx = a2.x - a1.x;
    const dy = a2.y - a1.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 3;

    const offsets = b.order === 1 ? [0] : (b.order === 2 ? [-4.5, 4.5] : [-7, 0, 7]);
    offsets.forEach(off => {
      ctx.beginPath();
      ctx.moveTo(a1.x + nx * off, a1.y + ny * off);
      ctx.lineTo(a2.x + nx * off, a2.y + ny * off);
      ctx.stroke();
    });
  });

  // 原子ノードの描画（原子価ステータスリング付き）
  const diagMap = new Map();
  if (chemState.lastEvaluation && chemState.lastEvaluation.atomDiagnostics) {
    chemState.lastEvaluation.atomDiagnostics.forEach(d => diagMap.set(d.id, d));
  }

  chemState.atoms.forEach(atom => {
    const spec = ELEMENTS[atom.type];
    const diag = diagMap.get(atom.id);

    // 原子価状態の外周リング
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, spec.radius2D + 4, 0, Math.PI * 2);
    if (!diag || diag.state === "OK") {
      ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
    } else if (diag.state === "INCOMPLETE") {
      ctx.fillStyle = "rgba(245, 158, 11, 0.45)";
    } else {
      ctx.fillStyle = "rgba(239, 68, 68, 0.65)";
    }
    ctx.fill();

    // 原子本体円
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, spec.radius2D, 0, Math.PI * 2);
    ctx.fillStyle = spec.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = spec.strokeColor;
    ctx.stroke();

    // 元素記号テキスト
    ctx.fillStyle = spec.textColor;
    ctx.font = "bold 15px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(spec.symbol, atom.x, atom.y);

  // 残り結合手のインジケータ（未完了時のみ小さく表示）
    if (diag && diag.state !== "OK") {
      const rem = diag.maxValence - diag.usedValence;
      const badgeText = rem > 0 ? `+${rem}` : `${rem}`;
      ctx.fillStyle = rem > 0 ? "#fbbf24" : "#f87171";
      ctx.font = "bold 11px monospace";
      ctx.fillText(badgeText, atom.x + spec.radius2D + 6, atom.y - spec.radius2D - 2);
    }

    // 選択中またはドラッグ中原子の強調ターゲットマーカー（電子観察OFF時も常時表示）
    const isSelected = chemState.inspector && chemState.inspector.targetAtomId === atom.id;
    const isDragging = chemState.dragState && chemState.dragState.activeAtomId === atom.id;
    if (isSelected || isDragging) {
      const selR = spec.radius2D + 8;
      ctx.save();
      ctx.strokeStyle = isDragging ? "#fbbf24" : "#22d3ee";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.arc(atom.x, atom.y, selR, 0, Math.PI * 2);
      ctx.stroke();

      // 四隅の照準ブラケット
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      const bLen = 5;
      const corners = [
        [-1, -1], [1, -1], [-1, 1], [1, 1]
      ];
      corners.forEach(([sx, sy]) => {
        const cx = atom.x + sx * (selR + 1);
        const cy = atom.y + sy * (selR + 1);
     ctx.beginPath();
        ctx.moveTo(cx - sx * bLen, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy - sy * bLen);
        ctx.stroke();
      });
      ctx.restore();
    }
  });
  ctx.restore();
  updateLiveFormulaInspector();
}

// 5-2. 3D立体構造ビューア描画モジュール (N体SIM由来回転行列 ＋ Zソート球棒投影)
function rotateAndProject3D(pt, viewW, viewH) {
  const cosY = Math.cos(camera3D.rotY);
  const sinY = Math.sin(camera3D.rotY);
  const x1 = pt.x * cosY - pt.z * sinY;
  const z1 = pt.x * sinY + pt.z * cosY;

  const cosX = Math.cos(camera3D.rotX);
  const sinX = Math.sin(camera3D.rotX);
  const y2 = pt.y * cosX - z1 * sinX;
  const z2 = pt.y * sinX + z1 * cosX;

  const dz = z2 + camera3D.orbitRadius;
  if (dz < 0.2) return { visible: false, depth: dz };

  const scale = camera3D.zoom * (CHEM_ENV.BASE_DISTANCE_3D / dz);
  return {
    visible: true,
    x: viewW / 2 + x1 * scale,
    y: viewH / 2 + y2 * scale,
    depth: dz,
    scale
  };
}


function render3DViewer() {
  const canvas = document.getElementById("canvas-3d");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

// 3D表示モード切替ボタンの自動配置（3Dテレメトリボタンのグループ内に統合）
  let styleBtn = document.getElementById("btn-3d-style-toggle");
  const teleBtn = document.getElementById("btn-tele3d-toggle");
  if (!styleBtn && teleBtn && teleBtn.parentElement) {
    styleBtn = document.createElement("button");
    styleBtn.id = "btn-3d-style-toggle";
    styleBtn.type = "button";
    styleBtn.addEventListener("click", () => {
      chemState.classic3DMode = !chemState.classic3DMode;
      render3DViewer();
    });
    teleBtn.parentElement.insertBefore(styleBtn, teleBtn.nextSibling);
  }
  const isClassic3D = Boolean(chemState.classic3DMode);
  if (styleBtn) {
    styleBtn.textContent = isClassic3D ? "表示: 立体構造式" : "表示: 量子クラウド";
    styleBtn.classList.toggle("active", isClassic3D);
  }

  const evalRes = chemState.lastEvaluation;
  if (!evalRes || evalRes.status !== "STABLE_MATCH" || !evalRes.molecule || !evalRes.molecule.model3D) {
    render3DViewer.wasActive = false;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(51, 65, 85, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 16); ctx.lineTo(w / 2, h - 16);
    ctx.moveTo(16, h / 2); ctx.lineTo(w - 16, h / 2);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "13px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("実在分子が完成すると、ここに3D量子電子雲モデルが実体化します", w / 2, h / 2);
    return;
  }

  // 待機状態からの復帰時、モード切替時、または立体構造式モード時は残像を残さずクリア
  if (!render3DViewer.wasActive || render3DViewer.lastClassicMode !== isClassic3D || isClassic3D) {
    ctx.clearRect(0, 0, w, h);
    render3DViewer.wasActive = true;
    render3DViewer.lastClassicMode = isClassic3D;
  }

  if (!isClassic3D) {
    // 2D量子インスペクタと統一した残像フェード（連続ミスト表現）
    ctx.fillStyle = "rgba(2, 6, 23, 0.34)";
    ctx.fillRect(0, 0, w, h);
  }


  // 極薄テレメトリ十字軸
  ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2, 16); ctx.lineTo(w / 2, h - 16);
  ctx.moveTo(16, h / 2); ctx.lineTo(w - 16, h / 2);
  ctx.stroke();

const showTele = Boolean(chemState.inspector && chemState.inspector.telemetry3D);
  const model = evalRes.molecule.model3D;
  const gauss = () => ((Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.414);

  const atomCount = model.atoms.length;

  // 分子の重心と最大半径を算出し、大型分子でも画面中央に自動フレーミング
  let cx = 0, cy = 0, cz = 0;
  if (atomCount > 0) {
    model.atoms.forEach(a => { cx += a.x; cy += a.y; cz += a.z; });
    cx /= atomCount; cy /= atomCount; cz /= atomCount;
  }
  let maxR = 0.1;
  model.atoms.forEach(a => {
    const r = Math.hypot(a.x - cx, a.y - cy, a.z - cz);
    if (r > maxR) maxR = r;
  });
  const frameScale = maxR > 1.35 ? (1.35 / maxR) : 1.0;
  const visualScale = Math.sqrt(frameScale);
  const projectFramed3D = (pt) => rotateAndProject3D({
    x: (pt.x - cx) * frameScale,
    y: (pt.y - cy) * frameScale,
    z: (pt.z - cz) * frameScale
  }, w, h);

  const netDelta = new Array(atomCount).fill(0);
  const usedValence = new Array(atomCount).fill(0);
  const neighborVecs = Array.from({ length: atomCount }, () => []);

  let totalBDE = 0;
  let maxEnDiff = 0;
  let dipoleX = 0;
  let dipoleY = 0;
  let dipoleZ = 0;

  const bondMetrics = model.bonds.map(b => {
    const a1 = model.atoms[b.from];
    const a2 = model.atoms[b.to];
    if (!a1 || !a2) return { enthalpy: 0, enDiff: 0, shift: 0 };

    const q1 = (typeof QUANTUM_ELEMENT_SPECS !== "undefined" && QUANTUM_ELEMENT_SPECS[a1.type]) || { paulingEN: 2.5 };
    const q2 = (typeof QUANTUM_ELEMENT_SPECS !== "undefined" && QUANTUM_ELEMENT_SPECS[a2.type]) || { paulingEN: 2.5 };
   const pairKey = [a1.type, a2.type].sort().join("-") + ":" + b.order;
    const fallback = b.order === 3 ? 820 : b.order === 2 ? 580 : 260;
    const enthalpy = (typeof BOND_ENTHALPY_TABLE !== "undefined" && BOND_ENTHALPY_TABLE[pairKey]) || fallback;
    totalBDE += enthalpy;

    usedValence[b.from] += b.order;
    usedValence[b.to] += b.order;

    const vx = a2.x - a1.x;
    const vy = a2.y - a1.y;
    const vz = a2.z - a1.z;
    const vLen = Math.hypot(vx, vy, vz) || 1;
    neighborVecs[b.from].push({ x: vx / vLen, y: vy / vLen, z: vz / vLen });
    neighborVecs[b.to].push({ x: -vx / vLen, y: -vy / vLen, z: -vz / vLen });

    const enDiff = q2.paulingEN - q1.paulingEN;
    const shift = enDiff * 0.14 * b.order;
    netDelta[b.from] += shift;
    netDelta[b.to] -= shift;
    maxEnDiff = Math.max(maxEnDiff, Math.abs(enDiff));

    dipoleX += vx * shift;
    dipoleY += vy * shift;
    dipoleZ += vz * shift;

    return { enthalpy, enDiff, shift };
  });

  const dipoleMag = Math.hypot(dipoleX, dipoleY, dipoleZ);
  const isPolar = dipoleMag > 0.08;

// 各原子の3D投影および非共有電子対（ローンペア）の3D方向ベクトル算出
  const projectedAtoms = model.atoms.map((a, idx) => {
    const proj = projectFramed3D(a);
    const qSpec = (typeof QUANTUM_ELEMENT_SPECS !== "undefined" && QUANTUM_ELEMENT_SPECS[a.type]) || { z: 6, valenceElectrons: 4, coreColor: "#64748b" };
    const ownNonBonding = Math.max(0, qSpec.valenceElectrons - usedValence[idx]);
    const lonePairs = Math.floor(ownNonBonding / 2);

    const lpTargets = [];
    if (lonePairs > 0) {
      let rx = 0, ry = 0, rz = 0;
      neighborVecs[idx].forEach(v => { rx -= v.x; ry -= v.y; rz -= v.z; });
      let rLen = Math.hypot(rx, ry, rz);
      if (rLen < 0.05) {
        rx = 0; ry = 1; rz = 0; rLen = 1;
      }
      rx /= rLen; ry /= rLen; rz /= rLen;

    if (lonePairs === 1) {
        const pt = projectFramed3D({ x: a.x + rx * 0.72, y: a.y + ry * 0.72, z: a.z + rz * 0.72 });
        lpTargets.push(pt);
      } else {
        let ref = neighborVecs[idx][0] || { x: 1, y: 0, z: 0 };
        let px = ry * ref.z - rz * ref.y;
        let py = rz * ref.x - rx * ref.z;
        let pz = rx * ref.y - ry * ref.x;
        let pLen = Math.hypot(px, py, pz);
        if (pLen < 0.05) {
          ref = Math.abs(rx) < 0.8 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 };
          px = ry * ref.z - rz * ref.y;
          py = rz * ref.x - rx * ref.z;
          pz = rx * ref.y - ry * ref.x;
          pLen = Math.hypot(px, py, pz) || 1;
        }
        px /= pLen; py /= pLen; pz /= pLen;

        if (lonePairs === 2) {
          const cosA = 0.62;
          const sinA = 0.78;
          [1, -1].forEach(sign => {
            const dx = (rx * cosA + px * sinA * sign) * 0.72;
            const dy = (ry * cosA + py * sinA * sign) * 0.72;
            const dz = (rz * cosA + pz * sinA * sign) * 0.72;
            lpTargets.push(projectFramed3D({ x: a.x + dx, y: a.y + dy, z: a.z + dz }));
          });
        } else {
          const qx = ry * pz - rz * py;
          const qy = rz * px - rx * pz;
          const qz = rx * py - ry * px;
          const cosA = 0.34;
          const sinA = 0.94;
          for (let k = 0; k < lonePairs; k++) {
            const theta = (2 * Math.PI * k) / lonePairs;
            const cosT = Math.cos(theta);
            const sinT = Math.sin(theta);
            const ox = px * cosT + qx * sinT;
            const oy = py * cosT + qy * sinT;
            const oz = pz * cosT + qz * sinT;
            const dx = (rx * cosA + ox * sinA) * 0.72;
            const dy = (ry * cosA + oy * sinA) * 0.72;
            const dz = (rz * cosA + oz * sinA) * 0.72;
            lpTargets.push(projectFramed3D({ x: a.x + dx, y: a.y + dy, z: a.z + dz }));
          }
        }
      }
    }

    return { idx, type: a.type, delta: netDelta[idx], qSpec, lpTargets, proj };
  });

  // Zソート用の描画リスト（棒を排し、量子電子雲と原子核コアを奥行き順に統合）
  const drawList = [];

  projectedAtoms.forEach(pa => {
    if (pa.proj && pa.proj.visible) {
      drawList.push({
        kind: "atom",
        depth: pa.proj.depth,
        data: pa
      });
    }
  });

  model.bonds.forEach((b, bIdx) => {
    const pA = projectedAtoms[b.from];
    const pB = projectedAtoms[b.to];
    if (pA && pB && pA.proj && pB.proj && pA.proj.visible && pB.proj.visible) {
      const midDepth = (pA.proj.depth + pB.proj.depth) * 0.5;
      drawList.push({
        kind: "bondCloud",
        depth: midDepth,
        data: {
          pA: pA.proj,
          pB: pB.proj,
          order: b.order,
          metric: bondMetrics[bIdx] || { enthalpy: 340, enDiff: 0, shift: 0 }
        }
      });
    }
  });

  drawList.sort((a, b) => b.depth - a.depth);

drawList.forEach(item => {
    if (item.kind === "bondCloud") {
      const { pA, pB, order, metric } = item.data;
      const dx = pB.x - pA.x;
      const dy = pB.y - pA.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const avgScale = (pA.scale + pB.scale) * 0.5;

      if (isClassic3D) {
        // なじみのある立体化学構造式モード（単線・二重線・三重線の立体バー）
        const lineW = Math.max(2.0, Math.min(4.2, avgScale * 0.032 * visualScale));
        const gap = Math.max(3.6, Math.min(7.5, avgScale * 0.055 * visualScale));
        const offsets = order === 1 ? [0] : (order === 2 ? [-gap * 0.55, gap * 0.55] : [-gap, 0, gap]);

        ctx.save();
        ctx.lineCap = "round";
        offsets.forEach(off => {
          ctx.strokeStyle = "rgba(15, 23, 42, 0.85)";
          ctx.lineWidth = lineW + 2.2;
          ctx.beginPath();
          ctx.moveTo(pA.x + nx * off, pA.y + ny * off);
          ctx.lineTo(pB.x + nx * off, pB.y + ny * off);
          ctx.stroke();

          ctx.strokeStyle = order >= 2 ? "#7dd3fc" : "#e2e8f0";
          ctx.lineWidth = lineW;
          ctx.beginPath();
          ctx.moveTo(pA.x + nx * off, pA.y + ny * off);
          ctx.lineTo(pB.x + nx * off, pB.y + ny * off);
          ctx.stroke();
        });
        ctx.restore();
      } else {
        // 棒の代わりに2Dインスペクタと同一のガウス減衰・共有電子対ミストを描画（結合強度連動）
        const bde = metric.enthalpy || 340;
        const isWeakBond = bde <= 205;
        const isFragileBond = bde > 205 && bde < 270;
        const isRigidBond = bde >= 400;

        const densityFactor = isWeakBond ? 0.42 : (isFragileBond ? 0.72 : (isRigidBond ? 1.32 : 1.0));
        const spreadFactor = isWeakBond ? 1.28 : (isFragileBond ? 1.12 : (isRigidBond ? 0.86 : 1.0));
        const flickerPulse = isWeakBond ? (0.55 + 0.45 * Math.sin(performance.now() * 0.012)) : 1.0;

        const dotCount = Math.min(260, Math.max(24, Math.round(95 * order * densityFactor)));
        const latSigma = (order === 1 ? 0.068 : 0.125) * avgScale * spreadFactor * visualScale;
        const polarPower = Math.abs(metric.enDiff) < 0.08 ? 1.0 : (metric.enDiff > 0 ? 0.76 : 1.32);

        for (let i = 0; i < dotCount; i++) {
          const t = Math.pow(Math.random(), polarPower);
          const lateral = gauss() * latSigma;
          const px = pA.x + dx * t + nx * lateral;
          const py = pA.y + dy * t + ny * lateral;

          const endFade = Math.sin(Math.PI * (0.12 + t * 0.76));
          const latFade = Math.exp(-(lateral * lateral) / (2 * latSigma * latSigma));
          const isPiRegion = order > 1 && Math.abs(lateral) > latSigma * 0.62;

          ctx.fillStyle = isPiRegion ? "#a855f7" : "#22d3ee";
          ctx.globalAlpha = endFade * latFade * (0.35 + Math.random() * 0.65) * flickerPulse;
          const dotSize = isRigidBond ? 1.48 : (isWeakBond ? 1.15 : 1.35);
          ctx.fillRect(px, py, dotSize, dotSize);
        }
        ctx.globalAlpha = 1.0;
      }

      // テレメトリON時: 結合エネルギー（強度別カラー）と電子偏り方向タグ
      if (showTele) {
        const bde = metric.enthalpy || 340;
        const isWeakBond = bde <= 205;
        const isFragileBond = bde > 205 && bde < 270;
        const isRigidBond = bde >= 400;
        const midX = (pA.x + pB.x) * 0.5;
        const midY = (pA.y + pB.y) * 0.5;
        const polMark = Math.abs(metric.enDiff) < 0.08 ? "=" : (metric.enDiff > 0 ? ">" : "<");
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(2, 6, 23, 0.78)";
        ctx.fillRect(midX - 20, midY - 6, 40, 12);
        if (isWeakBond) {
          ctx.fillStyle = "#f87171";
        } else if (isFragileBond) {
          ctx.fillStyle = "#fbbf24";
        } else if (order > 1) {
          ctx.fillStyle = "#e879f9";
        } else if (isRigidBond) {
          ctx.fillStyle = "#34d399";
        } else {
          ctx.fillStyle = "#67e8f9";
        }
        ctx.fillText(`${metric.enthalpy}${polMark}`, midX, midY);
      }
    } else {
      const { type, delta, qSpec, lpTargets, proj } = item.data;
      const spec = ELEMENTS[type] || { symbol: type, color: "#475569", strokeColor: "#cbd5e1", textColor: "#f8fafc" };

      if (isClassic3D) {
        // なじみのある立体化学構造式モード（元素記号入り立体球）
        const sphereR = Math.max(9, Math.min(24, (qSpec.z === 1 ? 0.14 : 0.20) * proj.scale * visualScale));
        ctx.save();
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, sphereR, 0, Math.PI * 2);
        ctx.fillStyle = spec.color || qSpec.coreColor;
        ctx.fill();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = spec.strokeColor || "#e2e8f0";
        ctx.stroke();

        ctx.fillStyle = spec.textColor || "#f8fafc";
        ctx.font = `bold ${Math.max(10, Math.round(sphereR * 0.95))}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(spec.symbol, proj.x, proj.y);

        if (showTele) {
          const dSign = delta > 0.01 ? "+" : "";
          const tagText = Math.abs(delta) <= 0.01 ? "d0.00" : `d${dSign}${delta.toFixed(2)}`;
          ctx.font = "9px monospace";
          ctx.fillStyle = delta < -0.01 ? "#fbbf24" : (delta > 0.01 ? "#38bdf8" : "#94a3b8");
          ctx.fillText(tagText, proj.x, proj.y + sphereR + 9);
        }
        ctx.restore();
      } else {
        const coreR = Math.max(3.2, (qSpec.z === 1 ? 0.065 : 0.095) * proj.scale * visualScale);

        // 1. テレメトリON時: 電子密度偏り(delta+ / delta-)の極薄量子ハロー
        if (showTele && Math.abs(delta) > 0.02) {
          const intensity = Math.min(1, Math.abs(delta) * 2.2);
          const haloR = coreR * (3.2 + intensity * 1.4);
          const haloGrad = ctx.createRadialGradient(proj.x, proj.y, coreR, proj.x, proj.y, haloR);
          if (delta < 0) {
            haloGrad.addColorStop(0, `rgba(245, 158, 11, ${0.32 * intensity})`);
            haloGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
          } else {
            haloGrad.addColorStop(0, `rgba(56, 189, 248, ${0.32 * intensity})`);
            haloGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
          }
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = haloGrad;
          ctx.fill();
        }

        // 2. 内殻(1s)高密度コア・ミスト（C, N, O）
        if (qSpec.z > 1) {
          const innerSpread = coreR * 1.65;
          for (let i = 0; i < 36; i++) {
            const r = Math.abs(gauss()) * innerSpread;
            const theta = Math.random() * Math.PI * 2;
            const fade = Math.exp(-r / (innerSpread * 1.3));
            ctx.fillStyle = "#94a3b8";
            ctx.globalAlpha = fade * 0.72;
            ctx.fillRect(proj.x + Math.cos(theta) * r, proj.y + Math.sin(theta) * r, 1.2, 1.2);
          }
        }

        // 3. 非共有電子対（ローンペア）の3Dガウス減衰アンバーミスト
        lpTargets.forEach(lpPt => {
          if (!lpPt || !lpPt.visible) return;
          const ldx = lpPt.x - proj.x;
          const ldy = lpPt.y - proj.y;
          const lLen = Math.hypot(ldx, ldy) || 1;
          const lAngle = Math.atan2(ldy, ldx);

          for (let i = 0; i < 60; i++) {
            const dist = coreR * 1.1 + Math.abs(gauss()) * (lLen * 0.58);
            const angSpread = gauss() * 0.34;
            const px = proj.x + Math.cos(lAngle + angSpread) * dist;
            const py = proj.y + Math.sin(lAngle + angSpread) * dist;
            const fade = Math.exp(-Math.max(0, dist - coreR) / (lLen * 0.85)) * Math.exp(-(angSpread * angSpread) / 0.2);

            ctx.fillStyle = "#fbbf24";
            ctx.globalAlpha = fade * (0.3 + Math.random() * 0.65);
            ctx.fillRect(px, py, 1.25, 1.25);
          }
        });

        ctx.globalAlpha = 1.0;

        // 4. 原子核コア点描画（2Dインスペクタと統一されたコアスタイル）
        ctx.fillStyle = qSpec.coreColor;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 元素記号および部分電荷(delta)タグ
        ctx.font = `bold ${Math.max(10, Math.round(coreR * 1.55))}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(spec.symbol, proj.x, proj.y - coreR - 8);

        if (showTele) {
          const dSign = delta > 0.01 ? "+" : "";
          const tagText = Math.abs(delta) <= 0.01 ? "d0.00" : `d${dSign}${delta.toFixed(2)}`;
          ctx.font = "9px monospace";
          ctx.fillStyle = delta < -0.01 ? "#fbbf24" : (delta > 0.01 ? "#38bdf8" : "#94a3b8");
          ctx.fillText(tagText, proj.x, proj.y + coreR + 9);
        }
      }
    }
  });

// 3D空間左上: 分子名・化学式タイトルHUD（テレメトリON/OFFに関わらず最上段に表示）
  const ev = chemState.lastEvaluation;
  const hasAtoms = Array.isArray(chemState.atoms) && chemState.atoms.length > 0;
  const molObj = ev && (ev.matchedMolecule || ev.molecule || ev.targetMolecule);
  const molName = (molObj && molObj.name) || (ev && (ev.name || ev.moleculeName)) || "";
  const molFormula = (molObj && molObj.formula) || (ev && (ev.formula || ev.molecularFormula)) || "";
  const isMatched = Boolean(ev && ev.status === "STABLE_MATCH");
  const showTitleHud = Boolean(hasAtoms && (molName || molFormula));
  let teleOffsetY = 0;

  if (showTitleHud) {
    ctx.save();
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const titleLabel = isMatched
      ? (molName || "同定完了分子")
      : (molName ? `${molName} (構築中)` : `構築中 [${molFormula}]`);
    const formulaLabel = isMatched
      ? `${molFormula}  [STABLE MATCH]`
      : `FORMULA: ${molFormula}`;

    if (w < 520) {
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = isMatched ? "#f8fafc" : "#cbd5e1";
      ctx.fillText(titleLabel, 8, 6);
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = isMatched ? "#38bdf8" : "#94a3b8";
      ctx.fillText(formulaLabel, 8, 20);
      teleOffsetY = 32;
    } else {
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = isMatched ? "#f8fafc" : "#cbd5e1";
      ctx.fillText(titleLabel, 10, 10);
      ctx.font = "bold 12.5px monospace";
      ctx.fillStyle = isMatched ? "#38bdf8" : "#94a3b8";
      ctx.fillText(formulaLabel, 10, 29);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, 46);
      ctx.lineTo(250, 46);
      ctx.stroke();
      teleOffsetY = 42;
    }
    ctx.restore();
  }

  // 3D空間左上: 画面幅に応じたテレメトリHUD（狭い画面では分子に被らない2行コンパクト表示）
  if (showTele) {
    const stab = (typeof analyzeBondStability === "function")
      ? analyzeBondStability(chemState.atoms, chemState.bonds)
      : { weakestLabel: "-", weakestBde: 0, strongestLabel: "-", strongestBde: 0, tier: "MODERATE", tierLabel: "STANDARD" };

    const tierColorMap = {
      TRANSIENT: "#f87171",
      FRAGILE: "#fbbf24",
      MODERATE: "#38bdf8",
      RIGID: "#34d399"
    };
    const weakColor = stab.weakestBde <= 205 ? "#f87171" : (stab.weakestBde < 270 ? "#fbbf24" : "#38bdf8");
    const tierColor = tierColorMap[stab.tier] || "#94a3b8";

    ctx.save();
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    if (w < 520) {
      ctx.font = "9.5px monospace";
      ctx.fillStyle = "#34d399";
      ctx.fillText(`BDE:-${totalBDE}kJ | ${isPolar ? `POLAR(${dipoleMag.toFixed(2)})` : "NON-POLAR"}`, 8, 6 + teleOffsetY);
      ctx.fillStyle = weakColor;
      ctx.fillText(`WEAK:${stab.weakestLabel}(${stab.weakestBde}) [${stab.tier}]`, 8, 19 + teleOffsetY);
    } else {
      ctx.font = "10.5px monospace";
      ctx.fillStyle = "#22d3ee";
      ctx.fillText(`[3D QUANTUM CLOUD TELEMETRY: ACTIVE]`, 10, 10 + teleOffsetY);
      ctx.fillStyle = "#34d399";
      ctx.fillText(`TOTAL BDE     : -${totalBDE} kJ/mol`, 10, 24 + teleOffsetY);
      ctx.fillStyle = weakColor;
      ctx.fillText(`WEAKEST BOND  : ${stab.weakestLabel} (${stab.weakestBde} kJ/mol)`, 10, 38 + teleOffsetY);
      ctx.fillStyle = "#34d399";
      ctx.fillText(`STRONGEST BOND: ${stab.strongestLabel} (${stab.strongestBde} kJ/mol)`, 10, 52 + teleOffsetY);
      ctx.fillStyle = tierColor;
      ctx.fillText(`STABILITY TIER: ${stab.tierLabel}`, 10, 66 + teleOffsetY);
      ctx.fillStyle = isPolar ? "#fbbf24" : "#94a3b8";
      ctx.fillText(`POLARITY      : ${isPolar ? `POLAR (|u|=${dipoleMag.toFixed(2)} D-eq)` : "NON-POLAR (Symmetric)"}`, 10, 80 + teleOffsetY);
      ctx.fillStyle = "#64748b";
      ctx.fillText(`CLOUD KEY     : [CYAN:sigma / PURPLE:pi / AMBER:LonePair]`, 10, 94 + teleOffsetY);
    }
    ctx.restore();
  }
}

// ======================================================================
// 【第6章：UIレンダラー ＆ パネル同期モジュール (UI & Inspectors)】
// リアルタイム判定ステータス表示、発見済みカウンター、解説同期
// ======================================================================
function syncInspectorUI() {
  const res = chemState.lastEvaluation;
  const badgeEl = document.getElementById("status-badge");
  const msgEl = document.getElementById("status-message");
  const detailEl = document.getElementById("molecule-detail");
  const countEl = document.getElementById("atom-count-label");
  const discEl = document.getElementById("discovery-counter");
  const drillBanner = document.getElementById("drill-banner");

if (countEl) countEl.textContent = `原子数: ${chemState.atoms.length} / ${CHEM_ENV.MAX_ATOMS}`;
  if (discEl) discEl.textContent = `発見済み分子: ${chemState.discoveredIds.size} / ${MOLECULE_DB.length}`;
  renderDynamicHintGuide();

  if (drillBanner) {
    if (chemState.drill.active && chemState.drill.currentMission) {
      const m = chemState.drill.currentMission;
      const isSolved = res && res.status === "STABLE_MATCH" && res.molecule && res.molecule.id === m.targetId;
      drillBanner.style.display = "block";
      if (chemState.drill.showingAnswer) {
        drillBanner.style.borderLeftColor = "#f59e0b";
        drillBanner.textContent = `[DRILL Lv.${m.level}/5 | 模範解答表示中] 目標: ${m.targetMolecule.name} (${m.targetMolecule.formula})`;
      } else if (isSolved) {
        drillBanner.style.borderLeftColor = "#10b981";
        drillBanner.textContent = `[MISSION CLEAR - Lv.${m.level}/5] 目標達成: ${m.targetMolecule.name} を正確に構築しました。`;
      } else {
        drillBanner.style.borderLeftColor = "#38bdf8";
        drillBanner.textContent = `[DRILL Lv.${m.level}/5 | ${m.modeLabel}] ${m.symptomHint}`;
      }
    } else {
      drillBanner.style.display = "none";
    }
  }

  if (!res) return;
  if (badgeEl) {
    badgeEl.textContent = res.status;
    badgeEl.className = res.status;
  }
  if (msgEl) msgEl.textContent = res.message;

if (detailEl) {
    if (res.status === "STABLE_MATCH" && res.molecule) {
      detailEl.textContent = `立体形状: ${res.molecule.geometry} | ${res.molecule.desc}`;
    } else {
      detailEl.textContent = "立体構造情報: すべての原子の手の数を過不足なく繋ぐと3D立体モデルが生成されます。";
    }
  }

  updateQuantumInspectorUI();
}

function refreshSimulation() {
  chemState.lastEvaluation = evaluateMoleculeState();
  renderFunctionalBlockDock();
  syncInspectorUI();
  render2DCanvas();
  render3DViewer();
}
// ======================================================================
// 【第7章：ユーザー操作イベント ＆ アプリケーション制御 (Interaction & Loop)】
// タッチ＆マウス統合(Pointer Events)、2D配置/結線/移動/切替、3D回転/ピンチズーム
// ======================================================================
function findAtomAt(x, y) {
  for (let i = chemState.atoms.length - 1; i >= 0; i--) {
    const a = chemState.atoms[i];
    if (Math.hypot(a.x - x, a.y - y) <= CHEM_ENV.HIT_RADIUS_ATOM) {
      return a;
    }
  }
  return null;
}

function pointToSegmentDist(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

function findBondAt(x, y) {
  for (let i = chemState.bonds.length - 1; i >= 0; i--) {
    const b = chemState.bonds[i];
    const a1 = chemState.atoms.find(a => a.id === b.from);
    const a2 = chemState.atoms.find(a => a.id === b.to);
    if (!a1 || !a2) continue;
    if (pointToSegmentDist(x, y, a1.x, a1.y, a2.x, a2.y) <= CHEM_ENV.HIT_DIST_BOND) {
      return b;
    }
  }
  return null;
}

function setup2DInteractions() {
  const canvas = document.getElementById("canvas-2d");
  const viewport = document.getElementById("canvas-2d-viewport");
  if (!canvas) return;

  const panState = {
    active: false,
    startClientX: 0,
    startClientY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
    hasPanned: false
  };

const getLocalPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const z = chemState.zoom2D || 1.0;
    return { x: (e.clientX - rect.left) / z, y: (e.clientY - rect.top) / z };
  };
  canvas.addEventListener("pointerdown", (e) => {
    const pos = getLocalPos(e);
    const hitAtom = findAtomAt(pos.x, pos.y);
    if (hitAtom) {
      chemState.inspector.targetAtomId = hitAtom.id;
      updateQuantumInspectorUI();
      render2DCanvas();
    }
    canvas.setPointerCapture(e.pointerId);

    const isLockedAnswer = chemState.drill.active && chemState.drill.showingAnswer;

    if (!isLockedAnswer && chemState.isEraseMode) {
      if (hitAtom) {
        removeAtom(hitAtom.id);
        refreshSimulation();
        return;
      }
      const hitBond = findBondAt(pos.x, pos.y);
      if (hitBond) {
        saveSnapshot();
        chemState.bonds = chemState.bonds.filter(b => b !== hitBond);
        refreshSimulation();
        return;
      }
    }

if (!isLockedAnswer && hitAtom) {
      chemState.dragState = {
        activeAtomId: hitAtom.id,
        startX: pos.x,
        startY: pos.y,
        currX: pos.x,
        currY: pos.y,
        hasMoved: false
      };
      return;
    }
    const hitBond = findBondAt(pos.x, pos.y);
    if (!isLockedAnswer && hitBond) {
      cycleBondByInstance(hitBond);
      refreshSimulation();
      return;
    }

    // 空白タッチ開始: ドラッグならパズル面スクロール、短タップなら原子配置
    panState.active = true;
    panState.startClientX = e.clientX;
    panState.startClientY = e.clientY;
    panState.startScrollLeft = viewport ? viewport.scrollLeft : 0;
    panState.startScrollTop = viewport ? viewport.scrollTop : 0;
    panState.hasPanned = false;
  });

  canvas.addEventListener("pointermove", (e) => {
    const ds = chemState.dragState;
    if (ds.activeAtomId) {
      const pos = getLocalPos(e);
      ds.currX = pos.x;
      ds.currY = pos.y;
      if (Math.hypot(pos.x - ds.startX, pos.y - ds.startY) > CHEM_ENV.DRAG_THRESHOLD) {
        ds.hasMoved = true;
      }
      render2DCanvas();
      return;
    }

    if (panState.active && viewport) {
      const dx = e.clientX - panState.startClientX;
      const dy = e.clientY - panState.startClientY;
      if (!panState.hasPanned && Math.hypot(dx, dy) > CHEM_ENV.DRAG_THRESHOLD) {
        panState.hasPanned = true;
      }
      if (panState.hasPanned) {
        viewport.scrollLeft = panState.startScrollLeft - dx;
        viewport.scrollTop = panState.startScrollTop - dy;
      }
    }
  });

  const endPointer = (e) => {
    const ds = chemState.dragState;
    if (ds.activeAtomId) {
      const pos = getLocalPos(e);
      const srcAtom = chemState.atoms.find(a => a.id === ds.activeAtomId);

      if (srcAtom && ds.hasMoved) {
        const targetAtom = findAtomAt(pos.x, pos.y);
        if (targetAtom && targetAtom.id !== srcAtom.id) {
          addOrCycleBond(srcAtom.id, targetAtom.id);
       } else {
          saveSnapshot();
          const pad = CHEM_ENV.GRID_PITCH;
          const maxW = CHEM_ENV.GRID_PITCH * CHEM_ENV.WORKSPACE_COLS;
          const maxH = CHEM_ENV.GRID_PITCH * CHEM_ENV.WORKSPACE_ROWS;
          srcAtom.x = snapToGrid(Math.max(pad, Math.min(maxW - pad, pos.x)));
          srcAtom.y = snapToGrid(Math.max(pad, Math.min(maxH - pad, pos.y)));
        }
      }

      chemState.dragState.activeAtomId = null;
      chemState.dragState.hasMoved = false;
      refreshSimulation();
      return;
    }

 if (panState.active) {
      const wasTap = !panState.hasPanned;
      panState.active = false;
      panState.hasPanned = false;

      if (wasTap && !chemState.isEraseMode && !chemState.drill.active) {
        const pos = getLocalPos(e);
        if (placeSelectedBatch(pos.x, pos.y)) {
          refreshSimulation();
        }
      }
    }
  };

  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
}


function setup3DInteractions() {
  const canvas = document.getElementById("canvas-3d");
  if (!canvas) return;

  const activePointers = new Map();
  let lastPinchDist = null;

canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    camera3D.isDragging = true;
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.size === 2) {
      const pts = Array.from(activePointers.values());
      lastPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }
  });


  canvas.addEventListener("pointermove", (e) => {
    if (!activePointers.has(e.pointerId)) return;
    const prev = activePointers.get(e.pointerId);
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.size === 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      camera3D.rotY += dx * CHEM_ENV.ROTATE_SENSITIVITY;
      camera3D.rotX += dy * CHEM_ENV.ROTATE_SENSITIVITY;

      const limit = Math.PI / 2 - 0.01;
      camera3D.rotX = Math.max(-limit, Math.min(limit, camera3D.rotX));
      const PI2 = Math.PI * 2;
      camera3D.rotY = (camera3D.rotY % PI2 + PI2) % PI2;
      render3DViewer();
    } else if (activePointers.size === 2) {
      const pts = Array.from(activePointers.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (lastPinchDist && dist > 0) {
        camera3D.zoom = Math.max(0.4, Math.min(2.5, camera3D.zoom * (dist / lastPinchDist)));
        const slider = document.getElementById("zoom-slider");
        if (slider) slider.value = camera3D.zoom.toFixed(2);
        render3DViewer();
      }
      lastPinchDist = dist;
    }
  });

const endPointer = (e) => {
    activePointers.delete(e.pointerId);
    if (activePointers.size === 0) camera3D.isDragging = false;
    if (activePointers.size < 2) lastPinchDist = null;
  };

  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);

  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    camera3D.zoom *= (e.deltaY > 0 ? 0.92 : 1.08);
    camera3D.zoom = Math.max(0.4, Math.min(2.5, camera3D.zoom));
    const slider = document.getElementById("zoom-slider");
    if (slider) slider.value = camera3D.zoom.toFixed(2);
    render3DViewer();
  }, { passive: false });
}

function ensureQuantumInspectorHUD() {
  const canvas2d = document.getElementById("canvas-2d");
  const host = document.getElementById("puzzle-stage") || ((canvas2d && canvas2d.parentElement) ? canvas2d.parentElement : document.body);
  if (host !== document.body && getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }
  let hud = document.getElementById("quantum-inspector-hud");
  if (!hud) {
    hud = document.createElement("div");
    hud.id = "quantum-inspector-hud";
    hud.innerHTML = `
      <div id="qi-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(34,211,238,0.35); padding-bottom:4px; margin-bottom:6px; color:#22d3ee; font-weight:bold;">
        <span id="qi-target-title">TARGET: NONE [STANDBY]</span>
        <span id="qi-mode-tag" style="font-size:10px; color:#34d399; margin-left:10px;">[CLOUD: LIVE]</span>
      </div>
      <div style="display:flex; gap:10px; align-items:flex-start;">
        <div style="flex-shrink:0; text-align:center;">
          <canvas id="quantum-cloud-canvas" width="116" height="116" style="border:1px solid rgba(34,211,238,0.4); background:#020617 !important; display:block;"></canvas>
          <div style="font-size:9px; color:#64748b; margin-top:2px;">MONTE-CARLO ORBITAL</div>
        </div>
        <div id="qi-basic-info" style="min-width:190px; color:#a7f3d0;"></div>
      </div>
      <div id="qi-deep-info" style="display:none; margin-top:8px; padding-top:6px; border-top:1px dashed rgba(34,211,238,0.4); color:#e2e8f0; max-height:240px; overflow-y:auto;"></div>
    `;
  }

  hud.style.cssText = [
    host !== document.body ? "position: absolute" : "position: fixed",
    "right: 12px",
    host !== document.body ? "bottom: 12px" : "bottom: 54px",
    "z-index: 40",
    "background: rgba(2, 6, 23, 0.94)",
    "border: 1px solid #22d3ee",
    "box-shadow: 0 0 14px rgba(34, 211, 238, 0.25)",
    "color: #34d399",
    "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "font-size: 11px",
    "line-height: 1.45",
    "padding: 8px 10px",
    "border-radius: 4px",
    "max-width: calc(100% - 24px)",
    "pointer-events: auto"
  ].join(";");

  if (hud.parentElement !== host) {
    host.appendChild(hud);
  }
  startQuantumCloudLoop();
}

function updateQuantumInspectorUI() {
  ensureQuantumInspectorHUD();
  const hud = document.getElementById("quantum-inspector-hud");
  if (!hud) return;

  hud.style.display = chemState.inspector.visible ? "block" : "none";
  if (!chemState.inspector.visible) return;

  let targetAtom = chemState.atoms.find(a => a.id === chemState.inspector.targetAtomId);
  if (!targetAtom && chemState.atoms.length > 0) {
    targetAtom = chemState.atoms[0];
    chemState.inspector.targetAtomId = targetAtom.id;
  }

  const titleEl = document.getElementById("qi-target-title");
  const basicEl = document.getElementById("qi-basic-info");
  const deepEl = document.getElementById("qi-deep-info");

  if (!targetAtom) {
    if (titleEl) titleEl.textContent = "TARGET: NONE [WAITING]";
    if (basicEl) basicEl.innerHTML = "<div>STATUS: 原子を配置またはタップしてロックオン</div>";
    if (deepEl) deepEl.style.display = "none";
    return;
  }

  const q = analyzeAtomQuantumState(targetAtom);
  const stateTag = q.isBonded ? "BONDED" : "ISOLATED";
  if (titleEl) {
    titleEl.textContent = `TARGET: ${targetAtom.id} [${q.spec.enName} / ${stateTag}]`;
  }

  const handBar = "#".repeat(Math.min(q.usedValence, q.maxValence)) + "-".repeat(Math.max(0, q.maxValence - q.usedValence));
  const deltaSign = q.deltaCharge > 0.01 ? "+" : "";

  if (basicEl) {
    basicEl.innerHTML = `
      <div style="color:#22d3ee;">Z=${q.spec.z} | ${q.stabilityLabel}</div>
      <div>HANDS : [${handBar}] (${q.usedValence}/${q.maxValence})</div>
      <div>OCTET : ${q.spec.valenceElectrons}/${q.spec.targetOctet} -> <span style="color:#38bdf8; font-weight:bold;">${q.totalShellElectrons}/${q.spec.targetOctet} e-</span></div>
      <div>PHASE : <span style="color:#94a3b8;">ISOLATED</span> -> <span style="color:#34d399;">${q.hybridization}</span></div>
      <div>CHARGE: 0.00 -> <span style="color:#fbbf24;">delta ${deltaSign}${q.deltaCharge.toFixed(2)}</span> (FC:${q.formalCharge >= 0 ? "+" + q.formalCharge : q.formalCharge})</div>
    `;
  }

if (deepEl) {
    if (!chemState.inspector.deepSpec) {
      deepEl.style.display = "none";
    } else {
      deepEl.style.display = "block";
      const linkLines = q.neighbors.length > 0
        ? q.neighbors.map(n => `LINK -> ${n.id}(${n.type}) [${n.order} | ${n.bondDistPm}pm | -${n.enthalpy}kJ]`).join("<br>")
        : "LINK -> NONE (FREE ATOMIC STATE)";

      deepEl.innerHTML = `
        <div style="color:#22d3ee; font-weight:bold; margin:4px 0 2px;">[STATE TRANSITION: PRE -> POST]</div>
        <div style="display:flex; flex-direction:column; gap:2px; font-size:10.5px;">
          <div>CONFIG: <span style="color:#94a3b8;">${q.spec.baseConfig}</span> -> <span style="color:#38bdf8;">${q.bondedConfig}</span></div>
          <div>VSEPR : <span style="color:#94a3b8;">AX0</span> -> <span style="color:#38bdf8;">${q.vseprCode}</span> (${q.idealAngle})</div>
          <div>LONE  : ${Math.floor(q.spec.valenceElectrons / 2)} -> ${q.lonePairs} pairs (${q.ownNonBonding} e-)</div>
          <div>OXID  : 0 -> <span style="color:#fbbf24;">${q.oxidationSum >= 0 ? "+" + q.oxidationSum : q.oxidationSum}</span></div>
          <div>ENERGY: 0 -> <span style="color:#34d399;">-${q.totalBondEnergy} kJ/mol</span></div>
        </div>
        <div style="color:#22d3ee; font-weight:bold; margin:4px 0 2px;">[PHYSICAL CONSTANTS]</div>
        <div style="display:flex; flex-direction:column; gap:2px; font-size:10.5px; color:#cbd5e1;">
          <div>MASS  : ${q.spec.atomicMass} | SHELLS: ${q.spec.shells}</div>
          <div>RADIUS: Cov ${q.spec.covalentRadius}pm / VdW ${q.spec.vdwRadius}pm</div>
          <div>EN    : Pauling ${q.spec.paulingEN.toFixed(2)} / Mulliken ${q.spec.mullikenEN}</div>
          <div>ION/AF: IE ${q.spec.ionizationEnergy} / EA ${q.spec.electronAffinity} kJ</div>
          <div>NMR   : ${q.spec.nmrIsotope}</div>
        </div>
        <div style="color:#22d3ee; font-weight:bold; margin:4px 0 2px;">[ACTIVE COVALENT TELEMETRY]</div>
        <div style="font-size:10px; color:#34d399;">${linkLines}</div>
      `;
    }
  }
}

function ensureInspectorButtons() {
  const undoBtn = document.getElementById("btn-undo");
  const rightGroup = undoBtn ? undoBtn.parentElement : null;
  if (!rightGroup) return;

  const createBtn = (id, text) => {
    let btn = document.getElementById(id);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = id;
      btn.textContent = text;
      rightGroup.insertBefore(btn, undoBtn);
    }
    return btn;
  };

createBtn("btn-inspector-toggle", "電子観察: ON");
  createBtn("btn-tele3d-toggle", "3Dテレメトリ: ON");
}

let hintFilterMode = "all";

function setHintFilterMode(mode) {
  hintFilterMode = mode === "undiscovered" ? "undiscovered" : "all";
  renderDynamicHintGuide();
}

function renderDynamicHintGuide() {
  if (typeof MOLECULE_DB === "undefined" || !Array.isArray(MOLECULE_DB)) return;
  const total = MOLECULE_DB.length;
  const discoveredSet = (typeof chemState !== "undefined" && chemState.discoveredIds) ? chemState.discoveredIds : new Set();
  const discoveredCount = MOLECULE_DB.filter(m => discoveredSet.has(m.id)).length;
  const undiscoveredCount = total - discoveredCount;

  const summaryTitle = document.getElementById("guide-summary-title");
  if (summaryTitle) {
    summaryTitle.textContent = `[GUIDE] 操作マニュアル ＆ 全${total}分子コンプリートヒント集（発見済: ${discoveredCount}/${total}）`;
  }
  const listTitle = document.getElementById("hint-list-title");
  if (listTitle) {
    listTitle.textContent = `全${total}分子 コンプリートヒント集`;
  }

  const btnAll = document.getElementById("hint-filter-all");
  const btnUndisc = document.getElementById("hint-filter-undiscovered");
  if (btnAll && btnUndisc) {
    btnAll.textContent = `すべて (${total})`;
    btnUndisc.textContent = `未発見のみ (${undiscoveredCount})`;
    const isAll = hintFilterMode === "all";
    btnAll.style.background = isAll ? "#0284c7" : "#1e293b";
    btnAll.style.borderColor = isAll ? "#38bdf8" : "#475569";
    btnAll.style.color = isAll ? "#f8fafc" : "#cbd5e1";
    btnUndisc.style.background = !isAll ? "#0284c7" : "#1e293b";
    btnUndisc.style.borderColor = !isAll ? "#38bdf8" : "#475569";
    btnUndisc.style.color = !isAll ? "#f8fafc" : "#cbd5e1";
  }

  const grid = document.getElementById("hint-grid-container");
  if (grid) {
    const items = MOLECULE_DB.map((mol, idx) => ({ mol, idx })).filter(({ mol }) => {
      if (hintFilterMode === "undiscovered") {
        return !discoveredSet.has(mol.id);
      }
      return true;
    });

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; color: #10b981; font-weight: bold;">全${total}分子をすべて発見しました。コンプリート達成です。</div>`;
    } else {
      grid.innerHTML = items.map(({ mol, idx }) => {
        const isFound = discoveredSet.has(mol.id);
        const badge = isFound
          ? `<span style="color: #10b981; font-weight: bold;">[発見済]</span> `
          : `<span style="color: #94a3b8;">[未発見]</span> `;
        const rowStyle = isFound ? ` style="opacity: 0.78;"` : "";
        return `<div${rowStyle}>${badge}<b>${idx + 1}. ${mol.formula}（${mol.name}）:</b> ${mol.geometry || ""}</div>`;
      }).join("");
    }
  }
}


function syncDrillToolbarUI() {
  ensureInspectorButtons();
  renderDynamicHintGuide();
  chemState.inspector.deepSpec = true;  const isDrill = chemState.drill.active;
  const inspBtn = document.getElementById("btn-inspector-toggle");
  const tele3dBtn = document.getElementById("btn-tele3d-toggle");
const drillModeBtn = document.getElementById("btn-drill-mode");
  const typeBtn = document.getElementById("btn-drill-type");
  const levelBtn = document.getElementById("btn-drill-level");
  const nextBtn = document.getElementById("btn-next-drill");
  const ansBtn = document.getElementById("btn-answer-toggle");
  const elButtons = document.querySelectorAll(".el-btn");
  const isMarathon = chemState.drill.type === "MARATHON";

  if (inspBtn) {
    inspBtn.textContent = chemState.inspector.visible ? "電子観察: ON" : "電子観察: OFF";
    inspBtn.classList.toggle("active", chemState.inspector.visible);
  }

  if (tele3dBtn) {
    tele3dBtn.style.display = "inline-block";
    tele3dBtn.textContent = chemState.inspector.telemetry3D ? "3Dテレメトリ: ON" : "3Dテレメトリ: OFF";
    tele3dBtn.classList.toggle("active", chemState.inspector.telemetry3D);
  }

  if (drillModeBtn) {
    drillModeBtn.style.display = "inline-flex";
    drillModeBtn.textContent = isDrill ? "ドリル: ON" : "ドリル: OFF";
    drillModeBtn.classList.toggle("active", isDrill);
  }
  if (typeBtn) {
    typeBtn.style.display = "inline-flex";
    typeBtn.disabled = !isDrill;
    typeBtn.style.opacity = isDrill ? "1.0" : "0.38";
    typeBtn.textContent = isMarathon ? "91マラソン" : "基礎診断";
    typeBtn.classList.toggle("active", isDrill && isMarathon);
  }
  if (levelBtn) {
    const courseLabels = {
      EVOLUTION: "進化チェーン",
      FAMILY: "骨格ファミリー",
      ISOMER: "異性体・比較"
    };
    levelBtn.style.display = "inline-flex";
    levelBtn.disabled = !isDrill;
    levelBtn.style.opacity = isDrill ? "1.0" : "0.38";
    levelBtn.textContent = isMarathon
      ? (courseLabels[chemState.drill.marathonCourse] || "進化チェーン")
      : `Lv.${chemState.drill.level}`;
  }

  if (nextBtn) {
    nextBtn.style.display = "inline-flex";
    nextBtn.disabled = !isDrill;
    nextBtn.style.opacity = isDrill ? "1.0" : "0.38";
  }
  if (ansBtn) {
    ansBtn.style.display = "inline-flex";
    ansBtn.disabled = !isDrill;
    ansBtn.style.opacity = isDrill ? "1.0" : "0.38";
    ansBtn.textContent = chemState.drill.showingAnswer ? "答え: ON" : "答え: OFF";
    ansBtn.classList.toggle("active", chemState.drill.showingAnswer && isDrill);
  }


  elButtons.forEach(btn => {
    btn.style.opacity = isDrill ? "0.45" : "1.0";
  });
}

const ELEMENT_SUBMENU_DEFS = {
  C: [
    { mode: "SINGLE", label: "C (単原子)", tone: "single" },
    { mode: "BENZENE", label: "ベンゼン環 (C6芳香環)", tone: "benzene" },
    { mode: "CYCLOHEXANE", label: "ヘキサ環 (C6飽和環)", tone: "cyclohexane" },
    { mode: "BLOCK:METHYL", label: "-CH3 (メチル基)", tone: "c-block" },
    { mode: "BLOCK:ETHYL", label: "-C2H5 (エチル基)", tone: "c-block" },
    { mode: "BLOCK:ALDEHYDE", label: "-CHO (アルデヒド基)", tone: "c-block" },
    { mode: "BLOCK:CARBOXYL", label: "-COOH (カルボキシ基)", tone: "c-block" },
    { mode: "BLOCK:PHENYL", label: "Ph- (フェニル基)", tone: "c-block" }
  ],
  O: [
    { mode: "SINGLE", label: "O (単原子)", tone: "single" },
    { mode: "BLOCK:HYDROXYL", label: "-OH (ヒドロキシ基)", tone: "o-block" }
  ],
  N: [
    { mode: "SINGLE", label: "N (単原子)", tone: "single" },
    { mode: "BLOCK:AMINO", label: "-NH2 (アミノ基)", tone: "n-block" }
  ],
  S: [
    { mode: "SINGLE", label: "S (単原子)", tone: "single" },
    { mode: "BLOCK:THIOL", label: "-SH (チオール基)", tone: "s-block" }
  ]
};

function renderFunctionalBlockDock() {
  const elGroup = document.getElementById("element-palette");
  if (!elGroup) return;

  const oldDivider = document.getElementById("palette-block-divider");
  if (oldDivider) oldDivider.remove();
  elGroup.querySelectorAll(".block-btn").forEach(b => b.remove());

  const modes = chemState.elementModes || { C: "SINGLE", O: "SINGLE", N: "SINGLE", S: "SINGLE" };

  elGroup.querySelectorAll(".el-btn[data-el]").forEach(elBtn => {
    const sym = elBtn.dataset.el;
    const active = !chemState.isEraseMode && chemState.selectedElements.has(sym);
    elBtn.classList.toggle("active", active);
    elBtn.classList.remove("c-mode-benzene", "c-mode-cyclohexane", "sub-mode-c-block", "sub-mode-o-block", "sub-mode-n-block", "sub-mode-s-block");

    const mode = modes[sym] || "SINGLE";
    if (mode === "BENZENE") {
      elBtn.textContent = "C6π";
      elBtn.classList.add("c-mode-benzene");
    } else if (mode === "CYCLOHEXANE") {
      elBtn.textContent = "C6σ";
      elBtn.classList.add("c-mode-cyclohexane");
    } else if (mode.startsWith("BLOCK:")) {
      const blkId = mode.slice(6);
      const blk = FUNCTIONAL_BLOCKS[blkId];
      elBtn.textContent = blk ? blk.label : `${sym} (${ELEMENTS[sym].valence})`;
      elBtn.classList.add(`sub-mode-${sym.toLowerCase()}-block`);
    } else if (ELEMENTS[sym]) {
      elBtn.textContent = `${sym} (${ELEMENTS[sym].valence})`;
    }
  });

  const subMenu = document.getElementById("carbon-mode-menu");
  if (subMenu && subMenu.dataset.targetEl) {
    const currentMode = modes[subMenu.dataset.targetEl] || "SINGLE";
    subMenu.querySelectorAll("button[data-mode]").forEach(mBtn => {
      mBtn.classList.toggle("active", mBtn.dataset.mode === currentMode);
    });
  }
}

function ensureElementButtons() {
  const elGroup = document.getElementById("element-palette");
  if (!elGroup) return;

  Object.keys(ELEMENTS).forEach(sym => {
    if (!elGroup.querySelector(`.el-btn[data-el="${sym}"]`)) {
      const btn = document.createElement("button");
      btn.className = "el-btn";
      btn.dataset.el = sym;
      btn.textContent = `${sym} (${ELEMENTS[sym].valence})`;
      elGroup.appendChild(btn);
    }
  });
  renderFunctionalBlockDock();
}
function applyFixedToolbarLayout() {
  // 左右ペインの上部ヘッダーバーを検出し高さを完全統一
  const puzzleStage = document.getElementById("puzzle-stage");
  const canvas2d = document.getElementById("canvas-2d");
  const leftHeader = (puzzleStage && puzzleStage.previousElementSibling)
    ? puzzleStage.previousElementSibling
    : (canvas2d ? canvas2d.previousElementSibling : null);

  const resetCamBtn = document.getElementById("btn-reset-cam");
  let rightHeader = null;
  let cur = resetCamBtn ? resetCamBtn.parentElement : null;
  while (cur && cur !== document.body) {
    if (cur.nextElementSibling && cur.nextElementSibling.querySelector("canvas")) {
      rightHeader = cur;
      break;
    }
    cur = cur.parentElement;
  }

  if (leftHeader) leftHeader.setAttribute("data-chemsim-pane-header", "aligned");
  if (rightHeader) rightHeader.setAttribute("data-chemsim-pane-header", "aligned");

  let styleEl = document.getElementById("chemsim-fixed-toolbar-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "chemsim-fixed-toolbar-style";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    [data-chemsim-pane-header="aligned"] {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      height: 32px !important;
      min-height: 32px !important;
      max-height: 32px !important;
      padding: 0 10px !important;
      box-sizing: border-box !important;
    }
    [data-chemsim-pane-header="aligned"] button {
      height: 22px !important;
      min-height: 22px !important;
      line-height: 1 !important;
      padding: 0 8px !important;
      font-size: 11px !important;
      margin: 0 !important;
    }
    [data-chemsim-pane-header="aligned"] input[type="range"] {
      height: 16px !important;
      margin: 0 4px !important;
      vertical-align: middle !important;
    }
  `;
}
function setupToolbarUI() {
  ensureElementButtons();
  ensureInspectorButtons();
  applyFixedToolbarLayout();
  ensureQuantumInspectorHUD();
 const elButtons = document.querySelectorAll(".el-btn[data-el]");
  const eraseBtn = document.getElementById("btn-erase-mode");
  const autoSnapBtn = document.getElementById("btn-autosnap-toggle");

const subMenu = document.getElementById("carbon-mode-menu");
  const elPalette = document.getElementById("element-palette");

  function closeElementSubMenu() {
    if (subMenu) {
      subMenu.classList.remove("open");
      subMenu.dataset.targetEl = "";
    }
  }

  function openElementSubMenu(sym, anchorBtn) {
    if (!subMenu || !ELEMENT_SUBMENU_DEFS[sym]) return;
    const modes = chemState.elementModes || { C: "SINGLE", O: "SINGLE", N: "SINGLE", S: "SINGLE" };
    const currentMode = modes[sym] || "SINGLE";
    subMenu.dataset.targetEl = sym;
    subMenu.innerHTML = ELEMENT_SUBMENU_DEFS[sym].map(opt => {
      const isAct = opt.mode === currentMode ? " active" : "";
      return `<button type="button" data-mode="${opt.mode}" data-tone="${opt.tone}" class="${isAct}">${opt.label}</button>`;
    }).join("");

    subMenu.querySelectorAll("button[data-mode]").forEach(mBtn => {
      mBtn.addEventListener("click", () => {
        if (chemState.drill.active) return;
        chemState.isEraseMode = false;
        if (eraseBtn) eraseBtn.classList.remove("active");
        const chosen = mBtn.dataset.mode || "SINGLE";
        chemState.elementModes[sym] = chosen;
        if (sym === "C") chemState.carbonMode = chosen;
        chemState.selectedElements.add(sym);
        closeElementSubMenu();
        renderFunctionalBlockDock();
      });
    });

    const scrollOffset = elPalette ? elPalette.scrollTop : 0;
    const topPos = Math.max(4, (anchorBtn ? anchorBtn.offsetTop - scrollOffset : 4));
    subMenu.style.top = `${topPos}px`;
    subMenu.classList.add("open");
  }

  elButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (chemState.drill.active) return;
      chemState.isEraseMode = false;
      if (eraseBtn) eraseBtn.classList.remove("active");
      const sym = btn.dataset.el;

      if (ELEMENT_SUBMENU_DEFS[sym] && subMenu) {
        const isAlreadySelected = chemState.selectedElements.has(sym);
        const isOpenForThis = subMenu.classList.contains("open") && subMenu.dataset.targetEl === sym;
        if (!isAlreadySelected) {
          chemState.selectedElements.add(sym);
          openElementSubMenu(sym, btn);
        } else if (!isOpenForThis) {
          openElementSubMenu(sym, btn);
        } else {
          chemState.selectedElements.delete(sym);
          closeElementSubMenu();
        }
      } else {
        closeElementSubMenu();
        if (chemState.selectedElements.has(sym)) {
          chemState.selectedElements.delete(sym);
        } else {
          chemState.selectedElements.add(sym);
        }
      }
      renderFunctionalBlockDock();
    });
  });

const canvas2dEl = document.getElementById("canvas-2d");
  const zoomSlider2dEl = document.getElementById("zoom-slider-2d");
  if (canvas2dEl) {
    canvas2dEl.addEventListener("pointerdown", closeElementSubMenu);
    canvas2dEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (!zoomSlider2dEl) return;
      const step = 0.1;
      const current = parseFloat(zoomSlider2dEl.value) || chemState.zoom2D || 1.0;
      const delta = e.deltaY < 0 ? step : -step;
      const next = Math.min(2.0, Math.max(0.4, Math.round((current + delta) * 10) / 10));
      if (next !== current) {
        zoomSlider2dEl.value = String(next);
        zoomSlider2dEl.dispatchEvent(new Event("input"));
      }
    }, { passive: false });
  }


  if (eraseBtn) {
    eraseBtn.addEventListener("click", () => {
      chemState.isEraseMode = !chemState.isEraseMode;
      eraseBtn.classList.toggle("active", chemState.isEraseMode);
      closeElementSubMenu();
    if (chemState.isEraseMode) {
        document.querySelectorAll("#element-palette .el-btn").forEach(b => b.classList.remove("active"));
      } else if (!chemState.drill.active) {
        renderFunctionalBlockDock();
      }
    });
  }

if (autoSnapBtn) {    autoSnapBtn.addEventListener("click", () => {
      chemState.autoSnap = !chemState.autoSnap;
      autoSnapBtn.textContent = chemState.autoSnap ? "自動スナップ: ON" : "自動スナップ: OFF";
      autoSnapBtn.classList.toggle("active", chemState.autoSnap);
    });
  }

  const inspBtn = document.getElementById("btn-inspector-toggle");
  if (inspBtn) {
    inspBtn.addEventListener("click", () => {
      chemState.inspector.visible = !chemState.inspector.visible;
      syncDrillToolbarUI();
      updateQuantumInspectorUI();
    });
  }

const deepBtn = document.getElementById("btn-deepspec-toggle");
  if (deepBtn) {
    deepBtn.addEventListener("click", () => {
      chemState.inspector.deepSpec = !chemState.inspector.deepSpec;
      syncDrillToolbarUI();
      updateQuantumInspectorUI();
    });
  }

  const tele3dBtn = document.getElementById("btn-tele3d-toggle");
  if (tele3dBtn) {
    tele3dBtn.addEventListener("click", () => {
      chemState.inspector.telemetry3D = !chemState.inspector.telemetry3D;
      syncDrillToolbarUI();
      render3DViewer();
    });
  }


const drillModeBtn = document.getElementById("btn-drill-mode");
  if (drillModeBtn) {
    drillModeBtn.addEventListener("click", () => {
      if (!chemState.drill.active) {
        startNewDrill(chemState.drill.level);
      } else {
        chemState.drill.active = false;
        chemState.drill.showingAnswer = false;
        chemState.drill.currentMission = null;
        syncDrillToolbarUI();
        refreshSimulation();
      }
    });
  }

  const typeBtn = document.getElementById("btn-drill-type");
  if (typeBtn) {
    typeBtn.addEventListener("click", () => {
      chemState.drill.type = chemState.drill.type === "BASIC" ? "MARATHON" : "BASIC";
      startNewDrill(chemState.drill.level);
    });
  }

  const levelBtn = document.getElementById("btn-drill-level");
  if (levelBtn) {
    levelBtn.addEventListener("click", () => {
      if (chemState.drill.type === "BASIC") {
        chemState.drill.level = (chemState.drill.level % 5) + 1;
      } else {
        const courses = ["EVOLUTION", "FAMILY", "ISOMER"];
        const idx = courses.indexOf(chemState.drill.marathonCourse);
        chemState.drill.marathonCourse = courses[(idx + 1) % courses.length];
        chemState.drill.marathonIndex = 0;
      }
      startNewDrill(chemState.drill.level);
    });
  }

const nextBtn = document.getElementById("btn-next-drill");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (chemState.drill.type === "MARATHON") {
        chemState.drill.marathonIndex += 1;
      }
      startNewDrill(chemState.drill.level);
    });
  }

  const ansBtn = document.getElementById("btn-answer-toggle");
  if (ansBtn) {
    ansBtn.addEventListener("click", toggleAnswerDisplay);
  }

  const undoBtn = document.getElementById("btn-undo");
  if (undoBtn) {
    undoBtn.addEventListener("click", () => {
      if (chemState.drill.active && chemState.drill.showingAnswer) return;
      undoAction();
    });
  }

  const clearBtn = document.getElementById("btn-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (chemState.drill.active && chemState.drill.showingAnswer) return;
      if (chemState.drill.active && chemState.drill.currentMission) {
        saveSnapshot();
        chemState.bonds = JSON.parse(JSON.stringify(chemState.drill.currentMission.initialBonds));
        refreshSimulation();
      } else {
        clearWorkspace(true);
      }
    });
  }

const zoomSlider = document.getElementById("zoom-slider");
  if (zoomSlider) {
    zoomSlider.addEventListener("input", (e) => {
      camera3D.zoom = parseFloat(e.target.value);
      render3DViewer();
    });
  }

// 分子全体の重心を50x50グリッドの中央(800,800)へ移動し、画面をスクロールする関数
  window.centerMoleculeInWorkspace = function() {
    if (!chemState.atoms || chemState.atoms.length === 0) return;
    let cx = 0, cy = 0;
    chemState.atoms.forEach(a => { cx += a.x; cy += a.y; });
    cx /= chemState.atoms.length;
    cy /= chemState.atoms.length;
    const dx = 800 - cx;
    const dy = 800 - cy;
    chemState.atoms.forEach(a => {
      a.x += dx;
      a.y += dy;
    });
    const vp = document.getElementById("canvas-2d-viewport");
    if (vp) {
      const z = chemState.zoom2D || 1.0;
      vp.scrollLeft = Math.max(0, 800 * z - vp.clientWidth / 2);
      vp.scrollTop = Math.max(0, 800 * z - vp.clientHeight / 2);
    }
    if (typeof refreshSimulation === "function") refreshSimulation();
  };

  const zoomSlider2D = document.getElementById("zoom-slider-2d");
  if (zoomSlider2D) {
    zoomSlider2D.addEventListener("input", (e) => {
      chemState.zoom2D = parseFloat(e.target.value);
      resizeAllCanvases();
      // ズーム時にも常にキャンバス中心が見えるようにスクロール補正
      const vp = document.getElementById("canvas-2d-viewport");
      if (vp) {
        vp.scrollLeft = Math.max(0, 800 * chemState.zoom2D - vp.clientWidth / 2);
        vp.scrollTop = Math.max(0, 800 * chemState.zoom2D - vp.clientHeight / 2);
      }
    });
  }

const autoRotBtn = document.getElementById("btn-auto-rotate");
  if (autoRotBtn) {
    autoRotBtn.addEventListener("click", () => {
      camera3D.autoRotate = !camera3D.autoRotate;
      autoRotBtn.classList.toggle("active", camera3D.autoRotate);
    });
  }

  const resetCamBtn = document.getElementById("btn-reset-cam");
  if (resetCamBtn) {
    resetCamBtn.addEventListener("click", () => {
      camera3D.rotX = CHEM_ENV.DEFAULT_ROT_X;
      camera3D.rotY = CHEM_ENV.DEFAULT_ROT_Y;
      camera3D.zoom = 1.0;
      if (zoomSlider) zoomSlider.value = "1.0";
      render3DViewer();
    });
  }

  syncDrillToolbarUI();
}


function resizeAllCanvases() {
  const c2d = document.getElementById("canvas-2d");
  const vp2d = document.getElementById("canvas-2d-viewport");
  if (c2d && vp2d) {
    const z = chemState.zoom2D || 1.0;
    const prevZ = parseFloat(c2d.dataset.prevZoom) || z;
    const hasViewport = vp2d.clientWidth > 0 && vp2d.clientHeight > 0;
    const centerX = hasViewport ? (vp2d.scrollLeft + vp2d.clientWidth / 2) / prevZ : 0;
    const centerY = hasViewport ? (vp2d.scrollTop + vp2d.clientHeight / 2) / prevZ : 0;

    const minW = CHEM_ENV.GRID_PITCH * CHEM_ENV.WORKSPACE_COLS;
    const minH = CHEM_ENV.GRID_PITCH * CHEM_ENV.WORKSPACE_ROWS;
    const targetW = Math.round(minW * z);
    const targetH = Math.round(minH * z);
    c2d.width = targetW;
    c2d.height = targetH;
    c2d.style.width = `${targetW}px`;
    c2d.style.height = `${targetH}px`;
    c2d.dataset.prevZoom = String(z);

    if (hasViewport) {
      vp2d.scrollLeft = Math.max(0, centerX * z - vp2d.clientWidth / 2);
      vp2d.scrollTop = Math.max(0, centerY * z - vp2d.clientHeight / 2);
    }
  }

  const c3d = document.getElementById("canvas-3d");
  if (c3d && c3d.parentElement) {
    const rect = c3d.parentElement.getBoundingClientRect();
    const headerH = c3d.previousElementSibling ? c3d.previousElementSibling.offsetHeight : 0;
    c3d.width = Math.max(100, Math.floor(rect.width));
    c3d.height = Math.max(100, Math.floor(rect.height - headerH));
  }

  render2DCanvas();
  render3DViewer();
}
// ======================================================================
// 【第8章：全自動テストスイート ＆ システム初期化 (Automated QA & Boot)】
// 収録分子辞書の指紋一意性監査、初期サンプル配置、および起動シーケンス
// ======================================================================
function runDatabaseAudit() {
  const sigSet = new Set();
  MOLECULE_DB.forEach(mol => {
    if (sigSet.has(mol.signature)) {
      console.error(`[QA ERROR] 重複シグネチャ検出: ${mol.id}`);
    }
    sigSet.add(mol.signature);
  });
  console.log(`[CHEMSIM QA] 収録分子数: ${MOLECULE_DB.length}件 / 指紋一意性監査完了`);
}

function loadStarterMethane() {
  clearWorkspace(false);
  const cx = 800;
  const cy = 800;
  const step = CHEM_ENV.GRID_PITCH * 2;
  const c = addAtom("C", cx, cy, false);
  addOrCycleBond(c.id, addAtom("H", cx, cy - step, false).id);
  addOrCycleBond(c.id, addAtom("H", cx, cy + step, false).id);
  addOrCycleBond(c.id, addAtom("H", cx - step, cy, false).id);
  addOrCycleBond(c.id, addAtom("H", cx + step, cy, false).id);
  chemState.history.length = 0;

  requestAnimationFrame(() => {
    const vp = document.getElementById("canvas-2d-viewport");
    if (vp) {
      const z = (typeof chemState !== "undefined" && chemState.zoom2D) ? chemState.zoom2D : 1.0;
      vp.scrollLeft = Math.max(0, cx * z - vp.clientWidth / 2);
      vp.scrollTop = Math.max(0, cy * z - vp.clientHeight / 2);
    }
  });
}

function initApp() {
  if (window.innerWidth <= 820) {
    chemState.inspector.visible = false;
    chemState.inspector.telemetry3D = false;
  }
  runDatabaseAudit();
  setupToolbarUI();
  setup2DInteractions();
  setup3DInteractions();
  window.addEventListener("resize", resizeAllCanvases);
  resizeAllCanvases();

// 初回起動時は「メタン (CH4)」が完成した状態で立ち上げ、即座に3D回転を体験可能にする
  loadStarterMethane();
  refreshSimulation();
  renderDevLogs();
}





// ======================================================================
// 【開発・ビルド履歴ログデータ ＆ パネル生成】
// ======================================================================
const devLogs = [
  {
    tag: "",
    date: "",
    title: "",
    details: [
      "",
      "",
      "",
      "",
      "",
      "",
      "【次回実装予定】"
    ]
  },
{
    tag: "UPDATE",
    date: "2026-11-20",
    title: "2D自動整列・3D骨格構造式モード実装および分子データ・UIの最終仕上げ",
    details: [
      "【分子図鑑の展開最適化】図鑑から分子を選択した際に2Dズーム倍率を1.0へ自動リセットし、キャンバスの絶対中心へ展開・スクロール追従させることで、ホイール操作なしで即座に中央表示されるよう修正",
      "【2D一発整列機能の実装】ツールバーに「整列」ボタンを追加し、結合長・非結合原子間の反発力・結合角均等化（VSEPR展開）・主軸水平回転を組み合わせた力学レイアウトエンジン（アンドゥ履歴対応）を導入",
      "【3DタイトルHUD統合】3DテレメトリのON/OFFに関わらず3D空間左上の最上段に同定された分子名と化学式（STABLE MATCH）を大きく表示し、テレメトリ行と重ならないよう自動オフセット整列を実装",
      "【3D表示3モード切替・骨格構造式追加】3Dテレメトリボタングループ内に切替ボタンを統合し、「量子クラウド」「立体球棒式」「骨格構造式（炭素とC-H省略・ヘテロ原子表示・環内二重結合・3D奥行き連動くさび形結合）」の循環切替を実装",
      "【カフェイン3D表示の復旧】MOLECULE_DB末尾に重複していた破損エントリ（他分子データの混在および水素結合欠落データ）を除去し、正常な24原子・25結合データで図鑑展開と3D実体化が動作するよう修正",
      "【分子解説表示の拡張】分子同定時のステータス出力（evaluateMoleculeState）に立体骨格情報と科学的解説文を組み込み、完成した分子の役割や特徴を即座に確認できるよう改善",
      "【次回実装予定】app.js末尾に一時追記した拡張関数群（initAutoAlign2D等）の正規モジュール位置への整理・統合、およびテストプレイで得られたフィードバックの反映"
    ]
  },

  {
    tag: "v2.0-DEV",
    date: "2026-11-19",
    title: "CHEMSIM_2.0開発開始。",
    details: [
      "有機分子バージョン",
      "HTML/JS 2ファイル分離アーキテクチャへの移行",
      "12元素（I, Si, B追加）および最大原子数36への拡張",
      "官能基ブロック（-CH3, -OH, Ph-等）のアンロック・一括配置機能実装",
      "日用品・食品分子データ（乳酸、バニリン、メントール等）の追加"
    ]
  },


  {
    tag: "",
    date: "2026-11-18",
    title: "CHEMSIM_1.0が完成した。",
    details: ["GitHubに公開"]
  }
];

function renderDevLogs() {
  const container = document.getElementById("dev-log-container");
  if (!container) return;
  container.innerHTML = devLogs.map(log => `
    <li class="log-item">
      <div class="log-header"><span class="log-tag">${log.tag}</span><span class="log-date">${log.date}</span></div>
      <div class="log-body"><strong>${log.title}</strong><ul>${log.details.map(item => `<li>${item}</li>`).join("")}</ul></div>
    </li>
  `).join("");
}

window.addEventListener("DOMContentLoaded", initApp);


function initMoleculeGallery() {
  if (window.__chemGalleryInitialized) return;
  window.__chemGalleryInitialized = true;

  const captureInitialMethaneAnchor = () => {
    if (window.__initialMethaneAnchor) return window.__initialMethaneAnchor;
    const viewport = document.getElementById("canvas-2d-viewport");
    const canvas = document.getElementById("canvas-2d");
    if (typeof chemState !== "undefined" && Array.isArray(chemState.atoms) && chemState.atoms.length > 0) {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      chemState.atoms.forEach(a => {
        if (a.x < minX) minX = a.x;
        if (a.x > maxX) maxX = a.x;
        if (a.y < minY) minY = a.y;
        if (a.y > maxY) maxY = a.y;
      });
      window.__initialMethaneAnchor = {
        cx: Math.round((minX + maxX) / 2),
        cy: Math.round((minY + maxY) / 2),
        scrollLeft: viewport ? viewport.scrollLeft : 0,
        scrollTop: viewport ? viewport.scrollTop : 0
      };
      return window.__initialMethaneAnchor;
    }
    const fallbackW = canvas ? canvas.width : 960;
    const fallbackH = canvas ? canvas.height : 720;
    const viewW = (viewport && viewport.clientWidth > 0) ? viewport.clientWidth : 480;
    const viewH = (viewport && viewport.clientHeight > 0) ? viewport.clientHeight : 360;
    return {
      cx: Math.round(fallbackW / 2),
      cy: Math.round(fallbackH / 2),
      scrollLeft: Math.max(0, Math.round(fallbackW / 2 - viewW / 2)),
      scrollTop: Math.max(0, Math.round(fallbackH / 2 - viewH / 2))
    };
  };

  setTimeout(captureInitialMethaneAnchor, 0);

  const drillGroup = document.getElementById("group-drill");  if (drillGroup && !document.getElementById("btn-gallery-toggle")) {
    const galleryGroup = document.createElement("div");
    galleryGroup.className = "btn-group";
    galleryGroup.id = "group-gallery";
    const btn = document.createElement("button");
    btn.id = "btn-gallery-toggle";
    btn.type = "button";
    btn.textContent = "分子図鑑";
    galleryGroup.appendChild(btn);
    drillGroup.parentNode.insertBefore(galleryGroup, drillGroup);
  }

  const buildGalleryModal = () => {
    let modal = document.getElementById("gallery-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "gallery-modal";

    const header = document.createElement("div");
    header.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:6px; flex-shrink:0;";

    const title = document.createElement("div");
    title.textContent = `分子図鑑 (全${MOLECULE_DB.length}種) - タップで2D/3D即時展開`;
    title.style.cssText = "color:#38bdf8; font-weight:bold; font-size:12px;";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "閉じる";
    closeBtn.style.cssText = "background:#ef4444; border:none; color:#fff; padding:4px 12px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;";
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));

    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "gallery-grid";

    MOLECULE_DB.forEach(mol => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery-btn";
      btn.title = `${mol.name} (${mol.formula})`;

      const nameSpan = document.createElement("span");
      nameSpan.className = "g-name";
      nameSpan.textContent = mol.name.split(" (")[0];

      const formulaSpan = document.createElement("span");
      formulaSpan.className = "g-formula";
      formulaSpan.textContent = mol.formula;

      btn.appendChild(nameSpan);
      btn.appendChild(formulaSpan);

   btn.addEventListener("click", () => {
        if (chemState.drill.active) {
          chemState.drill.active = false;
          chemState.drill.showingAnswer = false;
          chemState.drill.currentMission = null;
          chemState.drill.savedUserBonds = null;
          syncDrillToolbarUI();
        }

       const anchor = captureInitialMethaneAnchor();
            const viewport = document.getElementById("canvas-2d-viewport");
            const canvas = document.getElementById("canvas-2d");
            const viewW = (viewport && viewport.clientWidth > 0) ? viewport.clientWidth : (canvas ? canvas.width : 480);
            const viewH = (viewport && viewport.clientHeight > 0) ? viewport.clientHeight : (canvas ? canvas.height : 360);

            const srcAtoms = (mol.model3D && mol.model3D.atoms) ? mol.model3D.atoms : [];
            const srcBonds = (mol.model3D && mol.model3D.bonds) ? mol.model3D.bonds : [];

            const projected = srcAtoms.map(a => ({
              type: a.type,
              px: (a.x || 0) + (a.z || 0) * 0.35,
              py: (a.y || 0) - (a.z || 0) * 0.25
            }));

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            projected.forEach(p => {
              if (p.px < minX) minX = p.px;
              if (p.px > maxX) maxX = p.px;
              if (p.py < minY) minY = p.py;
              if (p.py > maxY) maxY = p.py;
            });

            const spanX = Math.max(0.5, maxX - minX);
            const spanY = Math.max(0.5, maxY - minY);
            const targetW = Math.min(viewW * 0.65, 340);
            const targetH = Math.min(viewH * 0.65, 260);
            const scale = Math.min(targetW / spanX, targetH / spanY, 64);
            const midX = isFinite(minX) ? (minX + maxX) / 2 : 0;
            const midY = isFinite(minY) ? (minY + maxY) / 2 : 0;

            chemState.atoms = projected.map((p, idx) => ({
              id: `A_${idx + 1}`,
              type: p.type,
              x: Math.round(anchor.cx + (p.px - midX) * scale),
              y: Math.round(anchor.cy + (p.py - midY) * scale)
            }));

            if (viewport) {
              viewport.scrollLeft = anchor.scrollLeft;
              viewport.scrollTop = anchor.scrollTop;
            }

        chemState.bonds = srcBonds.map((b, idx) => ({
          id: `B_${idx + 1}`,
          from: chemState.atoms[b.from].id,
          to: chemState.atoms[b.to].id,
          order: b.order
        }));

        chemState.nextAtomId = chemState.atoms.length + 1;
        chemState.nextBondId = chemState.bonds.length + 1;
        chemState.inspector.targetAtomId = chemState.atoms[0] ? chemState.atoms[0].id : null;
        chemState.history.length = 0;
        chemState.isEraseMode = false;

        modal.classList.remove("open");
        refreshSimulation();
      });

      grid.appendChild(btn);
    });

 modal.appendChild(grid);
    modal.style.position = "fixed";
    modal.style.zIndex = "9999";
    document.body.appendChild(modal);
    return modal;
  };

  document.addEventListener("click", (e) => {
 const galleryTrigger = e.target.closest("#btn-gallery-toggle");
    if (galleryTrigger) {
      e.stopPropagation();
      const modal = buildGalleryModal();
      const viewport = document.getElementById("canvas-2d-viewport");
      if (viewport) {
        const rect = viewport.getBoundingClientRect();
        if (rect.width > 120 && rect.height > 120) {
          modal.style.left = `${Math.round(rect.left + 8)}px`;
          modal.style.top = `${Math.round(rect.top + 8)}px`;
          modal.style.width = `${Math.round(rect.width - 16)}px`;
          modal.style.height = `${Math.round(rect.height - 16)}px`;
        }
      }
      modal.classList.toggle("open");
      return;
    }

  const anyDrillBtn = e.target.closest("#group-drill button");
    if (anyDrillBtn) {
      const modal = document.getElementById("gallery-modal");
      if (modal) modal.classList.remove("open");
    }
  }, true);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMoleculeGallery);
} else {
  initMoleculeGallery();
}

function initWheelZoom2D() {
  if (window.__chemWheelZoomInitialized) return;
  window.__chemWheelZoomInitialized = true;

  const viewport = document.getElementById("canvas-2d-viewport") || document.getElementById("canvas-2d");
  if (!viewport) return;

  viewport.addEventListener("wheel", (e) => {
    const modal = document.getElementById("gallery-modal");
    if (modal && modal.classList.contains("open")) return;

    e.preventDefault();
    const current = Number(chemState.zoom2D) || 1.0;
    const step = e.deltaY < 0 ? 0.1 : -0.1;
    const next = Math.min(2.5, Math.max(0.5, Math.round((current + step) * 100) / 100));
    if (next === current) return;

    chemState.zoom2D = next;

    document.querySelectorAll('input[type="range"]').forEach(sl => {
      if (sl.id !== "zoom-slider") {
        sl.value = String(next);
        sl.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    if (typeof refreshSimulation === "function") {
      refreshSimulation();
    }
  }, { passive: false });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWheelZoom2D);
} else {
  initWheelZoom2D();
}
