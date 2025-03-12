import { create } from 'zustand';
import { Network, WalletConfig, ContractConfig, SavedFunction, Parameter } from '../types';

interface State {
  networks: Network[];
  wallets: WalletConfig[];
  contracts: ContractConfig[];
  savedFunctions: SavedFunction[];
  selectedNetwork: string | null;
  selectedWallet: string | null;
  selectedContract: string | null;
  currentParameters: Parameter[];
  setNetworks: (networks: Network[]) => void;
  setWallets: (wallets: WalletConfig[]) => void;
  setContracts: (contracts: ContractConfig[]) => void;
  setSavedFunctions: (functions: SavedFunction[]) => void;
  setSelectedNetwork: (networkId: string | null) => void;
  setSelectedWallet: (walletId: string | null) => void;
  setSelectedContract: (contractId: string | null) => void;
  setCurrentParameters: (parameters: Parameter[]) => void;
  addNetwork: (network: Network) => void;
  addWallet: (wallet: WalletConfig) => void;
  addContract: (contract: ContractConfig) => void;
  removeNetwork: (networkId: string) => void;
  removeWallet: (walletId: string) => void;
  removeContract: (contractId: string) => void;
}

// Mock initial data
const mockNetworks: Network[] = [
  { id: '1', name: 'Testnet', url: 'https://horizon-testnet.stellar.org' },
  { id: '2', name: 'Public', url: 'https://horizon.stellar.org' },
];

const mockWallets: WalletConfig[] = [
  { id: '1', name: 'Test Wallet 1', secretKey: 'SAMPLE_KEY_1' },
];

const mockContracts: ContractConfig[] = [
  { id: '1', name: 'Test Contract', contractId: 'CONTRACT_ID_1' },
];

export const useStore = create<State>((set) => ({
  networks: mockNetworks,
  wallets: mockWallets,
  contracts: mockContracts,
  savedFunctions: [],
  selectedNetwork: null,
  selectedWallet: null,
  selectedContract: null,
  currentParameters: [],

  setNetworks: (networks) => set({ networks }),
  setWallets: (wallets) => set({ wallets }),
  setContracts: (contracts) => set({ contracts }),
  setSavedFunctions: (functions) => set({ savedFunctions: functions }),
  setSelectedNetwork: (networkId) => set({ selectedNetwork: networkId }),
  setSelectedWallet: (walletId) => set({ selectedWallet: walletId }),
  setSelectedContract: (contractId) => set({ selectedContract: contractId }),
  setCurrentParameters: (parameters) => set({ currentParameters: parameters }),

  addNetwork: (network) => set((state) => ({ 
    networks: [...state.networks, network] 
  })),
  addWallet: (wallet) => set((state) => ({ 
    wallets: [...state.wallets, wallet] 
  })),
  addContract: (contract) => set((state) => ({ 
    contracts: [...state.contracts, contract] 
  })),
  removeNetwork: (networkId) => set((state) => ({ 
    networks: state.networks.filter((n) => n.id !== networkId) 
  })),
  removeWallet: (walletId) => set((state) => ({ 
    wallets: state.wallets.filter((w) => w.id !== walletId) 
  })),
  removeContract: (contractId) => set((state) => ({ 
    contracts: state.contracts.filter((c) => c.id !== contractId) 
  })),
}));