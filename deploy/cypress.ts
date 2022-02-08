import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const decipherNFT = await deploy('DecipherNFT', {
    contract: 'DecipherNFT',
    from: deployer,
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
      owner: deployer,
      execute: {
        methodName: 'initialize',
        args: [],
      },
    },
    log: true,
  });
};
deploy.tags = ['cypress'];

export default deploy;
