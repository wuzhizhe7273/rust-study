use clap::{Parser,Subcommand};

#[derive(Parser)]
#[command(
    version,
    author,
    about,
    help_template("\
{name} {version}
{author}
{about}
{usage-heading}
    {usage}
{options}
{subcommands}"
    ),
    disable_help_subcommand=true)]
pub struct Cli{
    #[command(subcommand)]
    command:Option<Commands>
}

#[derive(Subcommand)]
enum Commands{
    /// Set the value of a string key to a string
    Set{
        /// A string key
        #[arg(value_name="KEY")]
        key:String,
        /// The string value of the key
        #[arg(value_name="VALUE")]
        value:String
    },
    /// Get the string value of a given string key
    Get{
        /// A string key
        #[arg(value_name="KEY")]
        key:String
    },
    /// Remove a given key
    Rm{
        /// A string key
        #[arg(value_name="KEY")]
        key:String
    }
}
fn main() {
    let cli=Cli::parse();
}
