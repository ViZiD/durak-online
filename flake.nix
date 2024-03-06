{
  description = "NixOS flake for durakhelper project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable-small";

    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }: utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        inherit system;
      };
      buildInputs = with pkgs; [
        yarn
        nodejs
      ];
    in
    {
      devShells.default = pkgs.mkShell {
        inherit buildInputs;
      };
    }
  );
}
