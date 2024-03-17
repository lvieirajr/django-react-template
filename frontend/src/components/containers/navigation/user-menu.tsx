import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@/components/providers/auth0";
import { Theme, useTheme } from "@/components/providers/theme";

export function UserMenu(): JSX.Element {
  const { t } = useTranslation();
  const { isLoading, user } = useAuth0();
  const { i18n } = useTranslation();
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  if (isLoading || !user) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback />
      </Avatar>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.picture} alt="Avatar" />
            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            {t("pages.profile.title")}
          </DropdownMenuItem>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DropdownMenuItem>
                {t("navigation.userMenu.theme.title")}
              </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(theme) => setTheme(theme as Theme)}
              >
                <DropdownMenuRadioItem value="light">
                  {t("navigation.userMenu.theme.light")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  {t("navigation.userMenu.theme.dark")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  {t("navigation.userMenu.theme.system")}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DropdownMenuItem>Language</DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={i18n.language}
                onValueChange={i18n.changeLanguage}
              >
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pt">Português</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate("/logout")}>
          {t("navigation.userMenu.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
