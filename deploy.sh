#!/bin/bash

# Cargar variables del .env si existe
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

echo "Desplegando DonationBox en Fuji..."

forge script script/DeployDonationBox.s.sol:DeployDonationBox \
--rpc-url $FUJI_RPC_URL \
--broadcast \
--verify \
--etherscan-api-key $SNOWTRACE_API_KEY \
-vvvv